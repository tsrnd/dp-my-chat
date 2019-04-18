import * as jwt from 'jsonwebtoken';
import * as cookie from 'cookie';
import * as mongoose from 'mongoose';
import { Room } from '../models/Room';
import { User } from '../models/User';

const userModel = mongoose.model('User', User);
const roomModel = mongoose.model('Room', Room);

export class ChatRealtimeController {
    public chatRoom = (socket: any) => {
        socket.on('create-room', async function (data) {
            var token = cookie.parse(socket.request.headers.cookie).token;
            var userDecoded: any = jwt.decode(token, { complete: true });
            var userJWT = await userModel.findOne({ id: userDecoded.payload.id });
            data.members.push(userJWT._id.toString());
            await roomModel.create({
                member: data.members,
                name: data.room,
                room_owner: userJWT._id
            }, (err, room) => {
                if (err) {
                    console.log(err);
                }
                socket.leave(socket.room);
                socket.join(room._id);
                socket.emit('current-room', data.room);
                socket.emit('update-rooms', data.room);
            });
        });
    }

}
