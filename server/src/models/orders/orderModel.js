const {DataTypes, Sequelize, Model} = require('sequelize');
const sequelize = require('../../database/connection');
const {v4: uuidv4} = require('uuid');
const { ORDER_STATUS } = require('../../consts/system-consts');

class Order extends Model {};

Order.init({
    orderId: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    customerId: { //in case order was done by manager, it will be the manager id
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false
    },
    customerName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: ORDER_STATUS.CREATED
    },
    price: {
        type: DataTypes.DECIMAL,
        allowNull: true
    },
    deadline: {
        type: DataTypes.DATE,
        allowNull: false
    },
    actualCompletionTime: {
        type: DataTypes.DATE,
        allowNull: true
    },
    isCastingRequired: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
}, {
    timestamps: false,
    sequelize,
    modelName: "Order"
})

Order.beforeCreate((order) => {
    order.orderId = uuidv4();
})

module.exports = Order