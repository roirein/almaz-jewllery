const JewelModel = require('../models/models/modelModel');
const ExistingModelOrder = require('../models/orders/existingModelOrder');
const OrderInDesign = require('../models/orders/orderInDesignModel');
const NewModelOrder = require('../models/orders/newModelOrderModel');
const ModelComments = require('../models/models/commentsModel');
const PriceModel = require('../models/models/modelPriceModel');
const {DESIGN_STATUS, ORDER_STATUS, MODEL_STATUS} = require('../consts/system-consts');
const {HTTP_STATUS_CODE} = require('../consts/http-consts');
const Order = require('../models/orders/orderModel');

const createNewModel = async (req, res, next) => {
    try {
        const modelData = {
            modelNumber: req.body.modelNumber,
            item: req.body.item,
            mainStone: req.body.mainStone,
            sideStone: req.body.sideStone,
            inlay: req.body.setting,
            initiallDesign: req.body.image,
            finalDesign: req.body.image,
            description: req.body.description
        }
        await JewelModel.create(modelData);
        // const existingModelOrderData = {
        //     orderId: req.body.orderId,
        //     item: req.body.item,
        //     metal: req.body.metal,
        //     size: req.body.size,
        //     comments: req.body.comments,
        //     modelNumber: model.modelNumber,
        //     wasOriginallyNewModelOrder: true
        // }
        // await ExistingModelOrder.create(existingModelOrderData);
        // await NewModelOrder.destroy({
        //     where: {
        //         orderId: req.body.orderId,
        //     }
        // })
        // await OrderInDesign.update(
        //     {
        //         status: DESIGN_STATUS.MANAGER_REVIEW,
        //     },
        //     {
        //         where: {
        //             orderId: req.body.orderId
        //         }
        //     }
        // )
        res.status(HTTP_STATUS_CODE.CREATED).send('model created successfully')
    } catch (e) {
        console.log(e)
        next(e);
    }
};

const getAllModels = async (req, res, next) => {
    try {
        const modelsRes = await JewelModel.findAll();

        const result = modelsRes.map((model) => {
            return {
                modelNumber: model.dataValues.modelNumber,
                item: model.dataValues.item,
                setting: model.dataValues.inlay,
                sideStone: model.dataValues.sideStone,
                mainStone: model.dataValues.mainStone,
                description: model.dataValues.description,
                status: model.dataValues.status
            }
        })
        res.status(HTTP_STATUS_CODE.SUCCESS).send({models: result});
    } catch (e) {
        next(e)
    }
}

const approveOrRejectModel = async (req, res, next) => {
    try {
        await JewelModel.update(
            {
                status: req.body.modelStatus
            }, {
                where: {
                    modelNumber: req.body.modelNumber
                }
            }
        )
        if (req.body.comments) {
            const modelComments = {
                modelNumber: req.body.modelNumber,
                comments: req.body.comments
            }

            const comments =  await ModelComments.findOne({
                where: {
                    modelNumber: req.body.modelNumber 
                }
            })

            if (comments) {
                await ModelComments.update({
                    comments: req.body.comments,
                    commentId: comments.dataValues.commentId
                }, {
                    where: {
                        modelNumber: req.body.modelNumber
                    }
                })
            } else {
                await ModelComments.create(modelComments)
            }
            res.status(HTTP_STATUS_CODE.CREATED).send('comment published');
        } else {
            await ModelComments.destroy({
                where: {
                    modelNumber: req.body.modelNumber
                }
            })
            res.status(HTTP_STATUS_CODE.SUCCESS).send({status: req.body.modelStatus});
        }
    } catch (e) {
        next(e)
    }
}

const updateModel = async (req, res, next) => {
    try {
        const updatedModel = await JewelModel.update({
            item: req.body.item,
            mainStone: req.body.mainStone,
            sideStone: req.body.sideStone,
            inlay: req.body.setting,
            initiallDesign: req.body.image,
            finalDesign: req.body.image,
            description: req.body.description,
            status: MODEL_STATUS.UPDATED
        }, {
            where: {
                modelNumber: req.params.id
            }
        })

        res.status(HTTP_STATUS_CODE.SUCCESS).send(updatedModel)
    } catch (e) {
        next (e)
    }
}

const getModelById = async (req, res, next) => {
    try {
        const modelData = await JewelModel.findOne({
            where: {
                modelNumber: req.params.modelId
            }
        })

        const comments = await ModelComments.findOne({
            where: {
                modelNumber: req.params.modelId
            }
        })

        const priceAndMaterials = await PriceModel.findOne({
            where: {
                modelNumber: req.params.modelId
            }
        })


        let model = {
            id: modelData.dataValues.modelNumber,
            item: modelData.dataValues.item,
            setting: modelData.dataValues.inlay,
            sideStone: modelData.dataValues.sideStone,
            mainStone: modelData.dataValues.mainStone,
            description: modelData.dataValues.description,
            status: modelData.dataValues.status,
            image: modelData.dataValues.finalDesign
        }

        if (comments) {
            model = {
                ...model,
                comments: comments.dataValues.comments
            }
        }

        if (priceAndMaterials) {
            model = {
                ...model, 
                priceData: priceAndMaterials.dataValues
            }
        }

        res.status(HTTP_STATUS_CODE.CREATED).send({model});
    } catch (e) {
        next(e)
    }
}

const setModelPriceAndMaterials = async (req, res, next) => {
    try {
        const priceData = {
            modelNumber: req.params.id,
            materials: req.body.materials,
            priceWithMaterials: req.body.priceWithMaterials,
            priceWithoutMaterials: req.body.priceWithoutMaterials
        }

        const modelPriceData = await PriceModel.create(priceData);

        await JewelModel.update({
            status: MODEL_STATUS.COMPLETED
        }, {
            where: {
                modelNumber: req.params.id
            }
        })
        // const existingOrder = await ExistingModelOrder.findOne({
        //     where: {
        //         modelNumber: req.params.modelId
        //     }, 
        // });
        // await Order.update({
        //     status: ORDER_STATUS.CUSTOMER_APPROVAL
        // }, {
        //     where: existingOrder.orderId
        // });
        // await OrderInDesign.update({
        //     status: DESIGN_STATUS.COMPLETED
        // }, {
        //     where: existingOrder.orderId
        // })
        res.status(HTTP_STATUS_CODE.CREATED).send(modelPriceData);

    } catch(e) {
        console.log(e)
        next(e)
    }
}

module.exports = {
    createNewModel,
    getAllModels,
    approveOrRejectModel, 
    updateModel,
    getModelById,
    setModelPriceAndMaterials,
    setModelPriceAndMaterials
}