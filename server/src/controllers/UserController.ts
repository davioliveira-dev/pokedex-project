import {Request, Response} from 'express';
import {getRepository} from 'typeorm';
import User from '../entities/User';

class UserController {
  static async store(req: Request, res:Response) {
    const userRepository = getRepository(User);

    const {email, password} = req.body;

    const usersExists = await userRepository.findOne({where: {email}});

    if (usersExists) {
      return res.status(409).send({message: 'E-mail already registered'});
    }

    const user = userRepository.create({email, password});
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
