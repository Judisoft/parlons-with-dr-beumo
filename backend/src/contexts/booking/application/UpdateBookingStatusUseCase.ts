import { BookingRepository, } from '../domain/BookingRepository'
import { BookingPlainObject, BookingStatus } from '../domain/Booking'

export class UpdateBookingStatusUseCase {
  constructor(private readonly repo: BookingRepository) {}

  async execute(id: string, status: BookingStatus): Promise<BookingPlainObject> {
    const booking = await this.repo.findById(id)
    if (!booking) throw new Error(`Booking not found: ${id}`)
    await this.repo.updateStatus(id, status)
    return booking.withStatus(status).toPlainObject()
  }
}
