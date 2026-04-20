import { Request, Response, NextFunction } from 'express'
import { ListCoursesUseCase } from '../../application/ListCoursesUseCase'
import { GetCourseUseCase } from '../../application/GetCourseUseCase'
import { sendSuccess, sendError } from '../../../../shared/http/ApiResponse'

export class CourseController {
  constructor(
    private readonly listCourses: ListCoursesUseCase,
    private readonly getCourse: GetCourseUseCase,
  ) {}

  async list(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const courses = await this.listCourses.execute()
      sendSuccess(res, 200, courses, 'Courses retrieved successfully')
    } catch (err) {
      next(err)
    }
  }

  async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const course = await this.getCourse.execute(req.params.id)
      sendSuccess(res, 200, course, 'Course retrieved successfully')
    } catch (err) {
      if (err instanceof Error && err.message.startsWith('Course not found')) {
        sendError(res, 404, err.message)
        return
      }
      next(err)
    }
  }
}
