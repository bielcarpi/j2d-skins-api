import express from 'express';
import * as authController from '../controllers/auth.controller';
import {body} from "express-validator";
import {validate} from "../middleware/validate.middleware";

const router = express.Router();

const validateUsername = body('username')
    .trim()
    .escape()
    .notEmpty()
    .withMessage('Username is required')
    .isLength({min: 3, max: 30}).withMessage('Username must be 3-30 characters long');

const validatePassword = body('password')
    .trim()
    .escape()
    .notEmpty().withMessage('Password is required')
    .isLength({min: 6, max: 20}).withMessage('Password must be 6-20 characters long');


// Register and login routes
router.post('/register',
    validateUsername,
    validatePassword,
    validate,
    authController.register
);
router.post('/login',
    validateUsername,
    validatePassword,
    validate,
    authController.login
);

export default router;
