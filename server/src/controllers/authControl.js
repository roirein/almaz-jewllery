const bcrypt = require('bcryptjs');
const {v4: uuidv4} = require('uuid');
const jwt = require('jsonwebtoken');
const { HTTP_STATUS_CODES } = require('../consts/system-consts');
const {insertUser, insertCustomer, getUserByEmail, updateUserToken, insertRequest, setNewPassword, getCustomerByUserId, getEmployeeByUserId} = require('../database/queries');
const io = require('../socket/socket').getIo()
const users = require('../socket/listener');

const createCustomer = async (req, res) => {

    const hashedPassword = await bcrypt.hash(req.body.password, Number(process.env.HASH_SALT))
    const userId = uuidv4()

    const user = {
        id: userId,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashedPassword,
        shouldReplace: false,
        isCustomer: true
    }

    const customer = {
        userId,
        customerId: uuidv4(),
        businessName: req.body.businessName,
        phoneNumber1: req.body.phoneNumber1,
        phoneNumber2: req.body.phoneNumber2
    }
    const userData = {...user, ...customer};
    const request = {
        id: uuidv4(),
        requesterId: userId,
    };
    delete userData.password;
    console.log(users)
    const adminSocketId = Object.entries(users).find(entry => entry[1].permissionLevel === 0);
    if (adminSocketId) {
        console.log(adminSocketId[1].socketId)
        io.to(adminSocketId[1].socketId).emit(userData);
    }
    await insertRequest(request);
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
    const userAdditionalData = user.isCustomer ? await getCustomerByUserId(user.Id) : await getEmployeeByUserId(user.Id);
    console.log(userAdditionalData)
    res.status(HTTP_STATUS_CODES.SUCCESS).send({...user, ...userAdditionalData})
}

const logoutUser = async (req, res) => {
    await updateUserToken(null, req.userId);
    res.status(HTTP_STATUS_CODES.SUCCESS).send({})
}

const resetPassword = async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, process.env.HASH_SALT);
    await setNewPassword(req.body.email, hashedPassword);
    res.status(HTTP_STATUS_CODES.SUCCESS).send('Password changed succesffully')
} 

module.exports = {
    createCustomer,
    loginUser,
    logoutUser,
    resetPassword
}