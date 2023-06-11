const express = require('express');
const { HTTP_STATUS_CODE } = require('../consts/http-consts');
const { authorizeUser } = require('../middlewares/authorization');
const upload = require('../services/images/multer.config')
const router = express.Router();

router.post('/upload', authorizeUser, upload.single('model'), (req, res) => {
    res.status(HTTP_STATUS_CODE.CREATED).send({path: req.file.path});
});

module.exports = router