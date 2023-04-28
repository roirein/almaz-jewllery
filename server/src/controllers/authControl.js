const bcrypt = require('bcryptjs');
const {v4: uuidv4} = require('uuid');
const jwt = require('jsonwebtoken');
const { HTTP_STATUS_CODES } = require('../consts/system-consts');
const {insertUser, insertCustomer, getCustomerByEmail, updateUserToken} = require('../database/queries')

const createCustomer = async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 8)
    const userId = uuidv4()

    const user = {
        id: userId,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashedPassword
    }

    const customer = {
        userId,
        customerId: uuidv4(),
        businessName: req.body.businessName,
        phoneNumber1: req.body.phoneNumber1,
        phoneNumber2: req.body.phoneNumber2
    }

    await insertUser(user)
    await insertCustomer(customer);
    res.status(HTTP_STATUS_CODES.CREATED).send('User created successfully')
}

const loginUser = async (req, res) => {
    const user = await getCustomerByEmail(req.body.email);
    const token = jwt.sign({_id: user.Id}, 'secret')
    user.Token = token;
    updateUserToken(token, user.Email);
    delete user.password
    res.status(HTTP_STATUS_CODES.SUCCESS).send(user)
}

module.exports = {
    createCustomer,
    loginUser
}