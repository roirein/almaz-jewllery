const {DataTypes, Sequelize, Model} = require('sequelize');
const {CASTING_STATUS} = require('../../consts/system-consts');
const sequelize = require('../../database/connection');
const Order = require('./orderModel');

class OrderInProduction extends Model {}

OrderInProduction.init({
    orderId: {
        type: DataTypes.UUID,
        defaultValue:  Sequelize.UUIDV4,
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

OrderInProduction.belongsTo(Order, {foreignKey: 'orderId'})

module.exports = OrderInProduction;