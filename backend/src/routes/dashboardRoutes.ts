import { Router } from 'express';
import { getDashboardKPIs, getDashboardStats } from '../controllers/dashboardController';
import { authenticate } from '../middleware/auth';

const router = Router();

router.use(authenticate);

router.get('/kpis', getDashboardKPIs);
router.get('/stats', getDashboardStats);

export default router;

