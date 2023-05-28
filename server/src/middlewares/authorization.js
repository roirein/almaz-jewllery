const jwt = require('jsonwebtoken');
const {HTTP_STATUS_CODE} = require('../consts/http-consts');
const User = require('../models/users/userModel');
const Employee = require('../models/users/employeeModel');
const {NOT_AUTHORIZED} = require('../consts/messages');
const HttpError = require('../utils/classes/http-error');
const { USER_TYPES } = require('../consts/system-consts');


const authorizeUser = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decodedToken._id;
        const user = await User.findByPk(userId)
        if (!user) {
            throw new HttpError(NOT_AUTHORIZED.UNAUTHORIZED, HTTP_STATUS_CODE.UNAUTHORIZED)
        }
        req.userId = userId;
        console.log(userId)
        next()
    } catch (e) {
        next(e)
    }
}

const checkPermissions = (permissionTypes) => {
    return async (req, res , next) => {
        try {
            const user = await User.findByPk(req.userId);
            if (!user) {
                throw new HttpError('Forbidden', HTTP_STATUS_CODE.FORBIDDEN);
            } 
            if (user.dataValues.type === USER_TYPES.CUSTOMER) {
                if (permissionTypes.includes(USER_TYPES.CUSTOMER)){
                    next();
                } else {
                    throw new HttpError('Forbidden', HTTP_STATUS_CODE.FORBIDDEN);
                }
            } else {
                const employee = await Employee.findByPk(req.userId);
                if (permissionTypes.includes(employee.dataValues.role)){
                    next();
                } else {
                    throw new HttpError('Forbidden', HTTP_STATUS_CODE.FORBIDDEN);
                }
            }
            console.log('done')
        } catch(e) {
            next(e);
        }
    }
}

module.exports = {
    authorizeUser,
    checkPermissions
}
