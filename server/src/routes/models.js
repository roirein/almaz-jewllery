const express = require('express');
const {authorizeUser, checkPermissions} = require('../middlewares/authorization');
const {createNewModel, approveOrRejectModel, setModelPriceAndMaterials, getModelById, updateModelData, getAllModels, updateModel} = require('../controllers/modelController');
const { ROLES } = require('../consts/system-consts');
const router = express.Router();

router.post('/newModel', authorizeUser, checkPermissions([ROLES.DESIGN_MANAGER, ROLES.MANAGER]), createNewModel);

router.get('/getAllModels', authorizeUser, checkPermissions([ROLES.DESIGN_MANAGER, ROLES.MANAGER]), getAllModels)

router.get('/getModelById/:modelId', authorizeUser, getModelById);

router.put('/updateModel/:id', authorizeUser, checkPermissions([ROLES.DESIGN_MANAGER]), updateModel)

router.patch('/reviewModel', authorizeUser, checkPermissions([ROLES.MANAGER]), approveOrRejectModel);

//router.patch('/updateModelData/:modelId', authorizeUser, checkPermissions([ROLES.DESIGN_MANAGER, ROLES.MANAGER]), updateModelData);

router.post('/setModelPrice/:id', authorizeUser, checkPermissions([ROLES.MANAGER]), setModelPriceAndMaterials);

router.delete('/model/:modelId', authorizeUser, () => {});

module.exports = router