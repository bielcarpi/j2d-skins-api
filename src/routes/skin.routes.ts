import express from 'express';
import * as skinController from '../controllers/skin.controller';
import {validate} from "../middleware/validate.middleware";
import {body, param} from 'express-validator';


const router = express.Router();

// Protected routes with JWT. For auth, auth.routes.ts is used instead.
router.get('/skins/available',
    skinController.getAvailableSkins
);
router.post('/skins/buy',
    body('skinId').trim().escape().notEmpty().withMessage('Skin ID is required').isNumeric().withMessage('Invalid Skin ID'),
    validate,
    skinController.buySkin
);
router.get('/skins/myskins',
    skinController.getMySkins
);
router.put('/skins/color',
    body('userSkinId').trim().escape().notEmpty().withMessage('User Skin ID is required').isNumeric().withMessage('Invalid User Skin ID'),
    body('newColor').trim().escape().notEmpty().withMessage('New color is required').isString().withMessage('Invalid new color'),
    validate,
    skinController.changeSkinColor
);
router.delete('/skins/delete/:id',
    param('id').trim().escape().notEmpty().withMessage('Skin ID is required').isNumeric().withMessage('Invalid Skin ID'),
    validate,
    skinController.deleteSkin
);
router.get('/skin/getskin/:id',
    param('id').trim().escape().notEmpty().withMessage('Skin ID is required').isNumeric().withMessage('Invalid Skin ID'),
    validate,
    skinController.getSkin
);

export default router;
