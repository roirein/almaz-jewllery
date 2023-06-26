const JewelModel = require('../models/models/modelModel');
const ModelComments = require('../models/models/commentsModel');
const PriceModel = require('../models/models/modelPriceModel');
const {DESIGN_STATUS, ORDER_STATUS, MODEL_STATUS, NOTIFICATIONS_TYPES, ROLES} = require('../consts/system-consts');
const {HTTP_STATUS_CODE} = require('../consts/http-consts');
const Order = require('../models/orders/orderModel');
const ModelMetadata = require('../models/models/modelMetadataModel');
const Employee = require('../models/users/employeeModel');
const Notification = require('../models/messages/notificationModel')
const { sendNotification } = require('../services/socket/socket');


const getModelsMetadata = async (req, res, next) => {
    try {
        const modelsMetadata = await ModelMetadata.findAll({
            include: [{
                model: JewelModel,
                attributes: ['status', 'title']
            }]
        });
        console.log(modelsMetadata)
        const modelsData = modelsMetadata.map((model) => {
            return {
                metadataId: model.metadataId,
                item: model.item,
                setting: model.setting,
                sideStoneSize: model.sideStoneSize,
                mainStoneSize: model.mainStoneSize,
                modelNumber: model.modelNumber,
                orderId: model.orderId,
                modelData: model.Model
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
            metadataId: req.params.id,
            design: req.file.filename,
            title: req.body.title,
            description: req.body.description 
        }
        const newModel = await JewelModel.create(model);

        await ModelMetadata.update({
            modelNumber: req.body.modelNumber
        }, {
            where: {
                metadataId: req.params.id
            }
        })

        const manager = await Employee.findOne({
            where: {
                role: ROLES.MANAGER
            }
        })
        const notification = {
            type: NOTIFICATIONS_TYPES.NEW_MODEL,
            recipient: manager.dataValues.id,
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

        console.log(modelData.dataValues['Model Metadatum'])

        const model = {
            id: modelData.dataValues.modelNumber,
            title: modelData.dataValues.title,
            image: modelData.dataValues.design,
            description: modelData.dataValues.description,
            status: modelData.dataValues.status,
            item: modelData.dataValues['Model Metadatum'].dataValues.item,
            setting: modelData.dataValues['Model Metadatum'].dataValues.setting,
            sideStoneSize: modelData.dataValues['Model Metadatum'].dataValues.sideStoneSize,
            mainStoneSize: modelData.dataValues['Model Metadatum'].dataValues.mainStoneSize,
            initialDesign: modelData.dataValues['Model Metadatum'].dataValues.initialImage
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

const getModelDesign = async (req, res, next) => {
    try {
        const file = req.params.imagePath
        const image = path.join(__dirname, '../../resources/model', file);
        res.status(HTTP_STATUS_CODE.SUCCESS).sendFile(image)
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
    getModelById,
    getModelDesign
}