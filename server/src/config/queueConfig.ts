import {NextFunction, Request, Response} from 'express';

import queue from 'bee-queue';

function queueConfig(req: Request, res: Response, next: NextFunction) {
  req.queue = queue;
  return next();
}

export default queueConfig;
