import {config} from 'dotenv';
import 'reflect-metadata';
import http from 'http';
import app from './app';
import './database/connect';
config();

const server = new http.Server(app);

server.listen(process.env.PORT || 3333, () => {
  return console.log('Server Started');
});
