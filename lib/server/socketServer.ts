import * as express from 'express';
import * as socketIo from 'socket.io';
import { createServer, Server } from 'http';

export interface chatMessage {
  user: String;
  message: String;
}

export class SocketServer {
  private app: express.Application;
  private server: Server;
  private io: SocketIO.Server;
  private numberOfUsers: number = 0;
  private chat: Array<chatMessage>;
  public readonly PORT: number = 3005;

  constructor() {
    this.app = express();
    this.server = createServer(this.app);
    this.io = socketIo(this.server);
    this.connect();
  }

  public connect(): void {
    this.server.listen(this.PORT, () => {
      console.log('Socket Server listening to port: ', this.PORT);

      this.io.on('connection', (socket: SocketIO.Socket) => {
        console.log('user connected!');
        let currentUser: String = socket.id;
        this.numberOfUsers++;
        socket.on('join', (user: String) => {
          currentUser = user;

          console.log(user + ' has joined the chat');
          socket.broadcast.emit('join', user, this.numberOfUsers);

          socket.on('sent message', (message: string) => {
            let chat: chatMessage = { user, message };
            let chatJSON: String = JSON.stringify(chat);
            console.log(chatJSON);
            this.io.emit('sent message', chatJSON);
          });
        });

        socket.on('disconnect', () => {
          console.log(currentUser + ' has disconnected');
          this.io.emit('disconnected', currentUser);
          this.numberOfUsers--;
        });
      });
    });
  }
  private upToSpeed(socket: SocketIO.Server): void {
    socket.emit('up to speed');
  }
}
