import { startOfHour } from 'date-fns';

import Appointment from '../../models/Appointment';
import Repository from '../../repositories/Appointments.repo';

// Data Object Transfer
interface RequestDTO {
  provider: string;
  date: Date;
}

class CreateAppointment {
  private appointmentsRepository: Repository;

  constructor(appointmentsRepository: Repository) {
    this.appointmentsRepository = appointmentsRepository;
  }

  public execute({ provider, date }: RequestDTO): Appointment {
    const appointmentDate = startOfHour(date);
    const appointmentAlreadyBooked = this.appointmentsRepository.findByDate(
      appointmentDate,
    );

    // Verifica se já existe agendamento na data solicitada
    if (appointmentAlreadyBooked) {
      throw Error('This appointment is already booked');
    }

    const appointment = this.appointmentsRepository.create({
      provider,
      date: appointmentDate,
    });

    return appointment;
  }
}

export default CreateAppointment;
