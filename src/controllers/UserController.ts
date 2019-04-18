import * as mongoose from 'mongoose';
import { Request, Response } from 'express';
import User from '../models/User';
import { Md5 } from 'md5-typescript';
import * as jwt from 'jsonwebtoken';

const user = mongoose.model('users', User);

export class UserController {
    public create(req: Request, res: Response, next: any) {
        let params = req.body;
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
    public list(req: Request, res: Response, next: any) {
        let token = req.cookies.token;
        let userDecoded: any = jwt.decode(token, { complete: true });
        var condition = { $or: [{ nickname: { $regex: '.*' + req.query.q + '.*' } }, { username: { $regex: '.*' + req.query.q + '.*' } }] };
        user.find({ $and: [{ id: { $ne: userDecoded.payload.id } }, condition] }, (err, users) => {
            if (err) {
                return res.status(500).end();
            }
            return res.json(users);
        });

    }
}
