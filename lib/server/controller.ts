import { Request, Response } from 'express';

export class Controller {
  constructor() {}

  public getAllMessages(req: Request, res: Response): void {
    res.send('sup');
  }
}
