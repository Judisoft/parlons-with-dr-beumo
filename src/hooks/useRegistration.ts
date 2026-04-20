import { useState } from 'react'
import type { RegisterFormData } from '@/types'
import { authService } from '@/services/authService'

type Status = 'idle' | 'loading' | 'success' | 'error'

export function useRegistration() {
  const [status, setStatus] = useState<Status>('idle')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  async function register(data: RegisterFormData) {
    setStatus('loading')
    setErrorMessage(null)
    try {
      await authService.register(data)
      setStatus('success')
    } catch (err) {
      setStatus('error')
      setErrorMessage(err instanceof Error ? err.message : 'Booking failed. Please try again.')
    }
  }

  return { register, status, errorMessage }
}
