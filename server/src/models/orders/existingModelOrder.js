const {DataTypes, Sequelize, Model} = require('sequelize');
const sequelize = require('../../database/connection');
const JewelModel = require('../models/modelModel');
const Order = require('./orderModel');

class ExistingModelOrder extends Model {}

ExistingModelOrder.init({
    orderId: {
        type: DataTypes.UUID,
        defaultValue:  Sequelize.UUIDV4,
        primaryKey: true,
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
    modelNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    comments: {
        type: DataTypes.STRING
    },
    wasOriginallyNewModelOrder: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
}, {
    sequelize,
    modelName: 'Existing Model Orders',
    timestamps: false
});

ExistingModelOrder.belongsTo(Order, {foreignKey: 'orderId'});
ExistingModelOrder.hasOne(JewelModel, {foreignKey: 'modelNumber'})

module.exports = ExistingModelOrder;
