const {USER_TYPES} = require('../consts/system-consts');
const HttpError = require('../utils/classes/http-error');
const {HTTP_STATUS_CODE} = require('../consts/http-consts');
const {REGISTERATION_MESSAGES, LOGIN_MESSAGES} = require('../consts/messages');
const User = require('../models/users/userModel');
const Customer = require('../models/users/customerModel');
const Notification = require('../models/messages/notificationModel');
const Employee = require('../models/users/employeeModel');
const {Op} = require('sequelize')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const io = require('../services/socket/socket').getIo();

const createNewCustomer = async (req, res, next) => {
    try{
        if (req.body.password !== req.body.confirmPassword) {
            throw new HttpError(REGISTERATION_MESSAGES.INCORRECT_PASSWORD_CONFIRMATION, HTTP_STATUS_CODE.BAD_REQUEST);
        }

        const cust = await Customer.findOne({
            include: User,
            where: {
                [Op.or]: [
                    {businessName: req.body.businessName},
                    {'$User.email$': req.body.email},
                    {'$User.phone$': req.body.phone}
                ]
            }
        })

        if (cust) {
            throw new HttpError(REGISTERATION_MESSAGES.USER_EXIST, HTTP_STATUS_CODE.CONFLICT)
        }
        const newUser = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            phone: req.body.phone,
            password: req.body.password,
            type: USER_TYPES.CUSTOMER
        };
    
        const newCustomer = {
            businessName: req.body.businessName,
            secondaryPhone: req.body.secondaryPhone
        };
    
        const user = await User.create(newUser);
        await Customer.create({id: user.id, ...newCustomer});

        const notification = {
            recipient: 'admins',
            content: `${firstName} ${lastName} asked to join the system, please approve or decline his/her request`
        }

        await Notification.create(notification);
        io.to('admins').emit('new-user', notification);
        res.status(HTTP_STATUS_CODE.CREATED).send(REGISTERATION_MESSAGES.USER_CREATED_SUCCESS);
    } catch (e) {
        console.log(e)
        next(e)
    }
}

const loginUser = async (req, res, next) => {
    try {
        if (!req.body.email || !req.body.password) {
            throw new HttpError(LOGIN_MESSAGES.EMPTY_FIELDS, HTTP_STATUS_CODE.BAD_REQUEST);
        }
        const user = await User.findOne({
            where: {
                email: req.body.email,
            }
        })
        if (!user) {
            throw new HttpError(LOGIN_MESSAGES.INVALID_CREDENTIALS, HTTP_STATUS_CODE.UNAUTHORIZED);            
        } 
        const isPasswordMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isPasswordMatch) {
            throw new HttpError(LOGIN_MESSAGES.INVALID_CREDENTIALS, HTTP_STATUS_CODE.UNAUTHORIZED); 
        }
        if (user.type === USER_TYPES.EMPLOYEE) {
            const employee = await Employee.findByPk(user.dataValues.id);
            if (employee.dataValues.shouldReplacePassword) {
                // redirect to reset password
            }
        }
        if (user.type === USER_TYPES.CUSTOMER) {
            const customer = await Customer.findByPk(user.dataValues.id);
            if (!customer.dataValues.isApproved) {
                throw new HttpError('You must wait for the admin to approve your user', HTTP_STATUS_CODE.FORBIDDEN);
            }  
        }
        const authToken = jwt.sign({_id: user.dataValues.id}, process.env.JWT_SECRET);
        user.token = authToken;
        await user.save();
        res.status(HTTP_STATUS_CODE.SUCCESS).send(LOGIN_MESSAGES.LOGGED_IN_SUCCESSFULLY);

    } catch(e) {
        next(e)
    }
}

const logoutUser = async (req, res, next) => {
    try {
        const user = await User.findOne({
            where: {
                id: req.userId
            }
        });

        user.token = null;
        await user.save();
        res.status(HTTP_STATUS_CODE.SUCCESS).send()
    } catch(e) {
        next(e);
    }
}

module.exports = {
    createNewCustomer,
    loginUser,
    logoutUser
}