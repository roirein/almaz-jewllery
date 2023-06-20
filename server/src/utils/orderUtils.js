const { ROLES, NOTIFICATIONS_TYPES } = require("../consts/system-consts");
const Notification = require("../models/messages/notificationModel");
const ModelMetadata = require("../models/models/modelMetadataModel")
const NewJewelOrder = require("../models/orders/NewJewelOrderModel");
const Employee = require("../models/users/employeeModel");
const { sendNotification } = require("../services/socket/socket");

const createNewModelOrder = async (jewelData, modelData) => {
    await NewJewelOrder.create(jewelData);
    await ModelMetadata.create(modelData);
    const manager = await Employee.findOne({
        where: {
            role: ROLES.MANAGER
        }
    })

    const notification = {
        type: NOTIFICATIONS_TYPES.NEW_ORDER,
        recipient: manager.dataValues.id,
        resource: 'order',
        resourceId: jewelData.orderId
    }

    await Notification.create(notification);
    sendNotification(notification)
}


module.exports = {
    createNewModelOrder
}