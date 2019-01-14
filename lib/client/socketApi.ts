import * as socketIo from 'socket.io-client';

export class SocketApi {
  private socket: SocketIOClient.Socket;

  constructor() {
    this.socket = socketIo('http://localhost:3005');
  }

  public join(user: String, cb: Function): void {
    this.socket.emit('join', user);
    this.getPreviousMessages(cb);
  }

  public getMessages(cb: Function): void {
    this.socket.on('sent message', (chatJSON: String) => {
      cb(chatJSON);
    });
  }

  public getUserJoined(cb: Function): void {
    this.socket.on('join', (user: string, numberOfUsers: string) => {
      console.log('user joined', user);
      cb(user, numberOfUsers);
    });
  }

  public sendMessage(msg: String, cb: Function): void {
    this.socket.emit('sent message', msg);
    cb();
  }

  private getPreviousMessages(cb: Function): void {
    this.socket.on('up to speed', (previousMessages: String) => {
      cb(previousMessages);
    });
  }
}
