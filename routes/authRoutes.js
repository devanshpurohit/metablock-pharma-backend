import express from 'express';
import { body } from 'express-validator';
import {
  getProfile,
  loginAdmin,
  registerCustomer,
  loginCustomer,
  forgotPassword,
  verifyOTP,
  resetPassword
} from '../controllers/authController.js';
import { adminOnly, protect } from '../middleware/authMiddleware.js';
import { validateRequest } from '../middleware/validateRequest.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const router = express.Router();

router.post(
  '/login',
  [body('email').isEmail().withMessage('Valid email is required'), body('password').notEmpty()],
  validateRequest,
  asyncHandler(loginAdmin)
);

router.post(
  '/register-customer',
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
  ],
  validateRequest,
  asyncHandler(registerCustomer)
);

router.post(
  '/login-customer',
  [
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').notEmpty().withMessage('Password is required')
  ],
  validateRequest,
  asyncHandler(loginCustomer)
);

router.post(
  '/forgot-password',
  [body('email').isEmail().withMessage('Valid email is required')],
  validateRequest,
  asyncHandler(forgotPassword)
);

router.post(
  '/verify-otp',
  [
    body('email').isEmail().withMessage('Valid email is required'),
    body('otp').notEmpty().withMessage('OTP is required')
  ],
  validateRequest,
  asyncHandler(verifyOTP)
);

router.post(
  '/reset-password',
  [
    body('email').isEmail().withMessage('Valid email is required'),
    body('otp').notEmpty().withMessage('OTP is required'),
    body('newPassword').isLength({ min: 8 }).withMessage('New password must be at least 8 characters long')
  ],
  validateRequest,
  asyncHandler(resetPassword)
);

router.get('/profile', protect, adminOnly, asyncHandler(getProfile));

export default router;
