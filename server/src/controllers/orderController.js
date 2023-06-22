const { ORDER_TYPES, ROLES, ORDER_STATUS, CASTING_STATUS, NOTIFICATIONS_TYPES, DESIGN_STATUS } = require('../consts/system-consts');
const Order = require('../models/orders/orderModel');
const User = require('../models/users/userModel');
const JewelModel = require('../models/models/modelModel');
const Notification = require('../models/messages/notificationModel')
const { HTTP_STATUS_CODE } = require('../consts/http-consts');
//const io = require('../services/socket/socket').getIo();
const users = require('../services/socket/listener');
const Employee = require('../models/users/employeeModel');
const OrderInCasting = require('../models/orders/OrderInCastingModel');
const { sendNotification } = require('../services/socket/socket');
const { Op } = require("sequelize");
const { createNewModelOrder } = require('../utils/orderUtils');
const NewJewelOrder = require('../models/orders/NewJewelOrderModel');

const createNewOrder = async (req, res, next) => {
    try {
        const orderData = {
            customerId: req.userId,
            customerName: req.body.customerName ? req.body.customerName : User.getUserFullName(req.userId),
            type: req.body.type,
            deadline: new Date(req.body.deadline),
        }
        const order = await Order.create(orderData);

        if (order.type === ORDER_TYPES.FIX) {

        } else {
            const jewelData = {
                orderId: order.orderId,
                item: req.body.item,
                metal: req.body.metal,
                size: req.body.size,
                casting: req.body.casting,
                comments: req.body.comments
            }

            if (order.type === ORDER_TYPES.NEW_MODEL) {
                const modelData = {
                    item: req.body.item,
                    setting: req.body.setting,
                    sideStoneSize: req.body.sideStoneSize,
                    mainStoneSize: req.body.mainStoneSize,
                    initialImage: req.file.filename,
                    comments: req.body.comments,
                    orderId: order.orderId
                }
                console.log(modelData)
                await createNewModelOrder(jewelData, modelData)
            }
        }
        res.status(HTTP_STATUS_CODE.CREATED).send();
        
    } catch(e) {
        console.log(e)
        next(e)
    }
}

const getActiveOrders = async (req, res, next) => {
    try {
        const orderData = await Order.findAll({
            where: {
                status: {
                    [Op.notILike]: ORDER_STATUS.COMPLETED
                }
            },
            include: [{
                model: NewJewelOrder
            }]
        })

        const orders = orderData.map((order) => {
            return {
                orderNumber: order.orderId,
                orderType: order.type,
                customerName: order.customerName,
                deadline: order.deadline,
                orderStatus: order.status
            }
        })
        res.status(HTTP_STATUS_CODE.SUCCESS).send({orders})
    } catch(e) {
        next(e)
    }
}


const sendOrderToDesign = async (req, res, next) => {
    try {
        await Order.update({
            status: ORDER_STATUS.IN_DESIGN
        }, {
            where: {
                orderId: req.params.id
            }
        })

        const designManager = await Employee.findOne({
            where: {
                role: ROLES.DESIGN_MANAGER
            }
        })

        const notification = {
            type: NOTIFICATIONS_TYPES.NEW_ORDER,
            recipient: designManager.dataValues.id,
            resource: 'order',
            resourceId: `${req.params.id}`
        }

        await Notification.create(notification)
        sendNotification(notification)
        res.status(HTTP_STATUS_CODE.SUCCESS).send()
    } catch (e) {
        next (e)
    }
}
// const getOrderById = async (req, res, next) => {
//     try {
//         const orderId = req.params.orderId;
//         const order = await Order.findOne({
//             where: {
//                 orderId
//             }
//         })
//         let result = {
//             id: orderId,
//             customer: order.dataValues.customerName,
//             status: order.dataValues.status,
//             deadline: order.dataValues.deadline,
//             casting: !!order.dataValues.isCastingRequired
//         }
//         if (order.type === ORDER_TYPES.NEW_MODEL) {
//             const newModelOrder = await NewModelOrder.findOne({
//                 where: {
//                     orderId: orderId
//                 }
//             })
//             const designStatus = await OrderInDesign.findOne({
//                 where: {
//                     orderId: orderId
//                 }
//             })
//             console.log(newModelOrder)
//             modelData = {
//                 item: newModelOrder.dataValues.item,
//                 inlay: newModelOrder.dataValues.inlay,
//                 comments: newModelOrder.dataValues.comments,
//                 mainStone: newModelOrder.dataValues.mainStone,
//                 sideStone: newModelOrder.dataValues.sideStone,
//                 image: newModelOrder.dataValues.image,
//                 designStatus: designStatus.dataValues.status
//             }
//             result = {...result, ...modelData}
//         }
//         res.status(HTTP_STATUS_CODE.SUCCESS).send({order: result})
//     } catch(e) {
//         console.log(e)
//         next(e);
//     }
// }

// const getNewModelOrder = async (req, res, next) => {
//     try {

//         const orders = await NewModelOrder.findAll({
//             include: {
//                 model: Order,
//                 where: {
//                     status: ORDER_STATUS.CREATED
//                 },
//             }
//         });
//         res.status(HTTP_STATUS_CODE.SUCCESS).send({orders})

//     } catch(e) {
//         next(e)
//     }
// }

// const setOrderDesignStatus = async (req, res, next) => {
//     try {
//         await OrderInDesign.update(
//             {
//                 status: req.body.status
//             },
//             {
//                 where: {
//                     orderId: req.params.id
//                 }
//             }
//         );
//         await Order.update(
//             {
//                 status: ORDER_STATUS.IN_DESIGN
//             },
//             {
//                 where: {
//                     orderId: req.params.id
//                 }
//             }
//         )
//         res.status(HTTP_STATUS_CODE.SUCCESS).send('status updated successfully');
//     } catch (e) {
//         next(e);
//     }
// }

// const setOrderPrice = async (req, res, next) => {
//     try {
//         await Order.update({
//             price: req.body.selectedPrice
//         }, {
//             where: {
//                 orderId: req.params.orderId
//             }
//         });
//         res.status(HTTP_STATUS_CODE.SUCCESS).send('price updated successfully');
//     } catch(e) {
//         next(e);
//     }
// }

// const setCastingStatus = async (req, res, next) => {
//     try {
//         await OrderInCasting.update({
//             status: req.body.status
//         }, {
//             where: {
//                 orderId: req.params.orderId
//             }
//         })
//         if (req.body.status === CASTING_STATUS.IN_PROGRESS) {
//             await Order.update({
//                 status: ORDER_STATUS.IN_CASTINg
//             }, {
//                 where: {
//                     orderId: req.body.orderId
//                 }
//             })
//         }
//         res.status(HTTP_STATUS_CODE.SUCCESS).send('status updated successfully')
//     } catch(e) {
//         next(e);
//     }
// }

module.exports = {
    createNewOrder,
    //getOrdersInDesign,
    getActiveOrders,
    sendOrderToDesign,
    // getOrderById,
    // getNewModelOrder,
    // setOrderDesignStatus,
    // setOrderPrice,
    // setCastingStatus
}