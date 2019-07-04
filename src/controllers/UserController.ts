import * as mongoose from 'mongoose';
import { Request, Response } from 'express';
import User from '../models/User';
import { Md5 } from 'md5-typescript';
import { PostRegisterRequest } from '../validator/post-register-request';
import { Validator } from '../utils/validator';

const user = mongoose.model('users', User);

export class UserController {
    public create(req: Request, res: Response, next: any) {
        let params = req.body;
        let validate = Validator.ajv.compile(PostRegisterRequest);
        let valid = validate(params);
        if (!valid) {
            res.status(400);
            return next({Error: new Error('Bad Request'), messages: Validator.getErrors(validate.errors)});
        }
        user.findOne({ username: params.username }, (err, data) => {
            if (err) {
                res.status(500);
                return next(err);
            }
            if (data !== null) {
                res.status(400);
                return next(new Error('Username already exists'));
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
        });
    }
}
