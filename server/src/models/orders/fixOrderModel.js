const {DataTypes, Sequelize, Model} = require('sequelize');
const sequelize = require('../../database/connection');
const Order = require('./orderModel');

class FixOrder extends Model {}

FixOrder.init({
    orderId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    item: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: false,
    modelName: 'Fix Orders',
    sequelize
});

FixOrder.belongsTo(Order, {foreignKey: 'orderId'});

module.exports = FixOrder;