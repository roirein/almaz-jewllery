const express = require('express');
const {registerValidation, loginValidation} = require('../middlewares/validation');
const {authorizeUser} = require('../middlewares/authorization')
const {createCustomer, loginUser, logoutUser} = require('../controllers/authControl');

const authRoute = (io) => {

    const router = express.Router();

    router.post('/register', registerValidation, (req, res) => createCustomer(req, res, io));

    router.post('/login', loginValidation, loginUser);

    router.post('/logout', authorizeUser, logoutUser);

    return router
}

module.exports = authRoute;