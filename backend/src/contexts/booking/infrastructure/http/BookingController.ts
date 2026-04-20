import { Request, Response, NextFunction } from 'express'
import { createBookingSchema } from './bookingSchemas'
import { CreateBookingUseCase } from '../../application/CreateBookingUseCase'
import { sendSuccess, sendError } from '../../../../shared/http/ApiResponse'

export class BookingController {
  constructor(private readonly createBooking: CreateBookingUseCase) {}

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = createBookingSchema.safeParse(req.body)
      if (!result.success) {
        const message = result.error.errors.map(e => e.message).join(', ')
        sendError(res, 400, message)
        return
      }
      const bookingUser = await this.createBooking.execute(result.data)
      sendSuccess(res, 201, bookingUser, 'Session booked successfully')
    } catch (err) {
      next(err)
    }
  }
}
