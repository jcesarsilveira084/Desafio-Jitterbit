// routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const controller = require('../controllers/orderController');

// List all (explicit route FIRST)
router.get('/list', controller.listOrders);

// Create
router.post('/', controller.createOrder);

// Get by orderId (example: /order/v10089016vdb)
router.get('/:orderId', controller.getOrder);

// Update
router.put('/:orderId', controller.updateOrder);

// Delete
router.delete('/:orderId', controller.deleteOrder);

module.exports = router;
