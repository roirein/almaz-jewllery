const { HTTP_STATUS_CODE } = require("../consts/http-consts");
const TaskModel = require("../models/tasks/taskModel");

const createNewTask = async (req, res, next) => {
    try {
        const taskData = {
            orderId: req.params.orderId,
            assigneeId: req.body.employeeId,
            content: req.body.content,
            blockerTaskId: req.body.previousTask
        }

        await TaskModel.create(taskData);
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

module.exports = {
    createNewTask,
    updateTask
}