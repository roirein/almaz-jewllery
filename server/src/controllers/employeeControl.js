const { HTTP_STATUS_CODES } = require('../consts/system-consts');
const {approveCustomer, getUserById} = require('../database/queries');
const {sendYourUserApprovedMail} = require('../emails/emails');

const approveCustomerRequest = async (req, res) => {
    await approveCustomer(req.params.userId);
    const user = await getUserById(req.params.userId)
    sendYourUserApprovedMail(user.firstName, user.Email);
    res.status(HTTP_STATUS_CODES.SUCCESS).send('Customer approved succesfully');
}

module.exports = {
    approveCustomerRequest
}