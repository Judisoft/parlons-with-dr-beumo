import { CourseRepository } from '../domain/CourseRepository'
import { CourseProps } from '../domain/Course'

export class GetCourseUseCase {
  constructor(private readonly repo: CourseRepository) {}

  async execute(id: string): Promise<CourseProps> {
    const course = await this.repo.findById(id)
    if (!course) throw new Error(`Course not found: ${id}`)
    return course.toJSON()
  }
}
