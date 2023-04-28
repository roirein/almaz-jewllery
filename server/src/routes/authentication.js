const express = require('express');
const {registerValidation, loginValidation} = require('../middlewares/validation')
const {createCustomer, loginUser} = require('../controllers/authControl');

const router = express.Router();

router.post('/register', registerValidation, createCustomer);

router.post('/login', loginValidation, loginUser)

module.exports = router;