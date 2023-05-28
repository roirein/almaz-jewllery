const { HTTP_STATUS_CODE } = require('../consts/http-consts');
//const {sendYourUserApprovedMail} = require('../emails/emails');
const {createAndInsertNewEmployee} = require('../utils/utils')

const addNewEmployee = async (req, res, next) => {
    console.log('hi')
    try {
        const userData = [
            req.body.firstName,
            req.body.lastName,
            req.body.email,
            req.body.phone,
            req.body.role
        ]
        await createAndInsertNewEmployee(userData);
        res.status(HTTP_STATUS_CODE.CREATED).send('employee added successfully');
    } catch(e) {
        next(e);
    }
}

module.exports = {
    addNewEmployee
}