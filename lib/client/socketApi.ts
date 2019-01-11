import * as socketIo from 'socket.io-client';

export class SocketApi {
  private socket: SocketIOClient.Socket;

  constructor() {
    this.socket = socketIo('http://localhost:3005');
  }

  public join(user: String, cb: Function): void {
    this.socket.emit('join', user);
    this.getMessages(cb);
  }

  public getMessages(cb: Function): void {
    this.socket.on('sent message', (chatJSON: String) => {
      console.log(chatJSON);
      cb(chatJSON);
    });
  }

  public sendMessage(msg: String, cb: Function): void {
    console.log(msg);
    this.socket.emit('sent message', msg);
    cb();
  }
}
