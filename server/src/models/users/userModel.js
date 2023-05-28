const {DataTypes, Sequelize, Model} = require('sequelize');
const sequelize = require('../../database/connection');
const {v4: uuidv4} = require('uuid');
const bcrypt = require('bcryptjs');

class User extends Model{
    static async getUserFullName(userId) {
        const user = await User.findByPk(userId)
        return `${user.dataValues.firstName} ${user.dataValues.lastName}`
    }
}

User.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            is: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    token: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true
    }
}, {
    timestamps: false,
    sequelize,
    modelName: 'User'
});

User.beforeCreate(async (user) => {
    user.id = uuidv4();

    const isPasswordLengthValid = user.password.length >= 8 && user.password.length <= 24;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%&*!])[A-Za-z\d@#$%&*!]{8,}$/;

    const isValidPassword = passwordRegex.test(user.password)
    console.log(isValidPassword, user.password, user.firstName)
    if (!isPasswordLengthValid || !isValidPassword) {
        throw new Error('invalid password')
    }
    user.password = await bcrypt.hash(user.password, Number(process.env.HASH_SALT));
})

module.exports = User