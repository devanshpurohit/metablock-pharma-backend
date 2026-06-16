import express from 'express';
import { body, param } from 'express-validator';
import {
  submitReview,
  getProductReviews,
  getAllReviews,
  updateReviewStatus,
  deleteReview,
  getApprovedReviews
} from '../controllers/reviewController.js';
import { protect, adminOnly, optionalProtect } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/uploadMiddleware.js';
import { validateRequest } from '../middleware/validateRequest.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const router = express.Router();

// Public: get approved reviews for a product
router.get('/product/:productId', asyncHandler(getProductReviews));

// Public: get all approved reviews (for homepage testimonials etc.)
router.get('/approved', asyncHandler(getApprovedReviews));

// Customer: submit a review (optionally authenticated — supports image upload)
router.post(
  '/',
  optionalProtect,
  upload.single('reviewImage'),
  [
    body('productId').notEmpty().withMessage('productId is required'),
    body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
    body('body').trim().notEmpty().withMessage('Review body is required'),
  ],
  validateRequest,
  asyncHandler(submitReview)
);

// Admin: get all reviews (with optional status filter)
router.get('/admin', protect, adminOnly, asyncHandler(getAllReviews));

// Admin: approve / reject / reset a review
router.patch(
  '/:id/status',
  protect,
  adminOnly,
  [body('status').notEmpty().withMessage('status is required')],
  validateRequest,
  asyncHandler(updateReviewStatus)
);

// Admin: delete a review
router.delete('/:id', protect, adminOnly, asyncHandler(deleteReview));

export default router;
