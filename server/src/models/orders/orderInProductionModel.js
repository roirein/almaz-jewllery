const {DataTypes, Sequelize, Model} = require('sequelize');
const {CASTING_STATUS} = require('../../consts/system-consts');
const sequelize = require('../../database/connection');
const Order = require('./orderModel');

class OrderInProduction extends Model {}

OrderInProduction.init({
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
    modelName: 'Orders In Production',
    sequelize
})

OrderInProduction.belongsTo(Order, {foreignKey: 'orderId'})

module.exports = OrderInProduction;
