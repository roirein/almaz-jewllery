const { ORDER_TYPES, ROLES, ORDER_STATUS } = require('../consts/system-consts');
const Order = require('../models/orders/orderModel');
const NewModelOrder = require('../models/orders/newModelOrderModel');
const ExistingModelOrder = require('../models/orders/existingModelOrder');
const User = require('../models/users/userModel');
const JewelModel = require('../models/models/modelModel');
const Notification = require('../models/messages/notificationModel')
const { HTTP_STATUS_CODE } = require('../consts/http-consts');
const io = require('../services/socket/socket').getIo();
const users = require('../services/socket/listener');
const Employee = require('../models/users/employeeModel');
const OrderInDesign = require('../models/orders/orderInDesignModel');

const createNewOrder = async (req, res, next) => {
    try {
        const orderData = {
            customerId: req.userId,
            customerName: req.body.customerName ? req.body.customerName : User.getUserFullName(req.userId),
            type: req.body.type,
            deadline: new Date(req.body.deadline),
            isCastingRequired: req.body.isCastingRequired
        }
        const order = await Order.create(orderData);
        if (orderData.type === ORDER_TYPES.NEW_MODEL) {
            const modelData = req.body.modelData;
            await NewModelOrder.create({orderId: order.orderId, ...modelData});
            await OrderInDesign.create({orderId: order.orderId})
            const desginMangerId = await Employee.findOne({
                where: {
                    role: ROLES.DESIGN_MANAGER
                }
            })
            const notification = {
                recipient: desginMangerId.dataValues.id,
                content: JSON.stringify({orderId: order.orderId, ...modelData})
            }
            await Notification.create(notification);
            if (users[desginMangerId]) {
                io.to(users[desginMangerId].id).emit(notification);
            }
        }
        res.status(HTTP_STATUS_CODE.CREATED).send();
        
    } catch(e) {
        console.log(e)
        next(e)
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
        res.status(HTTP_STATUS_CODE.SUCCESS).send('status updated successfully');
    } catch (e) {
        next(e);
    }
}

// const getOrderAfterDesign = async (req, res, next) => {
//     try {
//         const orderData = await ExistingModelOrder.findByPk(req.params.id, {
//             include: [
//                 {
//                     model: JewelModel
//                 },
//                 {
//                     model: Order,
//                     where: {orderId: req.params.id}
//                 }
//             ]
//         })
//     } catch (e) {
//         next(e)
//     }
// }


// const managerApprovalForOrder = async (req, res, next) => {
//     try {

//     } catch (e) {
        
//     }
// } 

module.exports = {
    createNewOrder,
    getNewModelOrder,
    setOrderDesignStatus
}