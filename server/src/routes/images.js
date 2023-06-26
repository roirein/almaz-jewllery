const express = require('express');
const { HTTP_STATUS_CODE } = require('../consts/http-consts');
const { authorizeUser } = require('../middlewares/authorization');
const upload = require('../services/images/multer.config')
const router = express.Router();
const path = require('path')

// router.post('/upload', authorizeUser, upload.single('model'), (req, res) => {
//     res.status(HTTP_STATUS_CODE.CREATED).send({path: req.file.filename});
// });

router.get('/getImage/:imagePath',  async (req, res) => {
    try{
        const imagePath = req.params.imagePath;
        console.log(imagePath)
        res.sendFile(path.join(__dirname, '../../images', imagePath));
    } catch(e) {
        console.log(e)
    }
})

module.exports = router