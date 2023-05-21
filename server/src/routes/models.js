const express = require('express');
const {authorizeUser} = require('../middlewares/authorization');
const router = express.Router();

router.post('/newModel', authorizeUser, () => {});

router.patch('/checkModel', authorizeUser, () => {});

router.get('/model/:modelId', authorizeUser, () => {});

router.delete('/model/:modelId', authorizeUser, () => {});

module.exports = router