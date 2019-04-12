import app from './app';
import { db } from './utils/db';
import { Server } from 'http';
import * as SocketIO from 'socket.io';
import Socket from './socket/Socket';

let server = new Server(app);
let sockerIO = new SocketIO(server);

new Socket(sockerIO);

server.listen(3000, () => {
    console.log('server is running listening on port ' + 3000);
});

db.once('open', () => {
    console.log('connect mongodb success.');
});
