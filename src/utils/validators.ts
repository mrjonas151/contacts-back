import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';

export const validateContact = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Email is not valid'),
  body('phone').notEmpty().withMessage('Phone number is required'),
  body('favorite').optional().isBoolean().withMessage('Favorite must be a boolean'),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export const validateUserRegistration = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Email is not valid'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export const validateUserLogin = [
  body('email').isEmail().withMessage('Email is not valid'),
  body('password').notEmpty().withMessage('Password is required'),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];