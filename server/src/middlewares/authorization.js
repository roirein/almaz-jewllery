const jwt = require('jsonwebtoken');
const {getUserById} = require('../database/queries');
const {HTTP_STATUS_CODES} = require('../consts/system-consts')

const authorizeUser = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decodedToken._id;
        const user = await getUserById(userId);
        if (!user) {
            throw {status: HTTP_STATUS_CODES.FORBIDDEN, message: 'Unauthorized'}
        }
        req.userId = userId;
        next()
    } catch (e) {
        next(e)
    }
}

module.exports = {
    authorizeUser
}