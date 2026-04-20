import { Course } from './Course'

export interface CourseRepository {
  findAll(): Promise<Course[]>
  findById(id: string): Promise<Course | null>
}
