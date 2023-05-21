const jwt = require('jsonwebtoken');
const {HTTP_STATUS_CODE} = require('../consts/http-consts');
const User = require('../models/users/userModel');
const {NOT_AUTHORIZED} = require('../consts/messages');
const HttpError = require('../utils/classes/http-error');


const authorizeUser = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decodedToken._id;
        console.log(userId)
        const user = await User.findByPk(userId)
        console.log(user)
        if (!user) {
            throw new HttpError(NOT_AUTHORIZED.UNAUTHORIZED, HTTP_STATUS_CODE.UNAUTHORIZED)
        }
        req.userId = userId;
        next()
    } catch (e) {
        next(e)
    }
}

module.exports = {
    authorizeUser,
}