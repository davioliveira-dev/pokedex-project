import {NextFunction, Request, Response} from 'express';
import jwt from 'jsonwebtoken';
import {ITokenPayload} from '../helpers/ITokenPayload';

function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const {authorization} = req.headers;

  if (!authorization) {
    return res.sendStatus(401);
  }

  const token = authorization.replace('Bearer', '').trim();

  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    const {user} = data as ITokenPayload;

    req.userId = user;

    return next();
  } catch {
    return res.sendStatus(401);
  }
}

export default authMiddleware;
