const { HTTP_STATUS_CODE } = require('../consts/http-consts');
const {approveCustomer, getUserById} = require('../database/queries');
const {sendYourUserApprovedMail} = require('../emails/emails');

const approveCustomerRequest = async (req, res, next) => {
    try {
        await approveCustomer(req.params.userId);
        const user = await getUserById(req.params.userId)
        sendYourUserApprovedMail(user.firstName, user.Email);
        res.status(HTTP_STATUS_CODES.SUCCESS).send('Customer approved succesfully');
    } catch(e) {
        next(e)
    }
}

module.exports = {
    approveCustomerRequest
}