const express = require('express')
const { ROLES } = require('../consts/system-consts');
const { getCustomerRequests, getCustomerRequestById, approveCustomerRequest, getCustomers } = require('../controllers/customerController');
const {authorizeUser, checkPermissions} = require('../middlewares/authorization');
const router = express.Router();

router.patch('/approveCustomer/:customerId', authorizeUser, checkPermissions([ROLES.MANAGER]), approveCustomerRequest);

router.get('/getCustomerRequests', authorizeUser, checkPermissions([ROLES.MANAGER]), getCustomerRequests)

router.get('/getCustomerRequestById/:id', authorizeUser, checkPermissions([ROLES.MANAGER]), getCustomerRequestById)

router.get('/getCustomers', authorizeUser, checkPermissions([ROLES.MANAGER]),getCustomers);

module.exports = router