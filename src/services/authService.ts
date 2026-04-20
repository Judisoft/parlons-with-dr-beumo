import { api } from './api'
import type { RegisterFormData, ApiResponse } from '@/types'

export interface BookingUser {
  id: string
  firstName: string
  lastName: string
  email: string
}

export const authService = {
  register: (data: RegisterFormData) =>
    api.post<ApiResponse<BookingUser>>('/bookings', data),
}
