const {DataTypes, Sequelize, Model} = require('sequelize');
const { MODEL_STATUS } = require('../../consts/system-consts');
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
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: MODEL_STATUS.CREATED
    }
}, {
    timestamps: false,
    sequelize,
    modelName: 'Model'
});

module.exports = JewelModel