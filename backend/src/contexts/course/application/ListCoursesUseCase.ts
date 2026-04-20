import { CourseRepository } from '../domain/CourseRepository'
import { CourseProps } from '../domain/Course'

export class ListCoursesUseCase {
  constructor(private readonly repo: CourseRepository) {}

  async execute(): Promise<CourseProps[]> {
    const courses = await this.repo.findAll()
    return courses.map(c => c.toJSON())
  }
}
