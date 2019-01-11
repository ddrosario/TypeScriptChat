import * as socketIo from 'socket.io-client';

export class SocketApi {
  private socket: SocketIOClient.Socket;

  constructor() {
    this.socket = socketIo('http://localhost:3005');
  }
}
