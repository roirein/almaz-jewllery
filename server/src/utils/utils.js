const {sendTemporaryPasswordMail} = require('../services/emails/emails')
const {USER_TYPES} = require('../consts/system-consts');
const User = require('../models/users/userModel');
const Employee = require('../models/users/employeeModel');
const bcrypt = require('bcryptjs');

const genertaePassword = () => {
    const uppers = 'abcdefghijklmnopqrstuvwxyz';
    const lowers = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '01234567890';
    const specials = '@#$%&*';

    const charsets = [uppers, lowers, numbers, specials];
    const shuffled = [...charsets];

    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    let password = ''

    for (let i = 0; i < 2; i++) {
        for (let j = 0; j < shuffled.length; j++) {
            const index = Math.floor(Math.random() * shuffled[j].length);
            const char = shuffled[j].charAt(index);
            password += char
        }
    }


    return password;

}

const createAndInsertNewEmployee = async (record) => {
    const temporaryPassword = genertaePassword();
    const user = {
        firstName: record[0],
        lastName: record[1],
        email: record[2],
        phone: record[3],
        password: temporaryPassword,
        type: USER_TYPES.EMPLOYEE
    }

    const employee = {
        role: record[4],
        shouldReplacePassword: true,
        field: record[5]
    }
    sendTemporaryPasswordMail(temporaryPassword, record[2]);
    const newUser = await User.create(user);
    await Employee.create({id: newUser.id, ...employee});
}

const genertaeResetPasswordCode = () => {
    const min = 100000
    const max = 999999
    const randomCode = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomCode
}

const validatePassword = async (password) => {
    const isPasswordLengthValid = password >= 8 && password <= 24;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%&*!])[A-Za-z\d@#$%&*!]{8,}$/;

    const isValidPassword = passwordRegex.test(password)
    if (!isPasswordLengthValid || !isValidPassword) {
        throw new Error('invalid password')
    }
    const hashedPassword = await bcrypt.hash(password, Number(process.env.HASH_SALT));
    return hashedPassword
}

module.exports = {
    createAndInsertNewEmployee,
    genertaeResetPasswordCode,
    validatePassword
}