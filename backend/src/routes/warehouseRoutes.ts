import { Router } from 'express';
import { body } from 'express-validator';
import {
  getWarehouses,
  createWarehouse,
  getLocations,
  createLocation,
} from '../controllers/warehouseController';
import { authenticate, authorize } from '../middleware/auth';
import { validate } from '../middleware/validator';

const router = Router();

router.use(authenticate);

// Warehouses
router.get('/', getWarehouses);
router.post(
  '/',
  authorize('ADMIN', 'MANAGER'),
  validate([
    body('name').notEmpty().trim(),
    body('code').notEmpty().trim(),
  ]),
  createWarehouse
);

// Locations
router.get('/locations', getLocations);
router.post(
  '/locations',
  authorize('ADMIN', 'MANAGER'),
  validate([
    body('warehouseId').notEmpty(),
    body('name').notEmpty().trim(),
    body('code').notEmpty().trim(),
  ]),
  createLocation
);

export default router;

