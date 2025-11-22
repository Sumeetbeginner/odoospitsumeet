import { Router } from 'express';
import { body } from 'express-validator';
import {
  getDeliveries,
  getDelivery,
  createDelivery,
  validateDelivery,
  cancelDelivery,
} from '../controllers/deliveryController';
import { authenticate } from '../middleware/auth';
import { validate } from '../middleware/validator';

const router = Router();

router.use(authenticate);

router.get('/', getDeliveries);
router.get('/:id', getDelivery);

router.post(
  '/',
  validate([
    body('customerName').notEmpty().trim(),
    body('locationId').notEmpty(),
    body('lines').isArray({ min: 1 }),
    body('lines.*.productId').notEmpty(),
    body('lines.*.quantity').isFloat({ min: 0.01 }),
  ]),
  createDelivery
);

router.put('/:id/validate', validateDelivery);
router.put('/:id/cancel', cancelDelivery);

export default router;

