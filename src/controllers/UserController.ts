import * as mongoose from 'mongoose';
import { Request, Response } from 'express';
import User from '../models/User';
import { Md5 } from 'md5-typescript';
import { signedCookie } from 'cookie-parser';

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
    public getData(req: Request, resp: Response) {
        user.findOne({ id: req.params.id}, (err, user) => {
            if (!user) {
                return resp.status(404).end();
            }
            if (err) {
                return resp.status(500).end();
            }
            resp.render('users/edit', {
                title: 'Edit Users',
                data: user
            });
        });
    }
    public update(req: Request, resp: Response) {
        let userUpdate = {
            username: req.body.username,
            nickname: req.body.nickname,
        };
        user.findOneAndUpdate({ id: req.params.id }, userUpdate, (error, data) => {
            if (!data) {
                return resp.status(404).end();
            }
            if (error) {
                return resp.status(500).end();
            }
            resp.redirect(`/user/${data.id}`);
        });
    }
}
