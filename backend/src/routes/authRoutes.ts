import { Router } from 'express';
import { body } from 'express-validator';
import {
  signup,
  login,
  forgotPassword,
  resetPassword,
  getCurrentUser,
} from '../controllers/authController';
import { authenticate } from '../middleware/auth';
import { validate } from '../middleware/validator';

const router = Router();

// Signup
router.post(
  '/signup',
  validate([
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 6 }),
    body('firstName').notEmpty().trim(),
    body('lastName').notEmpty().trim(),
  ]),
  signup
);

// Login
router.post(
  '/login',
  validate([
    body('email').isEmail().normalizeEmail(),
    body('password').notEmpty(),
  ]),
  login
);

// Forgot password
router.post(
  '/forgot-password',
  validate([body('email').isEmail().normalizeEmail()]),
  forgotPassword
);

// Reset password
router.post(
  '/reset-password',
  validate([
    body('email').isEmail().normalizeEmail(),
    body('otp').isLength({ min: 6, max: 6 }),
    body('newPassword').isLength({ min: 6 }),
  ]),
  resetPassword
);

// Get current user (protected)
router.get('/me', authenticate, getCurrentUser);

export default router;

