const JewelModel = require('../models/models/modelModel');
const ModelComments = require('../models/models/commentsModel');
const PriceModel = require('../models/models/modelPriceModel');
const {DESIGN_STATUS, ORDER_STATUS, MODEL_STATUS, NOTIFICATIONS_TYPES, ROLES} = require('../consts/system-consts');
const {HTTP_STATUS_CODE} = require('../consts/http-consts');
const Order = require('../models/orders/orderModel');
const ModelMetadata = require('../models/models/modelMetadataModel');
const Employee = require('../models/users/employeeModel');
const { sendNotification } = require('../services/socket/socket');


const getModelsMetadata = async (req, res, next) => {
    try {
        const modelsMetadata = await ModelMetadata.findAll();
        const modelsData = modelsMetadata.map((model) => {
            return {
                metadataId: metadataId.id,
                item: model.item,
                setting: model.setting,
                sideStoneSize: model.sideStoneSize,
                mainStoneSize: model.mainStoneSize,
                modelNumber: model.modelNumber,
                orderId: model.orderId
            }
        })

        res.status(HTTP_STATUS_CODE.SUCCESS).send({modelsData})
    } catch (e) {
        next(e)
    }
}

const createNewModel = async (req, res, next) => {
    try {
        const model = {
            modelNumber: req.body.modelNumber,
            matadataId: req.params.id,
            image: req.file.filename,
            title: req.body.title,
            description: req.body.description 
        }
        const newModel = await JewelModel.create(model);
        const designManager = await Employee.findOne({
            where: {
                role: ROLES.DESIGN_MANAGER
            }
        })
        const notification = {
            type: NOTIFICATIONS_TYPES.NEW_MODEL,
            recipient: designManager.dataValues.id,
            resource: 'model',
            resourceId: newModel.modelNumber
        }
        await Notification.create(notification)
        sendNotification(notification)
        res.send(HTTP_STATUS_CODE.CREATED).send({model: newModel})
    } catch (e) {
        next(e)
    }
}

const getModelById = async (req, res, next) => {
    try {
        const modelData = await JewelModel.findOne({
            where: {
                modelNumber: req.params.modelNumber
            },
            include: [{
                model: ModelMetadata
            }]
        })

        const model = {
            id: modelData.dataValues.modelNumber,
            title: modelData.dataValues.title,
            image: modelData.dataValues.image,
            description: modelData.dataValues.description,
            item: modelData.dataValues.ModelMetadata.item,
            setting: modelData.dataValues.ModelMetadata.dataValues.setting,
            sideStoneSize: modelData.dataValues.ModelMetadata.dataValues.sideStoneSize,
            mainStoneSize: modelData.dataValues.ModelMetadata.dataValues.mainStoneSize,
            initialDesign: modelData.dataValues.ModelMetadata.dataValues.initialImage
        }
        res.status(HTTP_STATUS_CODE.SUCCESS).send({model})
    } catch (e) {
        next(e)
    }
}

const reviewModel = async (req, res, next) => {
    try {
        const isModelApproved = req.body.isModelApproved;
        await JewelModel.update({
            status: isModelApproved ? MODEL_STATUS.APPROVED : MODEL_STATUS.NEEDS_WORK
        }, {
            where: {
                modelNumber: req.params.modelNumber
            }
        })
        if (!isModelApproved) {
            const comments = {
                modelNumber: req.params.modelNumber,
                comments: req.body.comments
            }

            await ModelComments.create(comments)
        }
        const designManager = await Employee.findOne({
            where: {
                role: ROLES.DESIGN_MANAGER
            }
        })
        const notification = {
            type: NOTIFICATIONS_TYPES.MODEL_REVIEWED,
            recipient: designManager.dataValues.id,
            resource: 'model',
            resourceId: req.params.modelNumber
        }
        await Notification.create(notification)
        sendNotification(notification)
        res.status(HTTP_STATUS_CODE.SUCCESS).send();
    } catch(e) {
        next(e)
    }
}

const updateModel = async (req, res, next) => {
    try {
        await JewelModel.update({
            image: req.file.filename,
            title: req.body.title,
            description: req.body.description,
            status: MODEL_STATUS.UPDATED
        }, {
            where: {
                modelNumber: req.params.modelNumber
            }
        })
        const notification = {
            type: NOTIFICATIONS_TYPES.MODEL_UPDATED,
            recipient: designManager.dataValues.id,
            resource: 'model',
            resourceId: req.params.modelNumber
        }
        await Notification.create(notification)
        sendNotification(notification)
        res.send(HTTP_STATUS_CODE.SUCCESS).send()
    } catch(e)  {
        next(e)
    }
}

const setModelPriceAndMaterial = async (req, res, next) => {
    try {
        const data = {
            modelNumber: req.params.modelNumber,
            materials: req.body.materials,
            priceWithMaterials: req.body.priceWithMaterials,
            priceWithoutMaterials: req.body.priceWithoutMaterials
        }
        await PriceModel.create(data)
        res.status(HTTP_STATUS_CODE.CREATED).send(data)
    } catch (e) {
        next(e)
    }
}


module.exports = {
    getModelsMetadata,
    createNewModel,
    getModelsMetadata,
    setModelPriceAndMaterial,
    reviewModel,
    updateModel,
    getModelById
}