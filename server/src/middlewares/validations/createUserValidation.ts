import {NextFunction, Request, Response} from 'express';

function createUserValidation(req: Request, res: Response, next: NextFunction) {
  if (!req.body) {
    return res.status(401).send({message: 'Body is required for this request'});
  }
  const {email, password} = req.body;

  if (!email || !password) {
    return res.status(401).send({
      message: 'Email and password are required for this request',
    });
  }

  return next();
}

export default createUserValidation;
