const express = require('express');
const {registerValidation, loginValidation} = require('../middlewares/validation');
const {authorizeUser} = require('../middlewares/authorization')
const {createCustomer, loginUser, logoutUser} = require('../controllers/authControl');

const router = express.Router();

router.post('/register', registerValidation, createCustomer);

router.post('/login', loginValidation, loginUser);

router.post('/logout', authorizeUser, logoutUser);

module.exports = router;