const multer = require('multer');
const path = require('path')
const crypto = require('crypto');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './images');
    },
    filename: (req, file, cb) => {
        const randomString = crypto.randomBytes(16).toString('hex');
        const originalExtension = path.extname(file.originalname);
        const filename = `${randomString}${originalExtension}`;
        console.log(file, filename)
        cb(null, filename);
    },
});

const upload = multer({storage})

module.exports = upload;