const express = require('express');
const {USER_TYPES, ROLES} = require('../consts/system-consts');
const {authorizeUser, checkPermissions} = require('../middlewares/authorization');
const {createNewOrder, getOrderById, getActiveOrders, sendOrderToDesign, getOrderDesign} = require('../controllers/orderController')
const {desingUpload} = require('../services/images/multer.config')
const router = express.Router();

router.post('/newOrder', authorizeUser, checkPermissions([USER_TYPES.CUSTOMER, ROLES.MANAGER]), desingUpload.single('image'), createNewOrder);

router.get('/activeOrders', authorizeUser, getActiveOrders)

router.get('/getOrderById/:orderId', authorizeUser, getOrderById);

router.get('/getOrderDesign/:imagePath', authorizeUser, getOrderDesign)

router.patch('/sendOrderToDesign/:orderId', authorizeUser, checkPermissions([ROLES.MANAGER]), sendOrderToDesign)

// router.get('/ordersInDesign', authorizeUser, checkPermissions([ROLES.DESIGN_MANAGER, ROLES.MANAGER]), getOrdersInDesign);

// router.get('/getOrder/:orderId', authorizeUser, getOrderById);

// router.get('/getCreatedNewModelOrder', authorizeUser, checkPermissions([ROLES.DESIGN_MANAGER, ROLES.MANAGER]), getNewModelOrder);

// router.patch('/setOrderStatus/:id', authorizeUser, checkPermissions([ROLES.DESIGN_MANAGER, ROLES.MANAGER]), setOrderDesignStatus);

// router.patch('/setOrderPrice/orderId', authorizeUser, checkPermissions([ROLES.MANAGER, USER_TYPES.CUSTOMER]), setOrderPrice);

// router.patch('/setOrderCastingStatus', authorizeUser, checkPermissions([ROLES.MANAGER]), setCastingStatus);

// router.get('/order/design/:id', authorizeUser, checkPermissions([ROLES.MANAGER]), getOrderAfterDesign);

// router.patch('/order/managerApproval/:id', authorizeUser, checkPermissions([ROLES.MANAGER]))

module.exports = router;