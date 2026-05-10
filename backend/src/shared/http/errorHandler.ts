import { Request, Response, NextFunction } from 'express'

export function errorHandler(err: unknown, _req: Request, res: Response, _next: NextFunction): void {
  console.error(err)
  const isProd = process.env.NODE_ENV === 'production'
  const message = isProd
    ? 'Something went wrong. Please try again later.'
    : err instanceof Error ? err.message : 'Internal server error'
  res.status(500).json({ message })
}
