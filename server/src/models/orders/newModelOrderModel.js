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
        allowNull: false,
        charset: 'utf8',
        collate: 'utf8_general_ci'
    },
    metal: {
        type: DataTypes.STRING,
        allowNull: false,
        charset: 'utf8',
        collate: 'utf8_general_ci'
    },
    size: {
        type: DataTypes.STRING,
        allowNull: false,
        charset: 'utf8',
        collate: 'utf8_general_ci'
    },
    inlay: {
        type: DataTypes.STRING,
        allowNull: false,
        charset: 'utf8',
        collate: 'utf8_general_ci'
    },
    mainStone: {
        type: DataTypes.STRING,
        allowNull: false,
        charset: 'utf8',
        collate: 'utf8_general_ci'
    },
    sideStone: {
        type: DataTypes.STRING,
        allowNull: false,
        charset: 'utf8',
        collate: 'utf8_general_ci'
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false,  
    },
    comments: {
        type: DataTypes.STRING,
        charset: 'utf8',
        collate: 'utf8_general_ci'
    }
}, {
    timestamps: false,
    sequelize,
    modelName: 'New Model Order'
})

NewModelOrder.belongsTo(Order, {foreignKey: 'orderId'});

module.exports = NewModelOrder;
