import 'dotenv/config';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { getRepository } from 'typeorm';

import User from '../../models/User';

interface RequestDTO {
  email: string;
  password: string;
}

interface ResponseDTO {
  user: User;
  token: string;
}

class CreateSessionService {
  public async execute({ email, password }: RequestDTO): Promise<ResponseDTO> {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne({ where: { email } });

    if (!user) {
      throw new Error('Incorrect email/password combination');
    }

    const decryptedPassword = await compare(password, user.password);

    if (!decryptedPassword) {
      throw new Error('Incorrect email/password combination');
    }

    const token = sign({}, process.env.API_AUTH_KEY, {
      subject: user.id,
      expiresIn: process.env.API_AUTH_EXPIRES,
    });

    return { user, token };
  }
}

export default CreateSessionService;
