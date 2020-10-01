import { Router } from 'express';

import CreateSession from '../services/sessions/CreateSessionService';

const sessionsRouter = Router();

// Criaçao de usuários
sessionsRouter.post('/', async (request, response) => {
  try {
    const { email, password } = request.body;
    const createSession = new CreateSession();

    const { user, token } = await createSession.execute({
      email,
      password,
    });

    delete user.password;

    return response.json({ user, token });
  } catch (error) {
    return response.status(400).json({
      error: {
        message: error.message,
      },
    });
  }
});

export default sessionsRouter;
