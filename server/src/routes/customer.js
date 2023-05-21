const express = require('express');
const {authorizeUser} = require('../middlewares/authorization');
const router = express.Router();

router.patch('/approveCustomer/:customerId', authorizeUser, () => {});

router.get('/customers', authorizeUser, () => {});

module.exports = router