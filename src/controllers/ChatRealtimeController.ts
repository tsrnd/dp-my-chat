import * as jwt from 'jsonwebtoken';
import * as cookie from 'cookie';
import * as mongoose from 'mongoose';
import { Room } from '../models/Room';
import { User } from '../models/User';
import { UserRoom } from '../models/UserRoom';

const userModel = mongoose.model('User', User);
const roomModel = mongoose.model('Room', Room);
const userRoomModel = mongoose.model('UserRoom', UserRoom);

export class ChatRealtimeController {
    public chatRoom = (sockets, socket: any) => {
        socket.on('create-room', async function (data) {
            var token = cookie.parse(socket.request.headers.cookie).token;
            var userDecoded: any = jwt.decode(token, { complete: true });
            var userJWT = await userModel.findOne({ id: userDecoded.payload.id });
            data.members.push(userJWT._id.toString());
            var room = await roomModel.create({
                member: data.members,
                name: data.room,
                room_owner: userJWT._id
            });
            data.members.forEach(async member => {
                userRoomModel.create({
                    user_id: member,
                    room_id: room._id
                });
                var user = await userModel.findOne({ _id: member });
                sockets.emit('update-list-rooms', data.room, user.id);
            });
            socket.leave(socket.room);
            socket.join(room._id);
            socket.emit('current-room', data.room);
        });
    }

}
