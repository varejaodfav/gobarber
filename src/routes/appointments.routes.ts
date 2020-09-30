import { Router } from 'express';
import { parseISO } from 'date-fns';

import { getCustomRepository } from 'typeorm';
import Repository from '../repositories/Appointments.repo';
import CreateAppointment from '../services/appointments/CreateAppointment';

const appointmentsRouter = Router();

// Listagem de agendamentos
appointmentsRouter.get('/', async (request, response) => {
  const appointmentsRepository = getCustomRepository(Repository);
  const appointments = await appointmentsRepository.find();

  return response.json(appointments);
});

// Criaçao de agendamentos
appointmentsRouter.post('/', async (request, response) => {
  try {
    const { provider_id, date } = request.body;

    const parsedDate = parseISO(date);
    const createAppointment = new CreateAppointment();

    const appointment = await createAppointment.execute({
      provider_id,
      date: parsedDate,
    });

    return response.json(appointment);
  } catch (error) {
    return response.status(400).json({
      error: {
        message: error.message,
      },
    });
  }
});

export default appointmentsRouter;
