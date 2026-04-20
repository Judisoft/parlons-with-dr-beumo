import { Request, Response, NextFunction } from 'express'
import { createBookingSchema, updateStatusSchema } from './bookingSchemas'
import { CreateBookingUseCase } from '../../application/CreateBookingUseCase'
import { ListBookingsUseCase } from '../../application/ListBookingsUseCase'
import { GetBookingByIdUseCase } from '../../application/GetBookingByIdUseCase'
import { DeleteBookingUseCase } from '../../application/DeleteBookingUseCase'
import { UpdateBookingStatusUseCase } from '../../application/UpdateBookingStatusUseCase'
import { sendSuccess, sendError } from '../../../../shared/http/ApiResponse'

export class BookingController {
  constructor(
    private readonly createBooking: CreateBookingUseCase,
    private readonly listBookings: ListBookingsUseCase,
    private readonly getBookingById: GetBookingByIdUseCase,
    private readonly deleteBooking: DeleteBookingUseCase,
    private readonly updateBookingStatus: UpdateBookingStatusUseCase,
  ) {}

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = createBookingSchema.safeParse(req.body)
      if (!result.success) {
        sendError(res, 400, result.error.errors.map(e => e.message).join(', '))
        return
      }
      const bookingUser = await this.createBooking.execute(result.data)
      sendSuccess(res, 201, bookingUser, 'Session booked successfully')
    } catch (err) { next(err) }
  }

  async list(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const bookings = await this.listBookings.execute()
      sendSuccess(res, 200, bookings, 'Bookings retrieved successfully')
    } catch (err) { next(err) }
  }

  async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const booking = await this.getBookingById.execute(req.params.id)
      sendSuccess(res, 200, booking, 'Booking retrieved successfully')
    } catch (err) {
      if (err instanceof Error && err.message.startsWith('Booking not found')) {
        sendError(res, 404, err.message); return
      }
      next(err)
    }
  }

  async updateStatus(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = updateStatusSchema.safeParse(req.body)
      if (!result.success) {
        sendError(res, 400, result.error.errors.map(e => e.message).join(', '))
        return
      }
      const booking = await this.updateBookingStatus.execute(req.params.id, result.data.status)
      sendSuccess(res, 200, booking, 'Status updated successfully')
    } catch (err) {
      if (err instanceof Error && err.message.startsWith('Booking not found')) {
        sendError(res, 404, err.message); return
      }
      next(err)
    }
  }

  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      await this.deleteBooking.execute(req.params.id)
      sendSuccess(res, 200, null, 'Booking deleted successfully')
    } catch (err) {
      if (err instanceof Error && err.message.startsWith('Booking not found')) {
        sendError(res, 404, err.message); return
      }
      next(err)
    }
  }
}
