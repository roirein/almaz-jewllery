const {DataTypes, Sequelize, Model} = require('sequelize');
const {CASTING_STATUS} = require('../../consts/system-consts');
const sequelize = require('../../database/connection');
const Order = require('./orderModel');

class OrderInCasting extends Model {}

OrderInCasting.init({
    orderId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: CASTING_STATUS.NOT_SENT
    }
}, {
    timestamps: false,
    modelName: 'Orders In Casting',
    sequelize
})

OrderInCasting.belongsTo(Order, {foreignKey: 'orderId'})

module.exports = OrderInCasting
