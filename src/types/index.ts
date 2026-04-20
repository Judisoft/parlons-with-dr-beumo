export type Level = 'beginner' | 'intermediate' | 'advanced'
export type SessionGoal = 'tef-prep' | 'tcf-prep' | 'delf-dalf-prep' | 'general' | 'conversation'
export type PreferredTime = 'morning' | 'afternoon' | 'evening'

export interface Course {
  id: string
  title: string
  level: Level
  description: string
  duration: string
  lessonCount: number
  instructor: string
  coverColor: string
  price: number
  rating: number
  studentCount: number
  tags: string[]
}

export interface RegisterFormData {
  firstName: string
  lastName: string
  email: string
  frenchLevel: Level | ''
  sessionGoal: SessionGoal | ''
  preferredDays: string[]
  preferredTime: PreferredTime | ''
}

export interface ApiResponse<T> {
  data: T
  message: string
  success: boolean
}
