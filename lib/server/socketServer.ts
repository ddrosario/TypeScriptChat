import * as express from 'express';
import * as socketIo from 'socket.io';
import { createServer, Server } from 'http';

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
        let currentUser: String = socket.id;

        socket.on('join', (user: String) => {
          currentUser = user;
          console.log(user + ' has joined the chat');
          socket.broadcast.emit('join', user);
        });

        socket.on('disconnect', () => {
          console.log(currentUser + ' has disconnected');
          this.io.emit('disconnected', currentUser);
        });
      });
    });
  }

  public connect(): void {}
}
