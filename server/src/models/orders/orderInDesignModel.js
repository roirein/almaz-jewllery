const {DataTypes, Sequelize, Model} = require('sequelize');
const { DESIGN_STATUS } = require('../../consts/system-consts');
const sequelize = require('../../database/connection');
const Order = require('./orderModel');

class OrderInDesign extends Model {}

OrderInDesign.init({
    orderId: {
        type: DataTypes.UUID,
        defaultValue:  Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: DESIGN_STATUS.CREATED
    }
}, {
    timestamps: false,
    modelName: 'Orders In Design',
    sequelize
})

OrderInDesign.belongsTo(Order, {foreignKey: 'orderId'})

module.exports = OrderInDesign
