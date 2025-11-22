import { Router } from 'express';
import { body } from 'express-validator';
import {
  getReceipts,
  getReceipt,
  createReceipt,
  validateReceipt,
  cancelReceipt,
} from '../controllers/receiptController';
import { authenticate } from '../middleware/auth';
import { validate } from '../middleware/validator';

const router = Router();

router.use(authenticate);

router.get('/', getReceipts);
router.get('/:id', getReceipt);

router.post(
  '/',
  validate([
    body('supplierName').notEmpty().trim(),
    body('locationId').notEmpty(),
    body('lines').isArray({ min: 1 }),
    body('lines.*.productId').notEmpty(),
    body('lines.*.quantity').isFloat({ min: 0.01 }),
  ]),
  createReceipt
);

router.put('/:id/validate', validateReceipt);
router.put('/:id/cancel', cancelReceipt);

export default router;

