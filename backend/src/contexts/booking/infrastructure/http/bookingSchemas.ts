import { z } from 'zod'

export const createBookingSchema = z.object({
  firstName:    z.string().trim().min(1, 'First name is required'),
  lastName:     z.string().trim().min(1, 'Last name is required'),
  email:        z.string().email('Invalid email address'),
  frenchLevel:  z.enum(['beginner', 'intermediate', 'advanced']),
  sessionGoal:  z.enum(['tef-prep', 'tcf-prep', 'delf-dalf-prep', 'general', 'conversation']),
  preferredDays: z
    .array(z.enum(['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']))
    .min(1, 'Select at least one day'),
  preferredTime: z.enum(['morning', 'afternoon', 'evening']),
})

export const updateStatusSchema = z.object({
  status: z.enum(['pending', 'confirmed', 'cancelled']),
})
