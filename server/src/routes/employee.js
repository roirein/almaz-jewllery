const express = require('express');
const {ROLES} = require('../consts/system-consts');
const {authorizeUser, checkPermissions} = require('../middlewares/authorization');
const {addNewEmployee} = require('../controllers/employeeControl')

const router = express.Router();

router.post('/addNewEmployee' ,authorizeUser, checkPermissions([ROLES.MANAGER]), addNewEmployee);

router.delete('/deleteEmployee', authorizeUser, () => {});

router.get('/employee/:employeeId', authorizeUser, () => {});

router.post('/tasks', authorizeUser, () => {});

router.get('/task/:taskId', () => {});

module.exports = router;