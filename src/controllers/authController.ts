import { Request, Response } from 'express';
import * as mongoose from 'mongoose';
import { User } from '../models/User';
import { Md5 } from 'md5-typescript';
import * as jwt from 'jsonwebtoken';

const userModel = mongoose.model('User', User);

export class AuthController {
    public login(req: Request, resp: Response) {
        userModel.findOne({'username': req.body.username, 'password': Md5.init(req.body.password)}, (err, user) => {
            if (err) {
                console.log(err);
                resp.status(500).end();
            }
            // generate token
            const token = jwt.sign({ id: user.id, username: user['username'] }, 'secret', {
                expiresIn: 86400 // expires in 24 hours
            });
            resp.json({
                token: token
            });
        });
    }
}
