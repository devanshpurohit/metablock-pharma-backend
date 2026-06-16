import express from 'express';
import { createMessage, getMessage, listMessages, replyMessage } from '../controllers/messageController.js';
import { adminOnly, protect } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/uploadMiddleware.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const router = express.Router();

// Public route to submit contact form
router.post('/', upload.single('attachment'), asyncHandler(createMessage));

// Protected admin routes
router.use(protect, adminOnly);
router.get('/', asyncHandler(listMessages));
router.get('/:id', asyncHandler(getMessage));
router.post('/:id/reply', asyncHandler(replyMessage));

export default router;
