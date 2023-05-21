const express = require('express');
const {authorizeUser} = require('../middlewares/authorization');
const router = express.Router();

router.get('/customers', authorizeUser, () => {});

router.get('/orders', authorizeUser, () => {});

module.exports = router;