const {DataTypes, Sequelize, Model} = require('sequelize');
const sequelize = require('../../database/connection');
const { ORDER_STATUS } = require('../../consts/system-consts');

class Order extends Model {};

Order.init({
    orderId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    customerId: { //in case order was done by manager, it will be the manager id
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false
    },
    customerName: {
        type: DataTypes.STRING,
        allowNull: false,
        charset: 'utf8',
        collate: 'utf8_general_ci'
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
        type: DataTypes.INTEGER,
        allowNull: true
    },
    deadline: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    timestamps: false,
    sequelize,
    modelName: "Order"
})

module.exports = Order