import { Clock, BookOpen, Star, Users } from 'lucide-react'
import Badge from '@/components/common/Badge'
import type { Course } from '@/types'

interface CourseCardProps {
  course: Course
}

export default function CourseCard({ course }: CourseCardProps) {
  return (
    <article className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden flex flex-col">
      {/* Cover */}
      <div
        className="h-36 flex items-center justify-center"
        style={{ backgroundColor: course.coverColor }}
      >
        <span className="text-5xl select-none">🇫🇷</span>
      </div>

      <div className="p-5 flex flex-col flex-1 gap-3">
        {/* Header */}
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-gray-900 leading-snug">{course.title}</h3>
          <Badge level={course.level} />
        </div>

        <p className="text-sm text-gray-500 line-clamp-2 flex-1">{course.description}</p>

        {/* Meta */}
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <Clock size={12} /> {course.duration}
          </span>
          <span className="flex items-center gap-1">
            <BookOpen size={12} /> {course.lessonCount} lessons
          </span>
          <span className="flex items-center gap-1">
            <Users size={12} /> {course.studentCount.toLocaleString()} students
          </span>
        </div>

        {/* Rating + price */}
        <div className="flex items-center justify-between pt-1 border-t border-gray-100">
          <span className="flex items-center gap-1 text-amber-500 text-sm font-medium">
            <Star size={14} fill="currentColor" /> {course.rating}
          </span>
          <span className="text-primary font-bold">${course.price}</span>
        </div>

        {/* Instructor */}
        <p className="text-xs text-gray-400">by {course.instructor}</p>

        <button className="btn-primary w-full text-sm mt-auto">Enroll Now</button>
      </div>
    </article>
  )
}
