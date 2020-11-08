import {Router} from 'express';
import AuthController from './controllers/AuthController';
import PokemonsController from './controllers/PokemonsController';
import UserController from './controllers/UserController';
import authMiddleware from './middlewares/authMiddleware';

const routes = Router();

routes.post('/users', UserController.store);
routes.get('/users', authMiddleware, UserController.index);
routes.post('/auth', AuthController.authenticate);
routes.get('/pokemons', PokemonsController.index);

export default routes;
