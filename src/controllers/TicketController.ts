import { Request, Response, NextFunction} from 'express';

const TicketController = (req : Request, res : Response, next : NextFunction) : void => {

  // console.log(req);
  res.send('hello');
  res.end();
}
export default TicketController;
