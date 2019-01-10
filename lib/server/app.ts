import * as express from 'express';
import * as parser from 'body-parser';
import { Router } from './routes';
import { SocketServer } from './socketServer';

class App {
  public app: express.Application;
  private router: Router = new Router();
  private socketServer: SocketServer;

  constructor() {
    this.app = express();
    this.config();
    this.serveStatic();
    this.router.routes(this.app);
    this.socketServer = new SocketServer();
  }

  private config(): void {
    //apply middleware
    this.app.use(parser.json());
    this.app.use(parser.urlencoded({ extended: true }));
  }

  private serveStatic(): void {
    //serve the static files
    this.app.use(express.static(__dirname + '/../../static'));
  }
}

export const app = new App().app;
