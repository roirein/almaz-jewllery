const express = require('express');
const {authorizeUser} = require('../middlewares/authorization');
const router = express.Router();

router.post('/newOrder', authorizeUser, () => {});

router.patch('/updateOrder/:orderId', authorizeUser, () => {});

router.patch('/managerApproval/:orderId', authorizeUser, () => {});

router.get('/order/:orderId', authorizeUser, () => {});

router.get('/orders', authorizeUser, () => {});

router.delete('/order/:id', authorizeUser, () => {});

router.patch('/orderStatus/:orderId', authorizeUser, () => {});

router.patch('/customerApproval/', authorizeUser, () => {});

router.get('/activeOrders', authorizeUser, () => {});

router.get('completedOrders', authorizeUser, () => {});

module.exports = router;