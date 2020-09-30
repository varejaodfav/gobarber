import { Router } from 'express';

import CreateUser from '../services/users/CreateUserService';

const usersRouter = Router();

// Criaçao de usuários
usersRouter.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body;
    const createUser = new CreateUser();

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    delete user.password;

    return response.json(user);
  } catch (error) {
    return response.status(400).json({
      error: {
        message: error.message,
      },
    });
  }
});

export default usersRouter;
