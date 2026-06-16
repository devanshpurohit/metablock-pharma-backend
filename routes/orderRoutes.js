import express from 'express';
import { createOrder, getOrders, updateOrderStatus, getMyOrders } from '../controllers/orderController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const router = express.Router();

// Customer placing a new order and fetching their orders
router.post('/', protect, asyncHandler(createOrder));
router.get('/my-orders', protect, asyncHandler(getMyOrders));

// Admin routes for viewing and managing orders
router.get('/', protect, adminOnly, asyncHandler(getOrders));
router.put('/:id/status', protect, adminOnly, asyncHandler(updateOrderStatus));

export default router;
