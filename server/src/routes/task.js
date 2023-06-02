const express = require('express');
const {authorizeUser, checkPermissions} = require('../middlewares/authorization');
const { ROLES } = require('../consts/system-consts');
const router = express.Router();

router.post('/newTask/:orderId', authorizeUser, checkPermissions([ROLES.PRODUCTION_MANAGER, ROLES.MANAGER]));

router.patch('/updateTask/:taskId', authorizeUser, checkPermissions([ROLES.DESIGN_MANAGER, ROLES.MANAGER]));

router.get('/getTask/:taskId', authorizeUser, checkPermissions([ROLES.EMPLOYEE, ROLES.PRODUCTION_MANAGER, ROLES.MANAGER]));

router.patch('/updateStatus/:taskId', authorizeUser, checkPermissions([ROLES.EMPLOYEE, ROLES.PRODUCTION_MANAGER, ROLES.MANAGER]));