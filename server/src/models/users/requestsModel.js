const {DataTypes, Sequelize, Model, DATE} = require('sequelize');
const sequelize = require('../../database/connection');
const {v4: uuidv4} = require('uuid');
const { REQUESTS_STATUS } = require('../../consts/system-consts');
const Customer = require('./customerModel');

class Requests extends Model {}

Requests.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: REQUESTS_STATUS.PENDING,
        allowNull: false
    }
}, {
    sequelize,
    timestamps: false,
    modelName: 'Requests'
})

Customer.hasOne(Requests, {foreignKey: 'id'})
Requests.belongsTo(Customer, {foreignKey: 'id'})

module.exports = Requests
