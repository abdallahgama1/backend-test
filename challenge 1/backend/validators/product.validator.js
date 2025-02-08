import { body } from 'express-validator';

export const updateProductValidators = [
    body('name')
        .trim()
        .notEmpty().withMessage('Name is required')
        .isLength({ min: 2, max: 100 }).withMessage('Name must be between 2 and 100 characters'),

    body('price')
        .notEmpty().withMessage('Price is required')
        .isFloat({ min: 0 }).withMessage('Price must be a positive number'),

    body('quantity')
        .optional()
        .isInt({ min: 0 }).withMessage('Quantity must be a positive number'),

    body('category')
        .optional()
        .isString().withMessage('Category name should be string')
];
