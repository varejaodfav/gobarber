import { Router } from 'express';
import { parseISO } from 'date-fns';

import Repository from '../repositories/Appointments.repo';
import CreateAppointment from '../services/appointments/CreateAppointment';

const appointmentsRouter = Router();

const appointmentsRepository = new Repository();

// Listagem de agendamentos
appointmentsRouter.get('/', (request, response) => {
  const appointments = appointmentsRepository.listAll();

  return response.json(appointments);
});

// Criaçao de agendamentos
appointmentsRouter.post('/', (request, response) => {
  try {
    const { provider, date } = request.body;

    const parsedDate = parseISO(date);
    const createAppointment = new CreateAppointment(appointmentsRepository);

    const appointment = createAppointment.execute({
      provider,
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
