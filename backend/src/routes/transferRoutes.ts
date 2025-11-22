import { Router } from 'express';
import { body } from 'express-validator';
import {
  getTransfers,
  getTransfer,
  createTransfer,
  validateTransfer,
  cancelTransfer,
} from '../controllers/transferController';
import { authenticate } from '../middleware/auth';
import { validate } from '../middleware/validator';

const router = Router();

router.use(authenticate);

router.get('/', getTransfers);
router.get('/:id', getTransfer);

router.post(
  '/',
  validate([
    body('fromLocationId').notEmpty(),
    body('toLocationId').notEmpty(),
    body('lines').isArray({ min: 1 }),
    body('lines.*.productId').notEmpty(),
    body('lines.*.quantity').isFloat({ min: 0.01 }),
  ]),
  createTransfer
);

router.put('/:id/validate', validateTransfer);
router.put('/:id/cancel', cancelTransfer);

export default router;

