import { BookingRepository } from '../domain/BookingRepository'

export class DeleteBookingUseCase {
  constructor(private readonly repo: BookingRepository) {}

  async execute(id: string): Promise<void> {
    const booking = await this.repo.findById(id)
    if (!booking) throw new Error(`Booking not found: ${id}`)
    await this.repo.delete(id)
  }
}
