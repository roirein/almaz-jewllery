const {DataTypes, Sequelize, Model} = require('sequelize');
const sequelize = require('../../database/connection');
const Order = require('./orderModel');

class OrderTimeline extends Model {}

OrderTimeline.init({
    orderId: {
        type: DataTypes.UUID,
        defaultValue:  Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    designStart: {
        type: DataTypes.DATE,
    },
    designCompletion: {
        type: DataTypes.DATE,
        allowNull: false
    },
    castingStart: {
        type: DataTypes.DATE,
        allowNull: false
    },
    castingCompletion: {
        type: DataTypes.DATE,
    },
    productionStart: {
        type: DataTypes.DATE,
        allowNull: false
    },
    productionCompletion: {
        type: DataTypes.DATE,
        allowNull: false
    },
    orderCompletion: {
        type: DataTypes.DATE,
        allowNull: false
    }, 
    orderDelivery: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    timestamps: false,
    modelName: 'Orders Timeline',
    sequelize
});

OrderTimeline.belongsTo(Order, {foreignKey: 'orderId'});

module.exports = OrderTimeline;