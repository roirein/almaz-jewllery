const express = require('express');
const {authorizeUser, checkPermissions} = require('../middlewares/authorization');
const {createNewModel, approveOrRejectModel, setModelPriceAndMaterials, getModelById, updateModelData} = require('../controllers/modelController');
const { ROLES } = require('../consts/system-consts');
const router = express.Router();

router.post('/newModel', authorizeUser, checkPermissions([ROLES.DESIGN_MANAGER, ROLES.MANAGER]), createNewModel);

router.post('/reviewModel', authorizeUser, checkPermissions([ROLES.MANAGER]), approveOrRejectModel);

router.patch('/updateModelData/:modelId', authorizeUser, checkPermissions([ROLES.DESIGN_MANAGER, ROLES.MANAGER]), updateModelData);

router.patch('/setModelPrice', authorizeUser, checkPermissions([ROLES.MANAGER]), setModelPriceAndMaterials);

router.get('/model/:modelId', authorizeUser, getModelById);

router.delete('/model/:modelId', authorizeUser, () => {});

module.exports = router