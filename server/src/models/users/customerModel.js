const {DataTypes, Sequelize} = require('sequelize');
const sequelize = require('../../database/connection');
const User = require('./userModel')

const Customer = sequelize.define('Customer', {
    id: {
        type: DataTypes.UUID,
        defaultValue:  Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    businessName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    secondaryPhone: {
        type: DataTypes.STRING, // add validation that enforce this number not to appear in user table
        allowNull: true,
        validate: {
            is: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
        }
    }
}, {
    timestamps: false
});

User.hasOne(Customer, {foreignKey: 'id'})
Customer.belongsTo(User, {foreignKey: 'id'});

module.exports = Customer