const multer = require('multer');
const path = require('path')
const crypto = require('crypto');

const generateFileName = (file) => {
    console.log(file)
    const randomString = crypto.randomBytes(16).toString('hex');
    const originalExtension = path.extname(file.originalname);
    const newFilename = `${randomString}${originalExtension}`;
    return newFilename
}

const desingStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './resources/design');
    },
    filename: (req, file, cb) => {
        cb(null, generateFileName(file));
    },
});

const modelStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './resources/models');
    },
    filename: (req, file, cb) => {
        const fileName = generateFileName(file)
        cb(null, fileName);
    },
})

const desingUpload = multer({storage: desingStorage})
const modelUpload = multer({storage: modelStorage})

module.exports = {
    desingUpload,
    modelUpload
};