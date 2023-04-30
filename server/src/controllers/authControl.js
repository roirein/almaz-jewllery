const bcrypt = require('bcryptjs');
const {v4: uuidv4} = require('uuid');
const jwt = require('jsonwebtoken');
const { HTTP_STATUS_CODES } = require('../consts/system-consts');
const {insertUser, insertCustomer, getUserByEmail, updateUserToken} = require('../database/queries')

const createCustomer = async (req, res, io) => {

    const hashedPassword = await bcrypt.hash(req.body.password, Number(process.env.HASH_SALT))
    const userId = uuidv4()

    const user = {
        id: userId,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashedPassword,
        shouldReplace: false
    }

    const customer = {
        userId,
        customerId: uuidv4(),
        businessName: req.body.businessName,
        phoneNumber1: req.body.phoneNumber1,
        phoneNumber2: req.body.phoneNumber2
    }
    io.emit('newCustomer', {...user, ...customer})
    await insertUser(user);
    await insertCustomer(customer);
    res.status(HTTP_STATUS_CODES.CREATED).send('User created successfully')
}

const loginUser = async (req, res) => {
    const user = await getUserByEmail(req.body.email);
    const token = jwt.sign({_id: user.Id}, process.env.JWT_SECRET)
    user.Token = token;
    await updateUserToken(token, user.Id);
    delete user.Password
    res.status(HTTP_STATUS_CODES.SUCCESS).send(user)
}

const logoutUser = async (req, res) => {
    await updateUserToken(null, req.userId);
    res.status(HTTP_STATUS_CODES.SUCCESS).send({})
}

module.exports = {
    createCustomer,
    loginUser,
    logoutUser
}