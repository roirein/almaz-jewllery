const express = require('express');
const {USER_TYPES, ROLES} = require('../consts/system-consts');
const {authorizeUser, checkPermissions} = require('../middlewares/authorization');
const {createNewOrder, getNewModelOrder, setOrderDesignStatus} = require('../controllers/orderController')
const router = express.Router();

router.post('/newOrder', authorizeUser, checkPermissions([USER_TYPES.CUSTOMER, ROLES.MANAGER]) ,createNewOrder);

router.get('/getCreatedNewModelOrder', authorizeUser, checkPermissions([ROLES.DESIGN_MANAGER, ROLES.MANAGER]), getNewModelOrder);

router.patch('/setOrderStatus/:id', authorizeUser, checkPermissions([ROLES.DESIGN_MANAGER, ROLES.MANAGER]), setOrderDesignStatus);

// router.get('/order/design/:id', authorizeUser, checkPermissions([ROLES.MANAGER]), getOrderAfterDesign);

// router.patch('/order/managerApproval/:id', authorizeUser, checkPermissions([ROLES.MANAGER]))

module.exports = router;