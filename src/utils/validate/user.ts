import { User } from '../../models/User';
import * as mongoose from 'mongoose';

const user = mongoose.model('User', User);

export const registerValidate = (req: any): any => {
    req.checkBody('username', 'Name is required').notEmpty();
    req.check('password')
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 5 }).withMessage('Password must be at least 5 chars long');
    req.check('username').custom(value => {
         user.findOne({ username: value }).then((user) => {
            if (user) {
                Promise.reject('username already in use');
            }
        });
    }).withMessage('username already in use');
    let errors = req.validationErrors();
    return errors;
};