import { Pool, RowDataPacket } from 'mysql2/promise'
import { Course, CourseLevel } from '../../domain/Course'
import { CourseRepository } from '../../domain/CourseRepository'

interface CourseRow extends RowDataPacket {
  id: string
  title: string
  level: CourseLevel
  description: string
  duration: string
  lesson_count: number
  instructor: string
  cover_color: string
  price: string
  rating: string
  student_count: number
  tags: string
}

export class MysqlCourseRepository implements CourseRepository {
  constructor(private readonly pool: Pool) {}

  async findAll(): Promise<Course[]> {
    const [rows] = await this.pool.execute<CourseRow[]>('SELECT * FROM courses ORDER BY level, id')
    return rows.map(this.rowToCourse)
  }

  async findById(id: string): Promise<Course | null> {
    const [rows] = await this.pool.execute<CourseRow[]>('SELECT * FROM courses WHERE id = ? LIMIT 1', [id])
    if (!rows.length) return null
    return this.rowToCourse(rows[0])
  }

  private rowToCourse(r: CourseRow): Course {
    return Course.fromPersistence({
      id:           r.id,
      title:        r.title,
      level:        r.level,
      description:  r.description,
      duration:     r.duration,
      lessonCount:  r.lesson_count,
      instructor:   r.instructor,
      coverColor:   r.cover_color,
      price:        Number(r.price),
      rating:       Number(r.rating),
      studentCount: r.student_count,
      tags:         typeof r.tags === 'string' ? JSON.parse(r.tags) : r.tags,
    })
  }
}
