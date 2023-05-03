const validator = require('validator');
const bcrypt = require('bcryptjs')
const {USER_COLUMNS_NAMES} = require('../consts/db-consts');
const {HTTP_STATUS_CODES} = require('../consts/system-consts')
const {ERROR_MESSAGES} = require('../consts/messages')
const {getUserByEmail, getCustomerByUserId} = require('../database/queries');

const registerValidation = async (req, res, next) => {
    try {
        Object.entries(req.body).forEach(([field, value]) => {
            if (validator.isEmpty(value) && field !== USER_COLUMNS_NAMES.PHONE_TWO) {
                throw {status: HTTP_STATUS_CODES.BAD_REQUEST, message: ERROR_MESSAGES.VALIDATION_FAIL_FIELD_EMPTY(field)};
            } 
        })
        if (!validator.isEmail(req.body.email)) {
            throw {status: HTTP_STATUS_CODES.BAD_REQUEST, message: ERROR_MESSAGES.VALIDATION_FAILS_INVALID_EMAIL}
        }
        if (req.body.password !== req.body.confirmPassword) {
            throw {status: HTTP_STATUS_CODES.BAD_REQUEST, message: ERROR_MESSAGES.VALIDATION_FAILS_PASSWORD_CONFIRM};
        }
        const phoneRegex =   /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
        if (!phoneRegex.test(req.body.phoneNumber1)) {
            throw {status: HTTP_STATUS_CODES.BAD_REQUEST, message: ERROR_MESSAGES.VALIDATION_FAILS_INVALID_PHONE}
        }
        if (req.body.phoneNumber2 && !phoneRegex.test(req.body.phoneNumber2)){
            throw {status: HTTP_STATUS_CODES.BAD_REQUEST, message: ERROR_MESSAGES.VALIDATION_FAILS_INVALID_PHONE}
        }
        const user = await getUserByEmail(req.body.email);
        if (user) {
            throw {status: HTTP_STATUS_CODES.CONFLICT, message: ERROR_MESSAGES.VALIDATION_FAIL_USER_EXIST}
        }
        next()
    } catch(e) {
        console.log(e)
        next(e)
    }
}


const loginValidation = async (req, res, next) => {
    try {
        Object.entries(req.body).forEach(([field, value]) => {
            if (validator.isEmpty(value)) {
                throw {status: HTTP_STATUS_CODES.BAD_REQUEST, message: ERROR_MESSAGES.VALIDATION_FAIL_FIELD_EMPTY(field)};
            } 
        })
        if (!validator.isEmail(req.body.email)) {
            throw {status: HTTP_STATUS_CODES.BAD_REQUEST, message: ERROR_MESSAGES.VALIDATION_FAILS_INVALID_EMAIL}
        }
        const user = await getUserByEmail(req.body.email);
        if (!user) {
            throw {status: HTTP_STATUS_CODES.UNAUTHORIZED, message: ERROR_MESSAGES.LOGIN_FAILED_WRONG_CREDENTIALS}
        }
        const isMatch = await bcrypt.compare(req.body.password, user.Password)
        if (!isMatch) {
            throw {status: HTTP_STATUS_CODES.UNAUTHORIZED, message: ERROR_MESSAGES.LOGIN_FAILED_WRONG_CREDENTIALS}
        }
        if (user.isCustomer) {
            const isApproved = await getCustomerByUserId(user?.id).Approved;
            if (!isApproved) {
                throw {status: HTTP_STATUS_CODES.UNAUTHORIZED, message: ERROR_MESSAGES.LOGIN_FAILED_USER_NOT_APPROVED}
            }
        }
        next()
    } catch (e) {
        console.log(e)
        next(e)
    }
}

const resetPasswordValidation = async (req, res, next) => {
    try {
        const user = getUserByEmail(req.body.email);
        if (!user) {
            throw {status: HTTP_STATUS_CODES.NOT_FOUND, message: 'no user correspoind the email'}
        }
        if (req.body.password !== req.body.confirmPassword) {
            throw {status: HTTP_STATUS_CODES.BAD_REQUEST, message: 'The confirmation field not the same as password field'}
        }
        next()
    } catch(e) {
        next(e);
    }
}

module.exports = {
    registerValidation,
    loginValidation,
    resetPasswordValidation
}