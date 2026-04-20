import { Router } from 'express'
import { pool } from '../../../../shared/infrastructure/mysql/MysqlConnection'
import { MysqlBookingRepository } from '../persistence/MysqlBookingRepository'
import { CreateBookingUseCase } from '../../application/CreateBookingUseCase'
import { ListBookingsUseCase } from '../../application/ListBookingsUseCase'
import { GetBookingByIdUseCase } from '../../application/GetBookingByIdUseCase'
import { DeleteBookingUseCase } from '../../application/DeleteBookingUseCase'
import { UpdateBookingStatusUseCase } from '../../application/UpdateBookingStatusUseCase'
import { BookingController } from './BookingController'

const repo = new MysqlBookingRepository(pool)

const controller = new BookingController(
  new CreateBookingUseCase(repo),
  new ListBookingsUseCase(repo),
  new GetBookingByIdUseCase(repo),
  new DeleteBookingUseCase(repo),
  new UpdateBookingStatusUseCase(repo),
)

export const bookingRouter = Router()
bookingRouter.post('/',             (req, res, next) => controller.create(req, res, next))
bookingRouter.get('/',              (req, res, next) => controller.list(req, res, next))
bookingRouter.get('/:id',           (req, res, next) => controller.getById(req, res, next))
bookingRouter.patch('/:id/status',  (req, res, next) => controller.updateStatus(req, res, next))
bookingRouter.delete('/:id',        (req, res, next) => controller.delete(req, res, next))
