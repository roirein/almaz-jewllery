const {DataTypes, Sequelize, Model, DATE} = require('sequelize');
const sequelize = require('../../database/connection');
const JewelModel = require('./modelModel')
const {v4: uuidv4} = require('uuid');
class ModelMetadata extends Model{}

ModelMetadata.init({
    metadataId: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false
    }, 
    item: {
        type: DataTypes.STRING,
        allowNull: false
    },
    setting: {
        type: DataTypes.STRING,
        allowNull: false   
    },
    sideStoneSize: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1
        }
    },
    mainStoneSize: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1
        }
    },
    comments: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    initialImage: {
        type: DataTypes.STRING,
        allowNull: false
    },
    modelNumber: {
        type: DataTypes.STRING,
        allowNull: true
    },
    orderId: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
}, {
    modelName: 'Model Metadata',
    sequelize,
    timestamps: false
})

ModelMetadata.beforeCreate((modelMetadata) => {
    modelMetadata.metadataId = uuidv4()
})

ModelMetadata.hasOne(JewelModel, {foreignKey: 'metadataId'})
JewelModel.belongsTo(ModelMetadata, {foreignKey: 'metadataId'})

module.exports = ModelMetadata