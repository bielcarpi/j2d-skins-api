import express from 'express';
import * as skinController from '../controllers/skin.controller';

const router = express.Router();

router.get('/available', skinController.getAvailableSkins);
router.post('/buy', skinController.buySkin);
router.get('/myskins', skinController.getMySkins);
router.put('/color', skinController.changeSkinColor);
router.delete('/delete/:id', skinController.deleteSkin);
router.get('/getskin/:id', skinController.getSkin);

export default router;
