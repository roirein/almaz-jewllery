const express = require('express');
const multer = require('multer');
const {authorizeUser} = require('../middlewares/authorization');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './images')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

const upload = multer({storage: storage})

const router = express.Router();

router.post('/newOrder', upload.single('image'), (req, res) => {
    try {
        console.log(req.file);
        res.sendStatus(201)
    } catch (e) {
        console.log(e)
    }
})

module.exports = router;