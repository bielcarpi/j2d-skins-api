import {validationResult} from "express-validator";
import {NextFunction, Request, Response} from 'express';

// validator.ts
// Middleware for checking validation results (sanitizing and checking for input in a specific request)
export const validate = (req: Request, res: Response, next: NextFunction) => {
    // Get validation results from express-validator
    const errors = validationResult(req);

    // If there are errors, return a 400 - Bad Request
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    next();
};