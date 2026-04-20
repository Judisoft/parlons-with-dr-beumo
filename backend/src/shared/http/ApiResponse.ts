import { Response } from 'express'

export function sendSuccess<T>(res: Response, status: number, data: T, message = 'OK'): void {
  res.status(status).json({ success: true, message, data })
}

export function sendError(res: Response, status: number, message: string): void {
  res.status(status).json({ message })
}
