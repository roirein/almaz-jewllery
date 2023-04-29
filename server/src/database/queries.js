const dbClient = require('./connection')
const {CUSTOMER_TABLE_COLUMNS_NAMES, USER_TABLE_COLUMNS_NAMES} = require('../consts/db-consts')

const insertUser = async (user) => {
    await dbClient.query(
        `INSERT INTO users (
            "${USER_TABLE_COLUMNS_NAMES.ID}", 
            "${USER_TABLE_COLUMNS_NAMES.FIRST_NAME}", 
            "${USER_TABLE_COLUMNS_NAMES.LAST_NAME}", 
            "${USER_TABLE_COLUMNS_NAMES.EMAIL}", 
            "${USER_TABLE_COLUMNS_NAMES.PASSWORD}")
        VALUES ('${user.id}', '${user.firstName}', '${user.lastName}', '${user.email}', '${user.password}');
        `)
}

const insertCustomer = async (customer) => {
    await dbClient.query(
        `INSERT INTO customers (
            "${CUSTOMER_TABLE_COLUMNS_NAMES.USER_ID}",
            "${CUSTOMER_TABLE_COLUMNS_NAMES.CUSTOMER_ID}",
            "${CUSTOMER_TABLE_COLUMNS_NAMES.BUSINESS_NAME}",
            "${CUSTOMER_TABLE_COLUMNS_NAMES.PHONE_ONE}",
            "${CUSTOMER_TABLE_COLUMNS_NAMES.PHONE_TWO}")
        VALUES ('${customer.userId}', '${customer.customerId}', '${customer.businessName}', '${customer.phoneNumber1}', '${customer.phoneNumber2}');
        `)
}

const getUserByEmail = async (email) => {
    const users = await dbClient.query(
        `SELECT * FROM users WHERE "Email"='${email}'`
    )

    if (users.rows.length === 0) {
        return undefined;
    }
    return users.rows[0];
}

const getUserById = async (id) => {
    const users = await dbClient.query(
        `SELECT * FROM users WHERE "Id"='${id}'`
    )

    if (users.rows.length === 0) {
        return undefined;
    }
    return users.rows[0];
}

const updateUserToken = async (token, userId) => {
    await dbClient.query(
        `UPDATE "users"
        SET "Token"='${token}' WHERE "Id"='${userId}'
        `
    )
}

module.exports = {
    insertUser,
    insertCustomer,
    getUserByEmail,
    getUserById,
    updateUserToken
}