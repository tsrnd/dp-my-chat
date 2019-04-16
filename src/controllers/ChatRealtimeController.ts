import * as mongoose from 'mongoose';
import { Request, Response } from 'express';
import { Room } from '../models/Room';
import { Message } from '../models/Message';

const roomModel = mongoose.model('rooms', Room);
const messageModel = mongoose.model('messages', Message);

export class ChatRealtimeController {
    public saveMessage(req: Request, resp: Response, next: any) {

    }
}
