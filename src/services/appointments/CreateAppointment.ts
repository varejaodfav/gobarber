import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import Appointment from '../../models/Appointment';
import Repository from '../../repositories/Appointments.repo';

// Data Object Transfer
interface RequestDTO {
  provider_id: string;
  date: Date;
}

class CreateAppointment {
  public async execute({
    provider_id,
    date,
  }: RequestDTO): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(Repository);

    const appointmentDate = startOfHour(date);
    const appointmentAlreadyBooked = await appointmentsRepository.findByDate(
      appointmentDate,
    );

    // Verifica se já existe agendamento na data solicitada
    if (appointmentAlreadyBooked) {
      throw Error('This appointment is already booked');
    }

    const appointment = appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    });

    await appointmentsRepository.save(appointment);

    return appointment;
  }
}

export default CreateAppointment;
