import express from 'express';
import { body } from 'express-validator';
import { deleteUser, getUser, listUsers, createUser } from '../controllers/userController.js';
import { adminOnly, protect } from '../middleware/authMiddleware.js';
import { validateRequest } from '../middleware/validateRequest.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const router = express.Router();

router.post(
  '/',
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
  ],
  validateRequest,
  asyncHandler(createUser)
);

router.use(protect, adminOnly);

router.get('/', asyncHandler(listUsers));
router.get('/:id', asyncHandler(getUser));
router.delete('/:id', asyncHandler(deleteUser));


export default router;

