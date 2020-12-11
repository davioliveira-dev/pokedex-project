import 'reflect-metadata';
import './database/connect';

import {config} from 'dotenv';
import server from './server';

config();

const port = parseInt(process.env.PORT || '3333');

const starter = new server().start(port)
    .then(() => console.log(`Running on port ${port}`))
    .catch((error) => console.log(error.message));

export default starter;
