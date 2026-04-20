import { api } from './api'
import type { ApiResponse } from '@/types'

export type BookingStatus = 'pending' | 'confirmed' | 'cancelled'

export interface Booking {
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

export const bookingAdminService = {
  list:         ()                              => api.get<ApiResponse<Booking[]>>('/bookings'),
  getById:      (id: string)                   => api.get<ApiResponse<Booking>>(`/bookings/${id}`),
  updateStatus: (id: string, status: BookingStatus) =>
    api.patch<ApiResponse<Booking>>(`/bookings/${id}/status`, { status }),
  delete:       (id: string)                   => api.delete<ApiResponse<null>>(`/bookings/${id}`),
}
