import * as mongoose from 'mongoose';
import { Request, Response } from 'express';
import User from '../models/User';
import { Md5 } from 'md5-typescript';
import { validationResult } from 'express-validator/check';

const user = mongoose.model('users', User);

export class UserController {
    public create(req: Request, res: Response, next: any) {
        let params = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: 'Invalid params. Please check it and try again!' });
        }
        user.create(
            {
                username: params.username,
                nickname: params.nickname,
                password: Md5.init(params.password)
            },
            (err, data) => {
                if (err) {
                    res.status(500);
                    return next(err);
                }
                res.redirect('/login');
            }
        );
    }
}
