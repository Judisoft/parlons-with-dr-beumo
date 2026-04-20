import { BookingRepository } from '../domain/BookingRepository'
import { BookingPlainObject } from '../domain/Booking'

export class ListBookingsUseCase {
  constructor(private readonly repo: BookingRepository) {}

  async execute(): Promise<BookingPlainObject[]> {
    const bookings = await this.repo.findAll()
    return bookings.map(b => b.toPlainObject())
  }
}
