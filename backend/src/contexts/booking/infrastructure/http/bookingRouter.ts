import { Router } from 'express'
import { pool } from '../../../../shared/infrastructure/mysql/MysqlConnection'
import { MysqlBookingRepository } from '../persistence/MysqlBookingRepository'
import { CreateBookingUseCase } from '../../application/CreateBookingUseCase'
import { BookingController } from './BookingController'

const repo       = new MysqlBookingRepository(pool)
const useCase    = new CreateBookingUseCase(repo)
const controller = new BookingController(useCase)

export const bookingRouter = Router()
bookingRouter.post('/', (req, res, next) => controller.create(req, res, next))
