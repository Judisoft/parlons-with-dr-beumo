import type { Level } from '@/types'

const LEVEL_STYLES: Record<Level, string> = {
  beginner:     'bg-emerald-100 text-emerald-700',
  intermediate: 'bg-amber-100 text-amber-700',
  advanced:     'bg-red-100 text-red-700',
}

interface BadgeProps {
  level: Level
}

export default function Badge({ level }: BadgeProps) {
  return (
    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${LEVEL_STYLES[level]}`}>
      {level}
    </span>
  )
}
