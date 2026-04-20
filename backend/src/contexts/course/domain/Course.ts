export type CourseLevel = 'beginner' | 'intermediate' | 'advanced'

export interface CourseProps {
  id: string
  title: string
  level: CourseLevel
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

export class Course {
  private constructor(private readonly props: CourseProps) {}

  static fromPersistence(props: CourseProps): Course {
    return new Course(props)
  }

  get id()           { return this.props.id }
  get title()        { return this.props.title }
  get level()        { return this.props.level }
  get description()  { return this.props.description }
  get duration()     { return this.props.duration }
  get lessonCount()  { return this.props.lessonCount }
  get instructor()   { return this.props.instructor }
  get coverColor()   { return this.props.coverColor }
  get price()        { return this.props.price }
  get rating()       { return this.props.rating }
  get studentCount() { return this.props.studentCount }
  get tags()         { return this.props.tags }

  toJSON(): CourseProps {
    return { ...this.props }
  }
}
