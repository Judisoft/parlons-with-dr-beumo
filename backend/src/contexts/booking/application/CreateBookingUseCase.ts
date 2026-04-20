import { BookingRepository } from '../domain/BookingRepository'
import { Booking } from '../domain/Booking'
import { CreateBookingDTO } from './CreateBookingDTO'

export interface BookingUser {
  id: string
  firstName: string
  lastName: string
  email: string
}

export class CreateBookingUseCase {
  constructor(private readonly repo: BookingRepository) {}

  async execute(dto: CreateBookingDTO): Promise<BookingUser> {
    const booking = Booking.create(dto)
    await this.repo.save(booking)
    return {
      id:        booking.id,
      firstName: booking.firstName,
      lastName:  booking.lastName,
      email:     booking.email,
    }
  }
}
