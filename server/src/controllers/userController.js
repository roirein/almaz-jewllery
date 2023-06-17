const {USER_TYPES, REQUESTS_STATUS} = require('../consts/system-consts');
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
const Requests = require('../models/users/requestsModel');
const { genertaeResetPasswordCode } = require('../utils/utils');
const { sendResetPasswordCode } = require('../services/emails/emails');
const TokenModel = require('../models/users/tokenModel');

const createNewCustomer = async (req, res, next) => {
    try{
        if (req.body.password !== req.body.confirmPassword) {
            throw new HttpError(REGISTERATION_MESSAGES.INCORRECT_PASSWORD_CONFIRMATION, HTTP_STATUS_CODE.BAD_REQUEST);
        }

        const cust = await User.findOne({
            where: {
                [Op.or]: [
                    //{businessName: req.body.businessName},
                    {email: req.body.email},
                    {phone: req.body.phone}
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
        await Requests.create({id: user.id})

        // const notification = {
        //     recipient: 'admins',
        //     content: `${firstName} ${lastName} asked to join the system, please approve or decline his/her request`
        // }

        // await Notification.create(notification);
        //io.to('admins').emit('new-user', notification);
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
        let role = null
        if (user.type === USER_TYPES.EMPLOYEE) {
            const employee = await Employee.findByPk(user.dataValues.id);
            role = employee.role
            if (employee.dataValues.shouldReplacePassword) {
                throw new HttpError('employee-error', HTTP_STATUS_CODE.FORBIDDEN)
            }
        }
        if (user.type === USER_TYPES.CUSTOMER) {
            const customer = await Customer.findOne({
                where: {
                    id: user.dataValues.id,
                },
                include: Requests
            });
            role = USER_TYPES.CUSTOMER
            if (customer.dataValues.Request.dataValues.status !== REQUESTS_STATUS.APPROVED) {
                throw new HttpError('customer-error', HTTP_STATUS_CODE.FORBIDDEN);
            }

        }
        const authToken = jwt.sign({_id: user.dataValues.id}, process.env.JWT_SECRET);
        user.token = authToken;
        await user.save();
        res.cookie('token', authToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production'
        });
        res.cookie('role', role ? role : USER_TYPES.CUSTOMER, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
          });
        
        res.status(HTTP_STATUS_CODE.SUCCESS).send({token: user.token, role, id: user.dataValues.id});

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

const sendResetPasswordMail = async (req, res, next) => {
    try {
        const user = await User.findOne({
            where: {
                email: req.body.email
            } 
        })
        if (!user) {
            throw new HttpError('email not exists', HTTP_STATUS_CODE.NOT_FOUND)
        }
        const code = genertaeResetPasswordCode();
        await TokenModel.create({
            id: user.dataValues.id,
            code,
            expiryTime: new Date(Date.now() + 300000)
        })
        sendResetPasswordCode(user.dataValues.firstName, user.dataValues.lastName, user.dataValues.email, code);
        res.status(HTTP_STATUS_CODE.SUCCESS).send()
    } catch (e) {
        next(e)
    }
}

const verifyChangePassword = async (req, res, next) => {
    try {
        const user = await User.findOne({
            where: {
                email: req.body.email
            },
            include: TokenModel
        })
        const token = user.dataValues.Token;
        if (token.dataValues.code === req.body.code) {
            if (Date.now() >= token.dataValues.expiryTime.getTime()){
                throw new HttpError('expiry-error', HTTP_STATUS_CODE.UNAUTHORIZED)
            }
            res.status(HTTP_STATUS_CODE.SUCCESS).send()
        } else {
            throw new HttpError('code-error', HTTP_STATUS_CODE.UNAUTHORIZED)
        }
    } catch(e) {
        next(e)
    }
}

const updatePassword = async (req, res, next) => {
    try {
        if (req.body.confirmPassword !== req.body.password) {
            throw new HttpError('passwords not equal', HTTP_STATUS_CODE.BAD_REQUEST)
        }

        const user = await User.findOne({
            where: {
                email: req.body.email
            }
        })

        user.password = req.body.password
        if (user.dataValues.type === USER_TYPES.EMPLOYEE) {
            await Employee.update({
                shouldReplacePassword: false
            }, {
                where: {
                    id: user.dataValues.id
                }
            })
        }

        await user.save();
        res.status(HTTP_STATUS_CODE.SUCCESS).send()
    } catch (e) {
        next(e)
    }
}

module.exports = {
    createNewCustomer,
    loginUser,
    logoutUser,
    sendResetPasswordMail,
    verifyChangePassword,
    updatePassword
}