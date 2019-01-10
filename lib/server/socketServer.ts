import * as express from 'express';
import * as socketIo from 'socket.io';
import { createServer, Server } from 'http';
import { isObject } from 'util';

export class SocketServer {
  private app: express.Application;
  private server: Server;
  private io: SocketIO.Server;
  public readonly PORT: number = 3005;

  constructor() {
    this.app = express();
    this.server = createServer(this.app);
    this.io = socketIo(this.server);
    this.server.listen(this.PORT, () => {
      console.log('Socket Server listening to port: ', this.PORT);
      this.io.on('connection', (socket: SocketIO.Socket) => {
        console.log('user connected!');
        //listen for a new user
        socket.on('join', (user: String) => {
          console.log(user + ' has joined the chat');
          //alert all the other users that this user has joined
          socket.broadcast.emit('join', user);
        });
      });
    });
  }

  public connect(): void {}
}
