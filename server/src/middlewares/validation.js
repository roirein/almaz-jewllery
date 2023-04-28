const validator = require('validator');
const {HTTP_STATUS_CODES, USER_COLUMNS_NAMES, ERROR_MESSAGES} = require('../consts/consts');
const {getCustomer} = require('../database/queries')

const registerValidation = (req, res, next) => {
    try {
        Object.entries(req.body).forEach(([field, value]) => {
            if (validator.isEmpty(value) && field !== USER_COLUMNS_NAMES.PHONE_TWO) {
                throw new Error(ERROR_MESSAGES.VALIDATION_FAIL_FIELD_EMPTY(field));
            } 
        })

        if (req.body.password !== req.body.confirmPassword) {
            throw new Error(ERROR_MESSAGES.VALIDATION_FAILS_PASSWORD_CONFIRM);
        }
        next()
    } catch(e) {
        res.status(HTTP_STATUS_CODES.BAD_REQUEST).send({error: e.message})
    }
}

const isUserExist = async (req, res, next) => {
    try {
        const user = await getCustomer(req.body.email)
        if (user) {
            throw new Error(ERROR_MESSAGES.VALIDATION_FAIL_USER_EXIST)
        }
        next()
    } catch (e) {
        res.status(HTTP_STATUS_CODES.CONFLICT).send({error: e.message})
    }
}

module.exports = {
    registerValidation,
    isUserExist
}