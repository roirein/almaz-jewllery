const express = require('express');
const {registerValidation, isUserExist} = require('../middlewares/validation')
const {createCustomer} = require('../controllers/authControl');

const router = express.Router();

router.post('/register', registerValidation, isUserExist, createCustomer)

module.exports = router;