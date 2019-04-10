import { Request, Response } from 'express';
import * as mongoose from 'mongoose';
import { User } from '../models/User';
import { Md5 } from 'md5-typescript';
import * as jwt from 'jsonwebtoken';

const userModel = mongoose.model('User', User);

export class AuthController {
    // Show form login
    public index(req: Request, resp: Response) {
        resp.render('auth/login');
    }
    public login(req: Request, resp: Response) {
        userModel.findOne({'username': req.body.username}, (err, user) => {
            if (err) {
                console.log(err);
                return resp.status(500).end();
            }
            if (!user) {
                return resp.status(404).end();
            }
            if (user['password'] != Md5.init(req.body.password)) {
                return resp.status(400).end();
            }
            // generate token
            const token = jwt.sign({ id: user.id, username: user['username'] }, 'secret', {
                expiresIn: 604800 // expires in 7 day
            });
            resp.setHeader('authorization', 'Bearer ' + token);
            return resp.redirect('/');
        });
    }
}
