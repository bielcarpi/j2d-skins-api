import express from 'express';
import * as skinController from '../controllers/skin.controller';
import passport from "passport";
import {validate} from "../middleware/validate.middleware";
import { body, param } from 'express-validator';


const router = express.Router();

// Protected routes with JWT. For auth, auth.routes.ts is used instead.
router.get('/available',
    passport.authenticate('jwt', {session: false}),
    skinController.getAvailableSkins
);
router.post('/buy',
    passport.authenticate('jwt', {session: false}),
    body('skinId').trim().escape().notEmpty().withMessage('Skin ID is required'),
    validate,
    skinController.buySkin
);
router.get('/myskins',
    passport.authenticate('jwt', {session: false}),
    skinController.getMySkins
);
router.put('/color',
    passport.authenticate('jwt', {session: false}),
    body('userSkinId').trim().escape().notEmpty().withMessage('User Skin ID is required'),
    body('newColor').trim().escape().notEmpty().withMessage('New color is required'),
    validate,
    skinController.changeSkinColor
);
router.delete('/delete/:id',
    passport.authenticate('jwt', {session: false}),
    param('id').trim().escape().notEmpty().withMessage('Skin ID is required').isMongoId().withMessage('Invalid Skin ID'),
    validate,
    skinController.deleteSkin
);
router.get('/getskin/:id',
    passport.authenticate('jwt', {session: false}),
    param('id').trim().escape().notEmpty().withMessage('Skin ID is required').isMongoId().withMessage('Invalid Skin ID'),
    validate,
    skinController.getSkin
);

export default router;
