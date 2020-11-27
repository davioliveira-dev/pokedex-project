import {Request, Response} from 'express';

import User from '../entities/User';
import bcrypt from 'bcrypt';
import {getRepository} from 'typeorm';
import jwt from 'jsonwebtoken';

class AuthController {
  static async authenticate(req: Request, res: Response) {
    const userRepository = getRepository(User);
    const {email, password} = req.body;

    const user = await userRepository.findOne({where: {email}});

    if (!user) {
      return res.status(401).json({message: 'Unauthorized, user not found!'});
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({
        message: 'Unauthorized, password does not match',
      });
    }

    const token = jwt.sign(
        {user: user.id}, process.env.JWT_SECRET, {expiresIn: '1d'},
    );

    delete user.password;

    return res.json({
      user,
      token,
    });
  }
}

export default AuthController;
