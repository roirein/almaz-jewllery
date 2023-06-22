const {DataTypes, Sequelize, Model} = require('sequelize');
const JewelModel = require('./modelModel');
const sequelize = require('../../database/connection');
const {v4: uuidv4} = require('uuid')

class ModelComments extends Model {}

ModelComments.init({
    commentId: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
        unique: true
    },
    modelNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
    },
    comments: {
        type: DataTypes.TEXT,
        allowNull: false
    },
}, {
    timestamps: 'false',
    sequelize,
    modelName: 'Model Comments'
})

ModelComments.beforeCreate((comments) => {
    comments.id = uuidv4()
})

ModelComments.belongsTo(JewelModel, {foreignKey: 'modelNumber'});

module.exports = ModelComments;