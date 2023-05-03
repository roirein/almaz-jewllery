const express = require('express');
const {isAdmin, authorizeUser} = require('../middlewares/authorization');
const {approveCustomerRequest} = require('../controllers/employeeControl');

const router = express.Router();

router.patch('/approve/:userId', authorizeUser, isAdmin, approveCustomerRequest);

module.exports = router;