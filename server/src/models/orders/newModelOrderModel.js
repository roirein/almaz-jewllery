const {DataTypes, Sequelize, Model} = require('sequelize');
const sequelize = require('../../database/connection');
const Order = require('./orderModel');

class NewModelOrder extends Model {};

NewModelOrder.init({
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
    inlay: {
        type: DataTypes.STRING,
        allowNull: false
    },
    mainStone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    sideStone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false
    },
    comments: {
        type: DataTypes.STRING,
    }
}, {
    timestamps: false,
    sequelize,
    modelName: 'New Model Order'
})

NewModelOrder.belongsTo(Order, {foreignKey: 'orderId'});

module.exports = NewModelOrder;
