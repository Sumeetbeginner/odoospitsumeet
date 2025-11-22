import { Router } from 'express';
import { body } from 'express-validator';
import {
  getAdjustments,
  getAdjustment,
  createAdjustment,
  validateAdjustment,
  cancelAdjustment,
  getStockMoves,
} from '../controllers/adjustmentController';
import { authenticate } from '../middleware/auth';
import { validate } from '../middleware/validator';

const router = Router();

router.use(authenticate);

router.get('/', getAdjustments);
router.get('/:id', getAdjustment);

router.post(
  '/',
  validate([
    body('locationId').notEmpty(),
    body('lines').isArray({ min: 1 }),
    body('lines.*.productId').notEmpty(),
    body('lines.*.countedQty').isFloat({ min: 0 }),
  ]),
  createAdjustment
);

router.put('/:id/validate', validateAdjustment);
router.put('/:id/cancel', cancelAdjustment);

// Stock moves
router.get('/moves/history', getStockMoves);

export default router;

