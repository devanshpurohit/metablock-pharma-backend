import express from 'express';
import { listPages, updatePage, getPageBySlug } from '../controllers/pageController.js';
import { adminOnly, protect } from '../middleware/authMiddleware.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const router = express.Router();

// Public route to get a page by slug
router.get('/:slug', asyncHandler(getPageBySlug));

// Admin-only routes
router.use(protect, adminOnly);
router.get('/', asyncHandler(listPages));
router.put('/:slug', asyncHandler(updatePage));

export default router;
