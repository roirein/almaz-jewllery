const express = require('express');
const {authorizeUser} = require('../middlewares/authorization');

const router = express.Router();

router.post('/addNewEmployee', authorizeUser, () => {});

router.delete('/deleteEmployee', authorizeUser, () => {});

router.get('/employee/:employeeId', authorizeUser, () => {});

router.post('/tasks', authorizeUser, () => {});

router.get('/task/:taskId', () => {});

module.exports = router;