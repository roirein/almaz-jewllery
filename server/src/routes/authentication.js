const express = require('express');
const {registerValidation, loginValidation} = require('../middlewares/validation')
const {createCustomer, loginUser, logoutUser} = require('../controllers/authControl');

const router = express.Router();

router.post('/register', registerValidation, createCustomer);

router.post('/login', loginValidation, loginUser);

router.post('/logout', logoutUser)

module.exports = router;