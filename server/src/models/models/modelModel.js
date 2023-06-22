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
    metadataId: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    design: {
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