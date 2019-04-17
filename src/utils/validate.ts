import { check, body } from 'express-validator/check';
import * as mongoose from 'mongoose';
import { User } from '../models/User';

const userModel = mongoose.model('User', User);

export const validateLogin = () => {
    return [
        check('username')
            .exists().withMessage('Username is required!')
            .isLength({ min: 4 }).withMessage('Username must be least 4 chars long.'),
        check('password')
            .exists().withMessage('Password is required!')
            .isLength({ min: 8 }).withMessage('Password must be least 8 chars long.'),
    ];
};

export const validateRegister = () => {
    return [
        body('username')
            .exists().withMessage('Username is required!')
            .isLength({ min: 4 }).withMessage('Username must be least 4 chars long.')
            .custom(value => {
                return userModel.findOne({ username: value }).then((user) => {
                    if (user) {
                        return Promise.reject('Username already in use.');
                    }
                });
            }),
        check('nickname')
            .optional({ nullable: true })
            .isLength({ min: 4 }).withMessage('Nickname must be least 4 chars long.'),
        check('password')
            .exists().withMessage('Password is required!')
            .isLength({ min: 8 }).withMessage('Password must be least 8 chars long.')
    ];
};
