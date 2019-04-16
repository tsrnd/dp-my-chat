import * as socketioJwt from 'socketio-jwt';

class Socket {
    public io: any;
    constructor(io) {
        this.io = io;
        this.config();
    }

    private config(): void {
        this.io.use(socketioJwt.authorize({
            secret: 'secret',
            handshake: true,
            decodedPropertyName: 'decoded_token',
        }));
        let chatIO = this.io.of('/chat-direct');
        chatIO.on('connection', function(socket: any) {
            console.log('SocketID ' + socket.id + ' connected', socket.handshake.query.token);
        });

        let roomIO = this.io.of('/chat-room');
        roomIO.on('connection', function(socket: any) {
            console.log('Client connected room:', socket.id);
        });
    }
}

export default Socket;
