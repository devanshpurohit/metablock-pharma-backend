import express from 'express';
import { subscribeNewsletter, listNewsletter, unsubscribeNewsletter } from '../controllers/newsletterController.js';
import { adminOnly, protect } from '../middleware/authMiddleware.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const router = express.Router();

// Public route to subscribe
router.post('/', asyncHandler(subscribeNewsletter));

// Protected admin routes
router.use(protect, adminOnly);
router.get('/', asyncHandler(listNewsletter));
router.delete('/:id', asyncHandler(unsubscribeNewsletter));

export default router;
