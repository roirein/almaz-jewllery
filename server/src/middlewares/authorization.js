const jwt = require('jsonwebtoken');
const {getUserById, getCustomerByUserId} = require('../database/queries');
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
        if (user.isCustomer) {
            const customer = getCustomerByUserId(userId);
            if (!customer.Approved) {
                throw {status: HTTP_STATUS_CODES.FORBIDDEN, message: 'Unauthorized'};
            }

        }
        req.userId = userId;
        next()
    } catch (e) {
        console.log(e)
        next(e)
    }
}

const isAdmin = async (req, res, next) => {
    try {
        console.log(req.body.permissionLevel)
        if (Object.keys(req.body).includes('permissionLevel') && req.body.permissionLevel === 0) {
            next()
        } else {
            throw {status: HTTP_STATUS_CODES.FORBIDDEN, message: 'Unauthorized'}
        }
    } catch (e) {
        next(e)
    }
}

module.exports = {
    authorizeUser,
    isAdmin
}