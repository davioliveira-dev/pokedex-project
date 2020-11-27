import {Request, Response} from 'express';

import User from '../entities/User';
import getPokemonsFromApi from '../services/getPokemonsFromApi';
import {getRepository} from 'typeorm';

class UserController {
  static async store(req: Request, res:Response) {
    const {email, password} = req.body;
    const userRepository = getRepository(User);

    const usersExists = await userRepository.findOne({where: {email}});

    if (usersExists) {
      return res.status(409).send({message: 'E-mail already registered'});
    }

    const pokemons = await getPokemonsFromApi();
    const user = userRepository.create({email, password, pokemons});
    await userRepository.save(user);

    return res.status(201).json(user);
  }

  static async index(req: Request, res: Response) {
    const userRepository = getRepository(User);
    const users = await userRepository.find();
    return res.json(users);
  }
}

export default UserController;
