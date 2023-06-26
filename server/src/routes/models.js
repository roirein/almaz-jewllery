const express = require('express');
const {authorizeUser, checkPermissions} = require('../middlewares/authorization');
const {createNewModel, getModelDesign, setModelPriceAndMaterials, getModelById, updateModelData, getAllModels, updateModel, getModelsMetadata} = require('../controllers/modelController');
const { ROLES, USER_TYPES } = require('../consts/system-consts');
const {modelUpload} = require('../services/images/multer.config')
const router = express.Router();

router.get('/getModelsMetadata', authorizeUser, checkPermissions([ROLES.MANAGER, ROLES.DESIGN_MANAGER]) ,getModelsMetadata)

router.get('/getModels', authorizeUser, checkPermissions([ROLES.DESIGN_MANAGER, ROLES.MANAGER, USER_TYPES.CUSTOMER]))
 
router.post('/newModel/:id', authorizeUser, checkPermissions([ROLES.DESIGN_MANAGER]), modelUpload.single('model'), createNewModel);

router.get('/getModelDesign/:imagePath', authorizeUser, getModelDesign);

// router.get('/getAllModels', authorizeUser, checkPermissions([ROLES.DESIGN_MANAGER, ROLES.MANAGER]), getAllModels)

router.get('/getModelById/:modelNumber', getModelById);

// router.put('/updateModel/:id', authorizeUser, checkPermissions([ROLES.DESIGN_MANAGER]), updateModel)

// router.patch('/reviewModel', authorizeUser, checkPermissions([ROLES.MANAGER]), approveOrRejectModel);

// //router.patch('/updateModelData/:modelId', authorizeUser, checkPermissions([ROLES.DESIGN_MANAGER, ROLES.MANAGER]), updateModelData);

// router.post('/setModelPrice/:id', authorizeUser, checkPermissions([ROLES.MANAGER]), setModelPriceAndMaterials);

// router.delete('/model/:modelId', authorizeUser, () => {});

module.exports = router