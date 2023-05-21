const express = require('express');
const {authorizeUser} = require('../middlewares/authorization');
const {createNewCustomer, loginUser, logoutUser} = require('../controllers/userController');

const router = express.Router();

router.post('/register', createNewCustomer);

router.post('/login', loginUser);

router.post('/logout', authorizeUser, logoutUser);

router.post('/resetPasswordMail', () => {});

router.post('/resetPasswordCode', () => {});

router.patch('/resetPassword', () => {});

router.put('/updateUserData', () => {});

router.get('/user/:id', authorizeUser, () => {});

module.exports = router;