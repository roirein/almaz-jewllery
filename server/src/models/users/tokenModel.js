const {DataTypes, Sequelize, Model} = require('sequelize');
const sequelize = require('../../database/connection');
const User = require('./userModel');

class TokenModel extends Model {}

TokenModel.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    code: {
        type: DataTypes.STRING,
        allowNull: false
    },
    expiryTime: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    timestamps: false,
    modelName: 'Tokens',
    sequelize
})

User.hasOne(TokenModel, {foreignKey: 'id'})
TokenModel.belongsTo(User, {foreignKey: 'id'});

module.exports = TokenModel