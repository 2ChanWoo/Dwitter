import express from 'express';
import {} from 'express-async-errors';
import { body } from 'express-validator';
import { validate } from '../middleware/validator.js';
import * as authController from '../controller/auth_controller.js';
import { isAuth } from '../middleware/auth.js';

const router = express.Router();

const validateCredential = [
  body('username')
    .trim()
    .notEmpty()
    .withMessage('username should be at least 5 characters'),
  body('password')
    .trim()
    .isLength({ min: 5 })
    .withMessage('password should be at least 5 characters'),
  validate,
];

const validateSignup = [
  ...validateCredential,
  body('name').notEmpty().withMessage('name is missing'),
  body('email').isEmail().normalizeEmail().withMessage('invalid email'),
  body('url')
    .isURL()
    .withMessage('invalid URL')
    //널 허용 및 checkFalsy : 텅텅 빈 문자열 허용
    .optional({ nullable: true, checkFalsy: true }),
  validate,
];
// POST /auth/signup
router.post('/signup', validateSignup, authController.signup);

// POST /auth/login
router.post('/login', validateCredential, authController.login);

// POST /auth/me
router.post('/me', isAuth, authController.me);

export default router;

