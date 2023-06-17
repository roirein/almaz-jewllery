const express = require('express');
const {authorizeUser} = require('../middlewares/authorization');
const {createNewCustomer, loginUser, logoutUser, sendResetPasswordMail, verifyChangePassword, updatePassword} = require('../controllers/userController');
const { sendResetPasswordCode } = require('../services/emails/emails');

const router = express.Router();

router.post('/register', createNewCustomer);

router.post('/login', loginUser);

router.post('/logout', authorizeUser, logoutUser);

router.post('/sendResetPasswordCode', sendResetPasswordMail);

router.post('/verifyPasswordCode', verifyChangePassword);

router.patch('/resetPassword', updatePassword);

module.exports = router;