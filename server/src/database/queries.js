const getInsertUserQuery = (user) => {
    return `INSERT INTO customers("firstName", "lastName", "businessName", "phoneNumberOne", "phoneNumberTwo", "Email", "Password")
            VALUES ('${user.firstName}', '${user.lastName}', '${user.businessName}', '${user.phoneNumber1}', '${user.phoneNumber2}', '${user.email}', '${user.password}');
            `
}

module.exports = {
    getInsertUserQuery
}