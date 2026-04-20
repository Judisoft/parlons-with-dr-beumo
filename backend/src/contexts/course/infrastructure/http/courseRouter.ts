import { Router } from 'express'
import { pool } from '../../../../shared/infrastructure/mysql/MysqlConnection'
import { MysqlCourseRepository } from '../persistence/MysqlCourseRepository'
import { ListCoursesUseCase } from '../../application/ListCoursesUseCase'
import { GetCourseUseCase } from '../../application/GetCourseUseCase'
import { CourseController } from './CourseController'

const repo        = new MysqlCourseRepository(pool)
const listUseCase = new ListCoursesUseCase(repo)
const getUseCase  = new GetCourseUseCase(repo)
const controller  = new CourseController(listUseCase, getUseCase)

export const courseRouter = Router()
courseRouter.get('/',    (req, res, next) => controller.list(req, res, next))
courseRouter.get('/:id', (req, res, next) => controller.getById(req, res, next))
