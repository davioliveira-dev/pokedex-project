import cors from 'cors';
import express from 'express';
import queueConfig from './config/queueConfig';
import routes from './routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(queueConfig);
app.use(routes);

export default app;
