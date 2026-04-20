import { Booking, BookingStatus } from './Booking'

export interface BookingRepository {
  save(booking: Booking): Promise<void>
  findAll(): Promise<Booking[]>
  findById(id: string): Promise<Booking | null>
  updateStatus(id: string, status: BookingStatus): Promise<void>
  delete(id: string): Promise<void>
}
