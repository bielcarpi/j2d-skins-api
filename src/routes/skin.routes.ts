import express from 'express';
import * as skinController from '../controllers/skin.controller';
import passport from "passport";

const router = express.Router();

// Protected routes with JWT. For auth, auth.routes.ts
router.get('/available', passport.authenticate('jwt', {session: false}), skinController.getAvailableSkins);
router.post('/buy', passport.authenticate('jwt', {session: false}), skinController.buySkin);
router.get('/myskins', passport.authenticate('jwt', {session: false}), skinController.getMySkins);
router.put('/color', passport.authenticate('jwt', {session: false}), skinController.changeSkinColor);
router.delete('/delete/:id', passport.authenticate('jwt', {session: false}), skinController.deleteSkin);
router.get('/getskin/:id', passport.authenticate('jwt', {session: false}), skinController.getSkin);

export default router;
