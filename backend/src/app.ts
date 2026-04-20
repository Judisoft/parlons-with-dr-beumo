import express from 'express'
import { bookingRouter } from './contexts/booking/infrastructure/http/bookingRouter'
import { courseRouter } from './contexts/course/infrastructure/http/courseRouter'
import { errorHandler } from './shared/http/errorHandler'

export function createApp() {
  const app = express()
  app.use(express.json())

  app.use('/api/v1/bookings', bookingRouter)
  app.use('/api/v1/courses', courseRouter)

  app.use(errorHandler)
  return app
}
