const express = require('express');
const { getNotifications, markNotificationAsHandled } = require('../controllers/notificationsController');
const { authorizeUser } = require('../middlewares/authorization');
const router = express.Router()

router.get('/getNotifications/:userId', authorizeUser, getNotifications);

router.patch('/markNotificationCreated/:notificationId', authorizeUser, markNotificationAsHandled)

module.exports = router