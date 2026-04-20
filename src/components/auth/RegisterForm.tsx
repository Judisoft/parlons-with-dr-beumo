import { useForm } from 'react-hook-form'
import { CheckCircle, Loader2 } from 'lucide-react'
import type { RegisterFormData } from '@/types'
import { useRegistration } from '@/hooks/useRegistration'

const LEVEL_OPTIONS = [
  { value: 'beginner',     label: 'Beginner — I\'m just starting out' },
  { value: 'intermediate', label: 'Intermediate — I know the basics' },
  { value: 'advanced',     label: 'Advanced — I\'m nearly fluent' },
]

const GOAL_OPTIONS = [
  { value: 'tef-prep',       label: 'TEF Canada Preparation' },
  { value: 'tcf-prep',       label: 'TCF Preparation' },
  { value: 'delf-dalf-prep', label: 'DELF / DALF Preparation' },
  { value: 'general',        label: 'General French Learning' },
  { value: 'conversation',   label: 'Conversation Practice' },
]

const DAYS = [
  { value: 'monday',    label: 'Mon' },
  { value: 'tuesday',   label: 'Tue' },
  { value: 'wednesday', label: 'Wed' },
  { value: 'thursday',  label: 'Thu' },
  { value: 'friday',    label: 'Fri' },
  { value: 'saturday',  label: 'Sat' },
]

const TIME_SLOTS = [
  { value: 'morning',   label: 'Morning',   hours: '8 am – 12 pm' },
  { value: 'afternoon', label: 'Afternoon', hours: '12 pm – 5 pm' },
  { value: 'evening',   label: 'Evening',   hours: '5 pm – 8 pm' },
]

export default function RegisterForm() {
  const { register: submitBooking, status, errorMessage } = useRegistration()

  const {
    register: field,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<RegisterFormData>({
    mode: 'onTouched',
    defaultValues: { preferredDays: [], preferredTime: '', sessionGoal: '' },
  })

  const preferredDays = watch('preferredDays') ?? []
  const preferredTime = watch('preferredTime')

  function toggleDay(day: string) {
    const current = getValues('preferredDays') ?? []
    setValue(
      'preferredDays',
      current.includes(day) ? current.filter((d: string) => d !== day) : [...current, day],
      { shouldValidate: true },
    )
  }

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center gap-4 py-12 text-center">
        <CheckCircle size={56} className="text-primary" strokeWidth={1.5} />
        <h2 className="text-2xl font-bold text-gray-900">Session booked!</h2>
        <p className="text-gray-500 max-w-sm">
          Dr. Beumo Lesly will contact you shortly to confirm your session time.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(submitBooking)} noValidate className="flex flex-col gap-5">
      {/* Name row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="form-label" htmlFor="firstName">First name</label>
          <input
            id="firstName"
            type="text"
            placeholder="Jean"
            className={`form-input ${errors.firstName ? 'border-red-400' : ''}`}
            {...field('firstName', { required: 'First name is required' })}
          />
          {errors.firstName && <p className="form-error">{errors.firstName.message}</p>}
        </div>
        <div>
          <label className="form-label" htmlFor="lastName">Last name</label>
          <input
            id="lastName"
            type="text"
            placeholder="Dupont"
            className={`form-input ${errors.lastName ? 'border-red-400' : ''}`}
            {...field('lastName', { required: 'Last name is required' })}
          />
          {errors.lastName && <p className="form-error">{errors.lastName.message}</p>}
        </div>
      </div>

      {/* Email */}
      <div>
        <label className="form-label" htmlFor="email">Email address</label>
        <input
          id="email"
          type="email"
          placeholder="you@example.com"
          className={`form-input ${errors.email ? 'border-red-400' : ''}`}
          {...field('email', {
            required: 'Email is required',
            pattern: { value: /^\S+@\S+\.\S+$/, message: 'Enter a valid email' },
          })}
        />
        {errors.email && <p className="form-error">{errors.email.message}</p>}
      </div>

      {/* French level */}
      <div>
        <label className="form-label" htmlFor="frenchLevel">Current French level</label>
        <select
          id="frenchLevel"
          className={`form-input bg-white ${errors.frenchLevel ? 'border-red-400' : ''}`}
          {...field('frenchLevel', { required: 'Please select your level' })}
        >
          <option value="">Select your level…</option>
          {LEVEL_OPTIONS.map(({ value, label }) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
        {errors.frenchLevel && <p className="form-error">{errors.frenchLevel.message}</p>}
      </div>

      {/* Session goal */}
      <div>
        <label className="form-label" htmlFor="sessionGoal">What's your goal?</label>
        <select
          id="sessionGoal"
          className={`form-input bg-white ${errors.sessionGoal ? 'border-red-400' : ''}`}
          {...field('sessionGoal', { required: 'Please select a goal' })}
        >
          <option value="">Select a goal…</option>
          {GOAL_OPTIONS.map(({ value, label }) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
        {errors.sessionGoal && <p className="form-error">{errors.sessionGoal.message}</p>}
      </div>

      {/* Preferred days */}
      <div>
        <label className="form-label">Preferred days</label>
        <input type="hidden" {...field('preferredDays', {
          validate: v => (Array.isArray(v) && v.length > 0) || 'Select at least one day',
        })} />
        <div className="flex gap-2 flex-wrap">
          {DAYS.map(({ value, label }) => (
            <button
              key={value}
              type="button"
              onClick={() => toggleDay(value)}
              className={`px-3 py-2 rounded-lg text-sm font-medium border transition-colors ${
                preferredDays.includes(value)
                  ? 'bg-accent text-white border-accent'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-accent/50'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        {errors.preferredDays && <p className="form-error">{errors.preferredDays.message}</p>}
      </div>

      {/* Preferred time */}
      <div>
        <label className="form-label">Preferred time</label>
        <div className="grid grid-cols-3 gap-3">
          {TIME_SLOTS.map(({ value, label, hours }) => (
            <label
              key={value}
              className={`flex flex-col items-center gap-1 p-3 rounded-xl border cursor-pointer transition-colors ${
                preferredTime === value
                  ? 'border-accent bg-accent/5 text-accent'
                  : 'border-gray-200 text-gray-600 hover:border-accent/40'
              }`}
            >
              <input
                type="radio"
                value={value}
                className="sr-only"
                {...field('preferredTime', { required: 'Please select a time' })}
              />
              <span className="text-sm font-semibold">{label}</span>
              <span className="text-xs text-gray-400">{hours}</span>
            </label>
          ))}
        </div>
        {errors.preferredTime && <p className="form-error">{errors.preferredTime.message}</p>}
      </div>

      {/* API error */}
      {errorMessage && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="btn-primary flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === 'loading' && <Loader2 size={16} className="animate-spin" />}
        {status === 'loading' ? 'Booking…' : 'Book Session'}
      </button>
    </form>
  )
}
