import * as socketioJwt from 'socketio-jwt';
import { ChatRealtimeController } from '../controllers/ChatRealtimeController';

class Socket {
    public io: any;
    public chatRealtimeController: ChatRealtimeController;
    constructor(io) {
        this.io = io;
        this.chatRealtimeController = new ChatRealtimeController();
        this.config();
    }

    private config(): void {
        this.io.use(socketioJwt.authorize({
            secret: 'secret',
            handshake: true,
            decodedPropertyName: 'decoded_token',
        }));
        let chatIO = this.io.of('/chat-direct');
        chatIO.on('connection', function (socket: any) {
            console.log('SocketID ' + socket.id + ' connected', socket.handshake.query.token);
        });
        let chatController = this.chatRealtimeController;
        let roomIO = this.io.of('/chat-room');
        roomIO.on('connection', function (socket: any) {
            console.log('Client connected room:', socket.id);
            chatController.chatRoom(roomIO, socket);
        });
    }
}

export default Socket;
