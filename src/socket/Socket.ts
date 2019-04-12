
class Socket {
    public io: any;
    constructor(io) {
        this.io = io;
        this.config();
    }

    private config(): void {
       this.io.on('connection', function(socket) {
            console.log('SocketID ' + socket.id + ' connected');

            // Whenever someone disconnects this piece of code executed
            socket.on('disconnect', function () {
                console.log('SocketID ' + socket.id + ' disconnected');
            });

       });
    }
}

export default Socket;
