const express = require('express');
const { getNotifications } = require('../controllers/notificationsController');
const { authorizeUser } = require('../middlewares/authorization');
const router = express.Router()

router.get('/getNotifications/:userId', authorizeUser, getNotifications);

module.exports = router