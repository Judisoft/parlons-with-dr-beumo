import { Pool } from 'mysql2/promise'
import { Booking } from '../../domain/Booking'
import { BookingRepository } from '../../domain/BookingRepository'

export class MysqlBookingRepository implements BookingRepository {
  constructor(private readonly pool: Pool) {}

  async save(booking: Booking): Promise<void> {
    await this.pool.execute(
      `INSERT INTO bookings
         (id, first_name, last_name, email, french_level, session_goal, preferred_days, preferred_time, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        booking.id,
        booking.firstName,
        booking.lastName,
        booking.email,
        booking.frenchLevel,
        booking.sessionGoal,
        JSON.stringify(booking.preferredDays),
        booking.preferredTime,
        booking.createdAt,
      ],
    )
  }

  async findById(id: string): Promise<Booking | null> {
    const [rows] = await this.pool.execute<any[]>(
      'SELECT * FROM bookings WHERE id = ? LIMIT 1',
      [id],
    )
    if (!rows.length) return null
    const r = rows[0]
    return Booking.create({
      firstName:     r.first_name,
      lastName:      r.last_name,
      email:         r.email,
      frenchLevel:   r.french_level,
      sessionGoal:   r.session_goal,
      preferredDays: typeof r.preferred_days === 'string' ? JSON.parse(r.preferred_days) : r.preferred_days,
      preferredTime: r.preferred_time,
    })
  }
}
