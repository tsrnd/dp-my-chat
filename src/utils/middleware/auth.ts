import { Request, Response } from 'express';
import * as mongoose from 'mongoose';
import * as jwt from 'jsonwebtoken';
import { User } from '../../models/User';

const user = mongoose.model('User', User);

export class AuthMiddleWare {
    public authorization(req: Request, resp: Response, next: any) {
        const authorizationHeader = req.headers['authorization'];
        if (authorizationHeader == undefined) {
            console.log('Missing access token!');
            resp.redirect('/login');
            return;
        }
        const tmps = authorizationHeader.split('Bearer ');
        if (tmps.length <= 1) {
            console.log('Wrong access token!');
            resp.redirect('/login');
            return;
        }
        const token = tmps[1];
        try {
            const decoded = jwt.verify(token, 'secret');
            user.findOne({ 'username': decoded['username'] })
                .then(user => {
                    if (!user) {
                        resp.status(401).json({
                            errors: [{
                                'msg': 'Wrong access token - User does not exist!'
                            }]
                        });
                    }
                    return next();
                }).catch(err => {
                    resp.status(500).json({
                        errors: [{
                            'msg': 'Internal server error!',
                        }]
                    });
                });
        } catch (err) {
            resp.status(500).json({
                errors: [{
                    'msg': 'Internal server error!'
                }]
            });
        }
    }
}
