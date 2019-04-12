import * as mongoose from 'mongoose';
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { User } from '../models/User';

const userModel = mongoose.model('User', User);

export class HomeController {
    public index(req: Request, resp: Response, next: any) {
        let token = req.cookies.token;
        let userDecoded: any = jwt.decode(token, {complete: true});
        userModel.findOne({ 'id': userDecoded.payload.id }, (err, user) => {
            if (err) {
                console.log(err);
                return resp.status(500).end();
            }
            if (!user) {
                return resp.status(404).end();
            }
            
            resp.render('index', {'userLogin' : user});
        });
    }
}
