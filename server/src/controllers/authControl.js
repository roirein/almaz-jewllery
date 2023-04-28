const bcrypt = require('bcrypt');
const { HTTP_STATUS_CODES } = require('../consts/consts');
const {insertCustomer} = require('../database/queries')

const createCustomer = async (req, res) => {

    const hashedPassword = await bcrypt.hash(req.body.password, 8)

    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        businessName: req.body.businessName,
        phoneNumber1: req.body.phoneNumber1,
        phoneNumber2: req.body.phoneNumber2,
        email: req.body.email,
        password: hashedPassword
    }

    await insertCustomer(user);
    res.status(HTTP_STATUS_CODES.CREATED).send('User created successfully')
}

module.exports = {
    createCustomer
}