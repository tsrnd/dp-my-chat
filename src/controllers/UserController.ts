import * as mongoose from 'mongoose';
import { Request, Response } from 'express';
import User from '../models/User';

const user = mongoose.model('users', User);

export class UserController {
    public create(req: Request, res: Response, next: any) {
        var params = req.body
        user.findOne({ username: params.username }, (err, data) => {
            if (err) {
                res.status(500)
                next(err)
            }
            if (data !== null) {
                res.status(400)
                var message = 'Username already exists'
                next({err: new Error('username already exists'), message: message})
            }
            user.create(
                { username: params.username, nickname: params.nickname, password: params.password },
                (err, data) => {
                    if (err) {
                        res.status(500)
                        next(err)
                    }
                }
            );
        })
    }
}
