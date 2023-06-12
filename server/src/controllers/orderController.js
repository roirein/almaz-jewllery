const { ORDER_TYPES, ROLES, ORDER_STATUS, CASTING_STATUS, NOTIFICATIONS_TYPES, DESIGN_STATUS } = require('../consts/system-consts');
const Order = require('../models/orders/orderModel');
const NewModelOrder = require('../models/orders/newModelOrderModel');
const ExistingModelOrder = require('../models/orders/existingModelOrder');
const User = require('../models/users/userModel');
const JewelModel = require('../models/models/modelModel');
const Notification = require('../models/messages/notificationModel')
const { HTTP_STATUS_CODE } = require('../consts/http-consts');
//const io = require('../services/socket/socket').getIo();
const users = require('../services/socket/listener');
const Employee = require('../models/users/employeeModel');
const OrderInDesign = require('../models/orders/orderInDesignModel');
const OrderInCasting = require('../models/orders/OrderInCastingModel');
const { sendNotification } = require('../services/socket/socket');
const { Op } = require("sequelize");

const createNewOrder = async (req, res, next) => {
    try {
        const orderData = {
            customerId: req.userId,
            customerName: req.body.customerName ? req.body.customerName : User.getUserFullName(req.userId),
            type: req.body.type,
            deadline: new Date(req.body.deadline),
            isCastingRequired: req.body.isCastingRequired ? req.body.isCastingRequired : false
        }
        const order = await Order.create(orderData);
        if (orderData.isCastingRequired) {
            await OrderInCasting.create({orderId: order.orderId})
        }
        if (orderData.type === ORDER_TYPES.NEW_MODEL) {
            const modelData = req.body.modelData;
            await NewModelOrder.create({orderId: order.orderId, ...modelData});
            await OrderInDesign.create({orderId: order.orderId})
            const desginMangerId = await Employee.findOne({
                where: {
                    role: ROLES.DESIGN_MANAGER
                }
            })
            const notificationData = {
                recipient: desginMangerId.dataValues.id,
                content: JSON.stringify({orderId: order.orderId, ...modelData}),
                type: NOTIFICATIONS_TYPES.NEW_ORDER
            }
            const notification = await Notification.create(notificationData);
            sendNotification(notification)
        }
        if (orderData.type === ORDER_TYPES.EXISTING_MODEL) {
            await ExistingModelOrder.create({
                ...orderData, 
                modelNumber: req.body.modelNumber,
            })
            order.price = req.body.price;
            await order.save()
        }
        res.status(HTTP_STATUS_CODE.CREATED).send();
        
    } catch(e) {
        console.log(e)
        next(e)
    }
}

const getOrdersInDesign = async (req, res, next) => {
    try {
        const orders = await Order.findAll({
            where: {
                type: ORDER_TYPES.NEW_MODEL,
                status: {
                    [Op.or] : [ORDER_STATUS.CREATED, ORDER_STATUS.IN_DESIGN]
                }
            }
        })
        const ordersInDesign = await OrderInDesign.findAll({
            where: {
                status: {
                    [Op.notILike]: DESIGN_STATUS.COMPLETED
                }
            }
        })
        const newModelOrders = await NewModelOrder.findAll();
        const existingModelOrders = await ExistingModelOrder.findAll();
        const models = await JewelModel.findAll();
        const result = orders.map((order) => {
            const designOrder = ordersInDesign.find((ord) => order.dataValues.orderId === ord.dataValues.orderId);
            const newModelOrder = newModelOrders.find((ord2) => order.dataValues.orderId === ord2.dataValues.orderId);
            const exisitingModelOrder = existingModelOrders.find((ord3) => order.dataValues.orderId === ord3.dataValues.orderId);
            let model = null;
            if (exisitingModelOrder) {
                model = models.find((model) => model.modelNumber === exisitingModelOrder.dataValues.orderId);
            }
            return {
                id: order.dataValues.orderId,
                item: exisitingModelOrder ? model.dataValues.item : newModelOrder.dataValues.item,
                setting: exisitingModelOrder ? model.dataValues.inlay : newModelOrder.dataValues.inlay,
                sideStone: exisitingModelOrder ? model.dataValues.sideStone : newModelOrder.dataValues.sideStone,
                mainStone: exisitingModelOrder ? model.dataValues.mainStone : newModelOrder.dataValues.mainStone,
                modelNumber: model ? model.dataValues.modelNumber : null,
                status: designOrder.dataValues.status
            }
        })
        console.log(result)
        res.status(HTTP_STATUS_CODE.SUCCESS).send({orders: result});
    } catch(e) {
        console.log(e)
        next(e)
    }
}

const getOrderById = async (req, res, next) => {
    try {
        const orderId = req.params.orderId;
        const order = await Order.findOne({
            where: {
                orderId
            }
        })
        let result = {
            id: orderId,
            customer: order.dataValues.customerName,
            status: order.dataValues.status,
            deadline: order.dataValues.deadline,
            casting: !!order.dataValues.isCastingRequired
        }
        if (order.type === ORDER_TYPES.NEW_MODEL) {
            const newModelOrder = await NewModelOrder.findOne({
                where: {
                    orderId: orderId
                }
            })
            const designStatus = await OrderInDesign.findOne({
                where: {
                    orderId: orderId
                }
            })
            console.log(newModelOrder)
            modelData = {
                item: newModelOrder.dataValues.item,
                inlay: newModelOrder.dataValues.inlay,
                comments: newModelOrder.dataValues.comments,
                mainStone: newModelOrder.dataValues.mainStone,
                sideStone: newModelOrder.dataValues.sideStone,
                image: newModelOrder.dataValues.image,
                designStatus: designStatus.dataValues.status
            }
            result = {...result, ...modelData}
        }
        res.status(HTTP_STATUS_CODE.SUCCESS).send({order: result})
    } catch(e) {
        console.log(e)
        next(e);
    }
}

const getNewModelOrder = async (req, res, next) => {
    try {

        const orders = await NewModelOrder.findAll({
            include: {
                model: Order,
                where: {
                    status: ORDER_STATUS.CREATED
                },
            }
        });
        res.status(HTTP_STATUS_CODE.SUCCESS).send({orders})

    } catch(e) {
        next(e)
    }
}

const setOrderDesignStatus = async (req, res, next) => {
    try {
        await OrderInDesign.update(
            {
                status: req.body.status
            },
            {
                where: {
                    orderId: req.params.id
                }
            }
        );
        await Order.update(
            {
                status: ORDER_STATUS.IN_DESIGN
            },
            {
                where: {
                    orderId: req.params.id
                }
            }
        )
        res.status(HTTP_STATUS_CODE.SUCCESS).send('status updated successfully');
    } catch (e) {
        next(e);
    }
}

const setOrderPrice = async (req, res, next) => {
    try {
        await Order.update({
            price: req.body.selectedPrice
        }, {
            where: {
                orderId: req.params.orderId
            }
        });
        res.status(HTTP_STATUS_CODE.SUCCESS).send('price updated successfully');
    } catch(e) {
        next(e);
    }
}

const setCastingStatus = async (req, res, next) => {
    try {
        await OrderInCasting.update({
            status: req.body.status
        }, {
            where: {
                orderId: req.params.orderId
            }
        })
        if (req.body.status === CASTING_STATUS.IN_PROGRESS) {
            await Order.update({
                status: ORDER_STATUS.IN_CASTINg
            }, {
                where: {
                    orderId: req.body.orderId
                }
            })
        }
        res.status(HTTP_STATUS_CODE.SUCCESS).send('status updated successfully')
    } catch(e) {
        next(e);
    }
}

module.exports = {
    createNewOrder,
    getOrdersInDesign,
    getOrderById,
    getNewModelOrder,
    setOrderDesignStatus,
    setOrderPrice,
    setCastingStatus
}