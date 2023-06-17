const {DataTypes, Sequelize, Model} = require('sequelize');
const sequelize = require('../../database/connection');
const {v4: uuidv4} = require('uuid');
const bcrypt = require('bcryptjs');

class User extends Model{
    static async getUserFullName(userId) {
        const user = await User.findByPk(userId)
        return `${user.dataValues.firstName} ${user.dataValues.lastName}`
    }

    static async validateUserPassword(password){
        const isPasswordLengthValid = password.length >= 8 && password.length <= 24;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%&*!])[A-Za-z\d@#$%&*!]{8,}$/;
        const isValidPassword = passwordRegex.test(password)
        if (!isPasswordLengthValid || !isValidPassword) {
            throw new Error('invalid password')
        }
        const hashedPassword = await bcrypt.hash(password, Number(process.env.HASH_SALT));
        return hashedPassword
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
        charset: 'utf8',
        collate: 'utf8_general_ci'
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        charset: 'utf8',
        collate: 'utf8_general_ci'
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
    user.password = await User.validateUserPassword(user.password)
})


User.beforeUpdate(async (user, options) => {
    if (user.changed('password')) {
        user.password = await User.validateUserPassword(user.password)
    }
})

module.exports = User