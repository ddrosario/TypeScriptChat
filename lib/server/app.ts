import * as express from 'express';
import * as parser from 'body-parser';

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.config();
    this.serveStatic();
    //also need to set up the routes
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
