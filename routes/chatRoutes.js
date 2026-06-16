import express from 'express';
import {
  getUserChatHistory,
  sendChatMessage,
  listChatSessions,
  getChatSessionById,
  adminReplyToChat
} from '../controllers/chatController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const router = express.Router();

// Public routes for user storefront widget
router.get('/session/:userId', asyncHandler(getUserChatHistory));
router.post('/message', asyncHandler(sendChatMessage));

// Protected admin panel routes
router.use(protect, adminOnly);
router.get('/sessions', asyncHandler(listChatSessions));
router.get('/sessions/:id', asyncHandler(getChatSessionById));
router.post('/sessions/:id/reply', asyncHandler(adminReplyToChat));

export default router;
