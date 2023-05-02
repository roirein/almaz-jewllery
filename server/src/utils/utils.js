const {v4: uuidv4} = require('uuid');
const bcrypt = require('bcryptjs');
const {sendTemporaryPasswordMail} = require('../emails/emails');
const {insertUser, insertEmployee} = require('../database/queries');

const createAndInsertNewEmployee = async (record) => {
    const userId = uuidv4();
    const employeeId = uuidv4();
    const temporaryPassword = Math.random().toString(36).slice(-8);
    const hashedPassword = await bcrypt.hash(temporaryPassword, Number(process.env.HASH_SALT))

    const user = {
        id: userId,
        firstName: record[0],
        lastName: record[1],
        email: record[2],
        password: hashedPassword,
        shouldReplace: true
    }

    const employee = {
        userId: userId,
        employeeId: employeeId,
        permissionLevel: record[3]
    }
    sendTemporaryPasswordMail(temporaryPassword, record[2]);
    await insertUser(user);
    await insertEmployee(employee);
}

module.exports = {
    createAndInsertNewEmployee
}