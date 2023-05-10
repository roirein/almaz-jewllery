const express = require('express');
//const {registerValidation, loginValidation, resetPasswordValidation} = require('../middlewares/validation');
// const {authorizeUser} = require('../middlewares/authorization')
const {createNewCustomer} = require('../controllers/authControl');

const router = express.Router();

router.post('/register', createNewCustomer);

// router.post('/login', loginValidation, loginUser);

// router.post('/logout', authorizeUser, logoutUser);

// router.patch('/resetPassword', resetPasswordValidation, resetPassword);

module.exports = router;