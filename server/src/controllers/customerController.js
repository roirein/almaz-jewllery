const { HTTP_STATUS_CODE } = require('../consts/http-consts');
//const {sendYourUserApprovedMail} = require('../emails/emails');
const Customer = require('../models/users/customerModel');
const Request = require('../models/users/requestsModel');
const User = require('../models/users/userModel');

const approveCustomerRequest = async (req, res, next) => {
    try {
        await approveCustomer(req.params.userId);
        const user = await getUserById(req.params.userId)
        //sendYourUserApprovedMail(user.firstName, user.Email);
        res.status(HTTP_STATUS_CODE.SUCCESS).send('Customer approved succesfully');
    } catch(e) {
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

    } catch (e) {

    }
}

module.exports = {
    approveCustomerRequest,
    getCustomerRequests,
    getCustomerRequestById
}