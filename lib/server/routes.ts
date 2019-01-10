import { Request, Response, Application } from 'express';
//import the controller
import { Controller } from './controller';

export class Router {
  constructor() {}

  public routes(app: Application): void {
    app.route('/').get((req: Request, res: Response) => {
      console.log('this works!');
      res.send('hello there!');
    });
  }
}
