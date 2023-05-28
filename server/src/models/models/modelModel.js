const {DataTypes, Sequelize, Model} = require('sequelize');
const sequelize = require('../../database/connection');

class JewelModel extends Model {}

JewelModel.init({
    modelNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        unique: true
    },
    item: {
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
    inlay: {
        type: DataTypes.STRING,
        allowNull: false
    }, 
    initiallDesign: {
        type: DataTypes.STRING,
        allowNull: false
    },
    finalDesign: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    material: {
        type: DataTypes.STRING,
    },
    priceWithMaterial: {
        type: DataTypes.FLOAT
    },
    priceWithoutMaterial: {
        type: DataTypes.FLOAT
    }
}, {
    timestamps: false,
    sequelize,
    modelName: 'Model'
});

module.exports = JewelModel