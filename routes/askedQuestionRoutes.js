import express from 'express';
import { body } from 'express-validator';
import { createAskedQuestion, deleteAskedQuestion, listAskedQuestions, updateAskedQuestion } from '../controllers/askedQuestionController.js';
import { adminOnly, protect } from '../middleware/authMiddleware.js';
import { validateRequest } from '../middleware/validateRequest.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const router = express.Router();

router.get('/', asyncHandler(listAskedQuestions));

router.use(protect, adminOnly);

router.post('/', [
  body('question').trim().notEmpty().withMessage('Question is required'),
  body('answer').trim().notEmpty().withMessage('Answer is required')
], validateRequest, asyncHandler(createAskedQuestion));

router.put('/:id', [
  body('question').optional().trim().notEmpty().withMessage('Question cannot be empty'),
  body('answer').optional().trim().notEmpty().withMessage('Answer cannot be empty')
], validateRequest, asyncHandler(updateAskedQuestion));

router.delete('/:id', asyncHandler(deleteAskedQuestion));

export default router;
