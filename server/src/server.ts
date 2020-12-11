import {Express} from 'express-serve-static-core';
import cors from 'cors';
import express from 'express';
import queueConfig from './config/queueConfig';
import routes from './routes';

class Server {
  private app: Express;

  constructor() {
    this.app = express();
    this.config();
    this.routerConfig();
  }

  private config() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(queueConfig);
  }

  private routerConfig() {
    this.app.use(routes);
  }

  public start = (port: number) => {
    return new Promise((resolve, reject) => {
      this.app.listen(port, () => {
        resolve(port);
      }).on('error', (err: Object) => reject(err));
    });
  }
}

export default Server;

