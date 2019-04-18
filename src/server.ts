import app from './app';
import { db } from './utils/db';
import * as SocketIO from 'socket.io';
import Socket from './socket/Socket';

const server = app.listen(3000, () => {
    console.log('server is running listening on port ' + 3000);
});

db.once('open', () => {
    console.log('connect mongodb success.');
});

const io = SocketIO(server);

const socketServer = new Socket(io);
