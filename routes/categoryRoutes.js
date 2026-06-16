import express from 'express';
import { body } from 'express-validator';
import {
  createCategory,
  deleteCategory,
  listCategories,
  updateCategory
} from '../controllers/categoryController.js';
import { adminOnly, protect } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/uploadMiddleware.js';
import { validateRequest } from '../middleware/validateRequest.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const router = express.Router();

router.get('/', asyncHandler(listCategories));

router.use(protect, adminOnly);

router.post('/', upload.single('image'), [body('categoryName').trim().notEmpty().withMessage('Category name is required')], validateRequest, asyncHandler(createCategory));
router.put('/:id', upload.single('image'), asyncHandler(updateCategory));
router.delete('/:id', asyncHandler(deleteCategory));

export default router;
