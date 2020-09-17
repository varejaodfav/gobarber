import { Router } from 'express';
import { startOfHour, parseISO } from 'date-fns';

import AppointmentsRepository from '../repositories/Appointments.repo';

const appointmentsRouter = Router();

const appointmentsRepository = new AppointmentsRepository();

appointmentsRouter.get('/', (request, response) => {
  const appointments = appointmentsRepository.listAll();

  return response.json(appointments);
});

appointmentsRouter.post('/', (request, response) => {
  const { provider, date } = request.body;

  const parsedDate = startOfHour(parseISO(date));

  const appointmentAlreadyBooked = appointmentsRepository.findByDate(
    parsedDate,
  );

  // Verifica se já existe agendamento na data solicitada
  if (appointmentAlreadyBooked) {
    return response.status(400).json({
      error: {
        message: 'This appointment is already booked',
      },
    });
  }

  const appointment = appointmentsRepository.create({
    provider,
    date: parsedDate,
  });

  return response.json(appointment);
});

export default appointmentsRouter;
