import {Request, Response} from 'express';
import {getRepository} from 'typeorm';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../entities/User';

class AuthController {
  static async authenticate(req: Request, res: Response) {
    const userRepository = getRepository(User);
    const {email, password} = req.body;

    const user = await userRepository.findOne({where: {email}});

    if (!user) {
      return res.status(401).json({message: 'Unauthorized, user not found!'});
    }

    const isValidPasssword = await bcrypt.compare(password, user.password);

    if (!isValidPasssword) {
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
