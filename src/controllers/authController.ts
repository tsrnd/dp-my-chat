import { Request, Response } from 'express';
import * as mongoose from 'mongoose';
import { User } from '../models/User';
import { Md5 } from 'md5-typescript';
import * as jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator/check';

const userModel = mongoose.model('User', User);

export class AuthController {
    // Show form login
    public showLogin(req: Request, resp: Response) {
        if (req.cookies.token) {
            return resp.redirect('/');
        }
        resp.render('login');
    }
    public login(req: Request, resp: Response) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return resp.status(400).json({ errors: errors.array() });
        }
        userModel.findOne({ 'username': req.body.username }, (err, user) => {
            if (err) {
                return resp.status(500).json({ errors: 'Internal server errors!' });
            }
            if (!user) {
                return resp.status(404).json({ errors: 'Username does not exists!' });
            }
            if (user['password'] != Md5.init(req.body.password)) {
                return resp.status(400).json({
                    errors: [
                        {
                            param: 'password',
                            msg: 'Password does not correct'
                        }
                    ]
                });
            }
            // clear old token
            resp.clearCookie('token');
            // generate token
            const token = jwt.sign({ id: user.id }, 'secret', {
                expiresIn: 604800 // expires in 7 day
            });
            resp.cookie('token', token);
            resp.redirect('/');
        });
    }
    public showRegister(req: Request, resp: Response) {
        resp.render('register');
    }

    public logout(req: Request, resp: Response) {
        resp.clearCookie('token').redirect('login');
    }
}
