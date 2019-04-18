import * as mongoose from 'mongoose';
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { User } from '../models/User';
import { Room } from '../models/Room';

const userModel = mongoose.model('User', User);
const roomModel = mongoose.model('Room', Room);

export class HomeController {
    public index(req: Request, resp: Response, next: any) {
        let token = req.cookies.token;
        let userDecoded: any = jwt.decode(token, { complete: true });
        userModel.findOne({ 'id': userDecoded.payload.id }, (err, user) => {
            if (err) {
                return resp.status(500).end();
            }
            if (!user) {
                return resp.status(404).end();
            }
            roomModel.find({}, (err, rooms) => {
                if (err) {
                    return resp.status(500).end();
                }
                resp.render('index', { 'userLogin': user, 'rooms': rooms });
            }).sort({ created_at: -1 });
        });
    }
}
