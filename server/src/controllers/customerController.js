const { HTTP_STATUS_CODE } = require('../consts/http-consts');
const { REQUESTS_STATUS } = require('../consts/system-consts');
const {sendYourUserApprovedMail} = require('../services/emails/emails')
const Customer = require('../models/users/customerModel');
const Request = require('../models/users/requestsModel');
const User = require('../models/users/userModel');

const approveCustomerRequest = async (req, res, next) => {
    try {

        const requestStatus = req.body.isApproved ? REQUESTS_STATUS.APPROVED : REQUESTS_STATUS.REJECTED;
        if (requestStatus === REQUESTS_STATUS.APPROVED) {
            sendYourUserApprovedMail(req.body.firstName, req.body.email)
        }
        await Request.update(
            {
                status: requestStatus
            }, {
                where: {
                    id: req.params.customerId
                }
            }
        )
        res.status(HTTP_STATUS_CODE.SUCCESS).send({status: requestStatus});
    } catch(e) {
        console.log(e)
        next(e)
    }
}

const getCustomerRequests = async (req, res, next) => {
    try {
        const requetsData = await Request.findAll({
            include: {
                model: Customer,
                include: {
                    model: User,
                    attributes: ['firstName', "lastName", 'email']
                }
            }
        })
        const result = requetsData.map((request) => {
            return {
                id: request.id,
                status: request.status,
                customerName: `${request.Customer.User.firstName} ${request.Customer.User.lastName}`,
                email: request.Customer.User.email
            }
        })
        console.log(result)
        res.status(HTTP_STATUS_CODE.SUCCESS).send({requests: result})
    } catch(e) {
        console.log(e)
        next(e)
    }
}

const getCustomerRequestById = async (req, res, next) => {
    try {
        const customerRequest = await Request.findOne({
            where: {
                id: req.params.id
            },
            include: {
                model: Customer,
                include: {
                    model: User,
                    attributes: ['firstName', 'lastName', 'email', 'phone']
                }
            }
        })

        const customerData = {
            id: req.params.id,
            name: `${customerRequest.Customer.User.firstName} ${customerRequest.Customer.User.lastName}`,
            phoneNumber: customerRequest.Customer.User.phone,
            email: customerRequest.Customer.User.email,
            businessName: customerRequest.Customer.businessName,
            businessPhone: customerRequest.Customer.secondaryPhone,
            status: customerRequest.status
        }
        res.status(HTTP_STATUS_CODE.SUCCESS).send({customer: customerData})
    } catch(e) {
        next(e)
    }
}

const getCustomers = async (req, res, next) => {
    try {
        const results = await Customer.findAll({
            include: [{
                model: Request,
                where: {
                    status: REQUESTS_STATUS.APPROVED
                }
            }, {
                model: User,
                attributes: ['firstName', 'lastName', 'phone', 'email']
            }]
        })

        const customers = results.map((customer) => {
            return {
                id: customer.id,
                customerName: `${customer.User.firstName} ${customer.User.lastName}`,
                email: customer.User.email,
                phoneNumber: customer.User.phone,
                businessName: customer.businessName,
                businessPhone: customer.secondaryPhone
            }
        })
        res.status(HTTP_STATUS_CODE.SUCCESS).send({customers})
    } catch (e) {
        next(e)
    }
}

module.exports = {
    approveCustomerRequest,
    getCustomerRequests,
    getCustomerRequestById,
    getCustomers
}