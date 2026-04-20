import { useState } from 'react'
import CourseCard from '@/components/courses/CourseCard'
import CourseFilters from '@/components/courses/CourseFilters'
import { COURSES } from '@/data/courses'
import type { Level } from '@/types'

type Filter = Level | 'all'

export default function CoursesPage() {
  const [activeFilter, setActiveFilter] = useState<Filter>('all')

  const filtered = activeFilter === 'all'
    ? COURSES
    : COURSES.filter((c) => c.level === activeFilter)

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      {/* Page header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900">French Courses</h1>
        <p className="text-gray-500 mt-1">
          {COURSES.length} courses · from beginner to advanced
        </p>
      </div>

      {/* Filters */}
      <div className="mb-8">
        <CourseFilters active={activeFilter} onChange={setActiveFilter} />
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-gray-400">
          <p className="text-5xl mb-4">📚</p>
          <p className="text-lg font-medium">No courses found for this level.</p>
        </div>
      )}
    </div>
  )
}
