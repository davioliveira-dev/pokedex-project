import AuthController from './controllers/AuthController';
import {Router} from 'express';
import UserController from './controllers/UserController';
import authMiddleware from './middlewares/authMiddleware';

const routes = Router();

routes.post('/users', UserController.store);
routes.post('/auth', AuthController.authenticate);
routes.get('/users', authMiddleware, UserController.index);

export default routes;
