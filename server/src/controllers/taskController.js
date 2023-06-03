const { HTTP_STATUS_CODE } = require("../consts/http-consts");
const { PRODUCTION_STATUS, ORDER_STATUS } = require("../consts/system-consts");
const OrderInProduction = require("../models/orders/orderInProductionModel");
const Order = require("../models/orders/orderModel");
const TaskModel = require("../models/tasks/taskModel");

const createNewTask = async (req, res, next) => {
    try {
        const taskData = {
            orderId: req.params.orderId,
            assigneeId: req.body.employeeId,
            content: req.body.content,
            position: req.body.position,
            stepInOrder: req.body.stepInOrder
        }
        const task = await TaskModel.create(taskData);
        if (req.body.previousTask) {
            TaskModel.update({
                nextTask: task.taskId
            }, {
                where: req.body.previousTask
            })
        }
        if (task.stepInOrder === 1) {
            await OrderInProduction.update({
                status: PRODUCTION_STATUS[position]
            }, {
                where: {
                    orderId: task.orderId
                }
            })
        }
        res.status(HTTP_STATUS_CODE.CREATED).send('Task created successfully');
    } catch (e) {
        next(e);
    }
}

const updateTask = async (req, res, next) => {
    try {
        const task = TaskModel.findOne({
            where: {
                taskId: req.params.taskId
            }
        })
        const allowedFields = ['content', 'assigneeId'];
        allowedFields.forEach((field) => {
            if (req.body[field]) {
                task[field] = req.body[field];
            }
        })
        res.send(HTTP_STATUS_CODE.SUCCESS).send('Task updated successfully')
    } catch (e) {
        next(e)
    }
}

const getTask = async (req, res, next) => {
    try {
        const task = TaskModel.findOne({
            where: {
                taskId: req.body.taskId
            }
        })
        res.status(HTTP_STATUS_CODE.SUCCESS).send(task)
    } catch (e){
        next(e)
    }
}

const markTaskAsConmpleted = async (req, res, next) => {
    try {
        const task = await TaskModel.findOne({
            where: req.params.taskId
        });
        task.completed = true;
        let nextTaskPosition;
        if (task.nextTask) {
            nextTaskPosition = await TaskModel.findOne({
                where: {
                    taskId: task.nextTask
                },
                attributes: ['position'] 
            })
        }
        await OrderInProduction.update({
            status: nextTaskPosition ? PRODUCTION_STATUS[nextTaskPosition] : PRODUCTION_STATUS.COMPLETED
        }, {
            where: {
                orderId: task.orderId
            }
        });
        if (!nextTaskPosition) {
            await Order.update({
                status: ORDER_STATUS.READY
            }, {
                where: {
                    orderId: task.orderId
                }
            })
        }
        res.status(HTTP_STATUS_CODE.SUCCESS).send();
    } catch(e) {
        next(e)
    }
}

module.exports = {
    createNewTask,
    updateTask,
    getTask,
    markTaskAsConmpleted
}