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
    this.chat = [];
    this.connect();
  }

  private connect(): void {
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

          this.getChatToSocket(socket);

          socket.on('sent message', (message: string) => {
            let chat: Array<chatMessage> = [{ user, message }];
            let chatJSON: String = JSON.stringify(chat);
            this.addToChat(chat);
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
  public getNumberOfUsers(): number {
    return this.numberOfUsers;
  }
  private addToChat(message: Array<chatMessage>): void {
    this.chat = this.chat.concat(message);
  }
  private getChatToSocket(socket: SocketIO.Socket): void {
    socket.emit(
      'up to speed',
      JSON.stringify(this.chat),
      this.getNumberOfUsers()
    );
  }
}
