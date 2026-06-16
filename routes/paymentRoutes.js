import express from 'express';
import { body } from 'express-validator';
import { createPayment, listPayments, updatePaymentStatus } from '../controllers/paymentController.js';
import { adminOnly, protect } from '../middleware/authMiddleware.js';
import { validateRequest } from '../middleware/validateRequest.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const router = express.Router();

// Public route to submit payment
router.post(
  '/',
  [
    body('userName').trim().notEmpty().withMessage('User name is required'),
    body('userEmail').isEmail().withMessage('Valid user email is required'),
    body('amount').isNumeric().withMessage('Valid amount is required'),
    body('transactionId').trim().notEmpty().withMessage('Transaction ID is required')
  ],
  validateRequest,
  asyncHandler(createPayment)
);

// Protected routes (Admin Only)
router.use(protect, adminOnly);

router.get('/', asyncHandler(listPayments));
router.put('/:id/status', asyncHandler(updatePaymentStatus));

export default router;
