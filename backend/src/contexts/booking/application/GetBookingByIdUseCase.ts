import { BookingRepository } from '../domain/BookingRepository'
import { BookingPlainObject } from '../domain/Booking'

export class GetBookingByIdUseCase {
  constructor(private readonly repo: BookingRepository) {}

  async execute(id: string): Promise<BookingPlainObject> {
    const booking = await this.repo.findById(id)
    if (!booking) throw new Error(`Booking not found: ${id}`)
    return booking.toPlainObject()
  }
}
