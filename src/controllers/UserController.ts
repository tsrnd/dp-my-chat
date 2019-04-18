import * as mongoose from 'mongoose';
import { Request, Response } from 'express';
import User from '../models/User';
import { Md5 } from 'md5-typescript';
import { signedCookie } from 'cookie-parser';
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
    public update(req: Request, resp: Response) {
        let token = req.cookies.token;
        let userDecoded: any = jwt.decode(token, {complete: true});

        let userUpdate = {
            nickname: req.body.nickname,
        };
        // console.log(userUpdate);
        user.findOneAndUpdate({id : userDecoded.payload.id}, {$set : userUpdate}, {new: true}, (error, data) => {
            if (error) {
                return resp.status(500).end();
            }
            return resp.json(data);
        });
    }
}



