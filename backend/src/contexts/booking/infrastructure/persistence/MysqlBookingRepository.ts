import { Pool, RowDataPacket } from 'mysql2/promise'
import { Booking, BookingStatus } from '../../domain/Booking'
import { BookingRepository } from '../../domain/BookingRepository'

interface BookingRow extends RowDataPacket {
  id: string
  first_name: string
  last_name: string
  email: string
  french_level: string
  session_goal: string
  preferred_days: string
  preferred_time: string
  status: BookingStatus
  created_at: Date
}

export class MysqlBookingRepository implements BookingRepository {
  constructor(private readonly pool: Pool) {}

  async save(booking: Booking): Promise<void> {
    await this.pool.execute(
      `INSERT INTO bookings
         (id, first_name, last_name, email, french_level, session_goal, preferred_days, preferred_time, status, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        booking.id,
        booking.firstName,
        booking.lastName,
        booking.email,
        booking.frenchLevel,
        booking.sessionGoal,
        JSON.stringify(booking.preferredDays),
        booking.preferredTime,
        booking.status,
        booking.createdAt,
      ],
    )
  }

  async findAll(): Promise<Booking[]> {
    const [rows] = await this.pool.execute<BookingRow[]>(
      'SELECT * FROM bookings ORDER BY created_at DESC',
    )
    return rows.map(this.rowToBooking)
  }

  async findById(id: string): Promise<Booking | null> {
    const [rows] = await this.pool.execute<BookingRow[]>(
      'SELECT * FROM bookings WHERE id = ? LIMIT 1',
      [id],
    )
    if (!rows.length) return null
    return this.rowToBooking(rows[0])
  }

  async updateStatus(id: string, status: BookingStatus): Promise<void> {
    await this.pool.execute(
      'UPDATE bookings SET status = ? WHERE id = ?',
      [status, id],
    )
  }

  async delete(id: string): Promise<void> {
    await this.pool.execute('DELETE FROM bookings WHERE id = ?', [id])
  }

  private rowToBooking(r: BookingRow): Booking {
    return Booking.reconstitute({
      id:            r.id,
      firstName:     r.first_name,
      lastName:      r.last_name,
      email:         r.email,
      frenchLevel:   r.french_level,
      sessionGoal:   r.session_goal,
      preferredDays: typeof r.preferred_days === 'string' ? JSON.parse(r.preferred_days) : r.preferred_days,
      preferredTime: r.preferred_time,
      status:        r.status ?? 'pending',
      createdAt:     new Date(r.created_at),
    })
  }
}
