const {DataTypes, Sequelize, Model} = require('sequelize');
const {CASTING_STATUS} = require('../../consts/system-consts');
const sequelize = require('../../database/connection');
const {v4: uuidv4} = require('uuid');
const Employee = require('../users/employeeModel');
const Order = require('../orders/orderModel');

class TaskModel extends Model {}

TaskModel.init({
    taskId: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDv4,
        primaryKey: true,
        allowNull: false,
    }, 
    orderId: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    assigneeId: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false
    },
    position: {
        type: DataTypes.STRING,
        allowNull: false
    },
    stepInOrder: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    completed: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    nextTask: {
        type: DataTypes.UUID,
        allowNull: true
    }
}, {
    timestamps: false,
    modelName: 'Tasks',
    sequelize
})

TaskModel.beforeCreate((task) => {
    task.id = uuidv4();
})

TaskModel.belongsTo(Employee, {foreignKey: 'assigneeId'});
TaskModel.belongsTo(Order, {foreignKey: 'orderId'});

module.exports = TaskModel;