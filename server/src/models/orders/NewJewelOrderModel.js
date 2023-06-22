const {DataTypes, Sequelize, Model} = require('sequelize');
const sequelize = require('../../database/connection');
const { ORDER_STATUS } = require('../../consts/system-consts');
const Order = require('./orderModel');

class NewJewelOrder extends Model{}

NewJewelOrder.init({
    orderId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    item: {
        type: DataTypes.STRING,
        allowNull: false
    },
    metal: {
        type: DataTypes.STRING,
        allowNull: false
    },
    size: {
        type: DataTypes.STRING,
        allowNull: false
    },
    casting: {
        type: DataTypes.BOOLEAN,
    },
    comments: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    modelNumber: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    modelName: 'Jewel Orders',
    sequelize,
    timestamps: false
}) 

Order.hasOne(NewJewelOrder, {foreignKey: 'orderId'})
NewJewelOrder.belongsTo(Order, {foreignKey: 'orderId'})

module.exports = NewJewelOrder  