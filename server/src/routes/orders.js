const express = require('express');
const {USER_TYPES, ROLES} = require('../consts/system-consts');
const {authorizeUser, checkPermissions} = require('../middlewares/authorization');
const {createNewOrder, getNewModelOrder, setOrderDesignStatus, setOrderPrice, setCastingStatus} = require('../controllers/orderController')
const router = express.Router();

router.post('/newOrder', authorizeUser, checkPermissions([USER_TYPES.CUSTOMER, ROLES.MANAGER]) ,createNewOrder);

router.get('/getCreatedNewModelOrder', authorizeUser, checkPermissions([ROLES.DESIGN_MANAGER, ROLES.MANAGER]), getNewModelOrder);

router.patch('/setOrderStatus/:id', authorizeUser, checkPermissions([ROLES.DESIGN_MANAGER, ROLES.MANAGER]), setOrderDesignStatus);

router.patch('/setOrderPrice/orderId', authorizeUser, checkPermissions([ROLES.MANAGER, USER_TYPES.CUSTOMER]), setOrderPrice);

router.patch('/setOrderCastingStatus', authorizeUser, checkPermissions([ROLES.MANAGER]), setCastingStatus);

// router.get('/order/design/:id', authorizeUser, checkPermissions([ROLES.MANAGER]), getOrderAfterDesign);

// router.patch('/order/managerApproval/:id', authorizeUser, checkPermissions([ROLES.MANAGER]))

module.exports = router;