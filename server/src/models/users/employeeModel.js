const {DataTypes, Sequelize} = require('sequelize');
const sequlize = require('../../database/connection');
const User = require('./userModel');

const Employee = sequlize.define('Employee', {
    id: {
        type: DataTypes.UUID,
        defaultValue:  Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false
    },
    shouldReplacePassword: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false
    }
}, {
    timestamps: false
})

Employee.belongsTo(User, {foreignKey: 'id'})

module.exports = Employee;