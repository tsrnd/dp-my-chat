import * as mongoose from 'mongoose';
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { User } from '../models/User';
import { Room } from '../models/Room';
import { Message } from '../models/Message';

const userModel = mongoose.model('User', User);
const messageModel = mongoose.model('Message', Message);
const roomModel = mongoose.model('Room', Room);

export class HomeController {
    public async index(req: Request, resp: Response, next: any) {
        let token = req.cookies.token;
        let userDecoded: any = jwt.decode(token, { complete: true });
        const user = await userModel.findOne({ 'id': userDecoded.payload.id }, (err, user) => {
            if (err) {
                return resp.status(500).end();
            }
            if (!user) {
                return resp.status(404).end();
            }
        });
        const myRooms = await roomModel.find({ 'room_owner': user._id, 'type': 0 }, (err, result) => {
            if (err) {
                return resp.status(500).end();
            }
        });
        const listUsers = await userModel.find({}).limit(5).catch(err => {
            if (err) {
                return resp.status(500).end();
            }
        });
        resp.render('index', {
            'userLogin': user,
            'myRooms': myRooms,
            'listUsers': listUsers
        });
    }
}
