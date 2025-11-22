import { Router } from 'express';
import { body } from 'express-validator';
import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductStock,
  getCategories,
  createCategory,
} from '../controllers/productController';
import { authenticate, authorize } from '../middleware/auth';
import { validate } from '../middleware/validator';

const router = Router();

// All routes require authentication
router.use(authenticate);

// Products
router.get('/', getProducts);
router.get('/:id', getProduct);
router.get('/:id/stock', getProductStock);

router.post(
  '/',
  authorize('ADMIN', 'MANAGER'),
  validate([
    body('name').notEmpty().trim(),
    body('sku').notEmpty().trim(),
    body('unitOfMeasure').optional().trim(),
    body('reorderPoint').optional().isInt({ min: 0 }),
    body('optimalStock').optional().isInt({ min: 0 }),
  ]),
  createProduct
);

router.put(
  '/:id',
  authorize('ADMIN', 'MANAGER'),
  validate([
    body('name').optional().notEmpty().trim(),
    body('sku').optional().notEmpty().trim(),
    body('unitOfMeasure').optional().trim(),
    body('reorderPoint').optional().isInt({ min: 0 }),
    body('optimalStock').optional().isInt({ min: 0 }),
  ]),
  updateProduct
);

router.delete('/:id', authorize('ADMIN', 'MANAGER'), deleteProduct);

// Categories
router.get('/categories/all', getCategories);
router.post(
  '/categories',
  authorize('ADMIN', 'MANAGER'),
  validate([body('name').notEmpty().trim()]),
  createCategory
);

export default router;

