import { v4 as uuidv4 } from 'uuid'
import { Email } from './value-objects/Email'
import { Level } from './value-objects/Level'
import { SessionGoal } from './value-objects/SessionGoal'
import { PreferredTime } from './value-objects/PreferredTime'

export type BookingStatus = 'pending' | 'confirmed' | 'cancelled'

interface BookingProps {
  id: string
  firstName: string
  lastName: string
  email: Email
  frenchLevel: Level
  sessionGoal: SessionGoal
  preferredDays: string[]
  preferredTime: PreferredTime
  status: BookingStatus
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

export interface BookingPlainObject {
  id: string
  firstName: string
  lastName: string
  email: string
  frenchLevel: string
  sessionGoal: string
  preferredDays: string[]
  preferredTime: string
  status: BookingStatus
  createdAt: string
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
      status:        'pending',
      createdAt:     new Date(),
    })
  }

  static reconstitute(raw: {
    id: string
    firstName: string
    lastName: string
    email: string
    frenchLevel: string
    sessionGoal: string
    preferredDays: string[]
    preferredTime: string
    status: BookingStatus
    createdAt: Date
  }): Booking {
    return new Booking({
      id:            raw.id,
      firstName:     raw.firstName,
      lastName:      raw.lastName,
      email:         Email.create(raw.email),
      frenchLevel:   Level.create(raw.frenchLevel),
      sessionGoal:   SessionGoal.create(raw.sessionGoal),
      preferredDays: raw.preferredDays,
      preferredTime: PreferredTime.create(raw.preferredTime),
      status:        raw.status,
      createdAt:     raw.createdAt,
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
  get status()        { return this.props.status }
  get createdAt()     { return this.props.createdAt }

  withStatus(status: BookingStatus): Booking {
    return new Booking({ ...this.props, status })
  }

  toPlainObject(): BookingPlainObject {
    return {
      id:            this.props.id,
      firstName:     this.props.firstName,
      lastName:      this.props.lastName,
      email:         this.email,
      frenchLevel:   this.frenchLevel,
      sessionGoal:   this.sessionGoal,
      preferredDays: this.props.preferredDays,
      preferredTime: this.preferredTime,
      status:        this.props.status,
      createdAt:     this.props.createdAt.toISOString(),
    }
  }
}
