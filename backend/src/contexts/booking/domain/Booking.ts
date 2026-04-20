import { v4 as uuidv4 } from 'uuid'
import { Email } from './value-objects/Email'
import { Level } from './value-objects/Level'
import { SessionGoal } from './value-objects/SessionGoal'
import { PreferredTime } from './value-objects/PreferredTime'

interface BookingProps {
  id: string
  firstName: string
  lastName: string
  email: Email
  frenchLevel: Level
  sessionGoal: SessionGoal
  preferredDays: string[]
  preferredTime: PreferredTime
  createdAt: Date
}

export interface CreateBookingInput {
  firstName: string
  lastName: string
  email: string
  frenchLevel: string
  sessionGoal: string
  preferredDays: string[]
  preferredTime: string
}

export class Booking {
  private constructor(private readonly props: BookingProps) {}

  static create(input: CreateBookingInput): Booking {
    return new Booking({
      id:            uuidv4(),
      firstName:     input.firstName.trim(),
      lastName:      input.lastName.trim(),
      email:         Email.create(input.email),
      frenchLevel:   Level.create(input.frenchLevel),
      sessionGoal:   SessionGoal.create(input.sessionGoal),
      preferredDays: input.preferredDays,
      preferredTime: PreferredTime.create(input.preferredTime),
      createdAt:     new Date(),
    })
  }

  get id()            { return this.props.id }
  get firstName()     { return this.props.firstName }
  get lastName()      { return this.props.lastName }
  get email()         { return this.props.email.toString() }
  get frenchLevel()   { return this.props.frenchLevel.toString() }
  get sessionGoal()   { return this.props.sessionGoal.toString() }
  get preferredDays() { return this.props.preferredDays }
  get preferredTime() { return this.props.preferredTime.toString() }
  get createdAt()     { return this.props.createdAt }
}
