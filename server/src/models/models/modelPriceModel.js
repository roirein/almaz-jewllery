const {DataTypes, Sequelize, Model} = require('sequelize');
const JewelModel = require('./modelModel');
const sequelize = require('../../database/connection');

class PriceModel extends Model {};

PriceModel.init({
    modelNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
    },
    materials: {
        type: DataTypes.STRING,
        allowNull: false
    },
    priceWithMaterials: {
        type: DataTypes.STRING,
        allowNull: false
    },
    priceWithoutMaterials: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: false,
    modelName: 'Model Price',
    sequelize
})

PriceModel.belongsTo(JewelModel, {foreignKey: 'modelNumber'});

module.exports = PriceModel