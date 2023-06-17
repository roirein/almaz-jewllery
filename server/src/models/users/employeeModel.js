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
    },
    field: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    timestamps: false
})

Employee.belongsTo(User, {foreignKey: 'id'})
User.hasOne(Employee, {foreignKey: 'id'})

module.exports = Employee;