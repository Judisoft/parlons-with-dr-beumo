import type { Level } from '@/types'

type Filter = Level | 'all'

const FILTERS: { value: Filter; label: string }[] = [
  { value: 'all',          label: 'All Levels' },
  { value: 'beginner',     label: 'Beginner' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'advanced',     label: 'Advanced' },
]

interface CourseFiltersProps {
  active: Filter
  onChange: (filter: Filter) => void
}

export default function CourseFilters({ active, onChange }: CourseFiltersProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {FILTERS.map(({ value, label }) => (
        <button
          key={value}
          onClick={() => onChange(value)}
          className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors duration-150 ${
            active === value
              ? 'bg-primary text-white border-primary'
              : 'bg-white text-gray-600 border-gray-200 hover:border-primary hover:text-primary'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  )
}
