const dbClient = require('./connection')


const insertCustomer = async (user) => {
    await dbClient.query(
        `INSERT INTO customers("firstName", "lastName", "businessName", "phoneNumberOne", "phoneNumberTwo", "Email", "Password")
        VALUES ('${user.firstName}', '${user.lastName}', '${user.businessName}', '${user.phoneNumber1}', '${user.phoneNumber2}', '${user.email}', '${user.password}');
        `)
}

const getCustomer = async (email) => {
    const users = await dbClient.query(
        `SELECT * FROM customers WHERE "Email"='${email}'`
    )
    if (users.rows.length === 0) {
        return undefined;
    }
    return users.rows[0]
}

module.exports = {
    insertCustomer,
    getCustomer
}