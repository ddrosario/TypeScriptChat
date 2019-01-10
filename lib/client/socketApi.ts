import * as socketIo from 'socket.io-client';

export class SocketApi {
  private socket: SocketIO.Client;
  constructor() {
    this.socket = socketIo('http://localhost:3005');
  }
}
