const express = require('express');
const { ROLES } = require('../consts/system-consts');
const {authorizeUser, checkPermissions} = require('../middlewares/authorization');
const router = express.Router();

router.patch('/approveCustomer/:customerId', authorizeUser, checkPermissions(ROLES.MANAGER), () => {});

router.get('/customers', authorizeUser, () => {});

module.exports = router