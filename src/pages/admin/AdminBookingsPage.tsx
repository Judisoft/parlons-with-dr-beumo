import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { bookingAdminService, Booking } from '@/services/bookingAdminService'
import { Calendar, ChevronRight, Loader2 } from 'lucide-react'

const GOAL_LABELS: Record<string, string> = {
  'tef-prep':      'TEF Canada',
  'tcf-prep':      'TCF',
  'delf-dalf-prep': 'DELF / DALF',
  'general':       'General French',
  'conversation':  'Conversation',
}

const LEVEL_LABELS: Record<string, string> = {
  beginner:     'Beginner',
  intermediate: 'Intermediate',
  advanced:     'Advanced',
}

function StatusBadge({ status }: { status: Booking['status'] }) {
  const styles = {
    pending:   'bg-amber-50 text-amber-700 border-amber-200',
    confirmed: 'bg-green-50 text-green-700 border-green-200',
    cancelled: 'bg-red-50 text-red-600 border-red-200',
  }
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles[status]}`}>
      {(status ?? 'pending').charAt(0).toUpperCase() + (status ?? 'pending').slice(1)}
    </span>
  )
}

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime()
  const mins  = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days  = Math.floor(diff / 86400000)
  if (mins < 1)   return 'just now'
  if (mins < 60)  return `${mins}m ago`
  if (hours < 24) return `${hours}h ago`
  if (days < 7)   return `${days}d ago`
  return new Date(iso).toLocaleDateString()
}

function initials(b: Booking) {
  return (b.firstName[0] + b.lastName[0]).toUpperCase()
}

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading]   = useState(true)
  const [error, setError]       = useState<string | null>(null)

  useEffect(() => {
    bookingAdminService.list()
      .then(res => setBookings(res.data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Bookings</h1>
            {!loading && !error && (
              <p className="text-sm text-gray-500 mt-0.5">{bookings.length} total</p>
            )}
          </div>
          <img src="/parlons_logo.svg" alt="Parlons" className="h-16 w-auto" style={{ mixBlendMode: "multiply" }} />
        </div>

        {loading && (
          <div className="flex justify-center py-20">
            <Loader2 size={28} className="animate-spin text-primary" />
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-5 py-4 text-sm">
            {error}
          </div>
        )}

        {!loading && !error && bookings.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center gap-3">
            <Calendar size={40} className="text-gray-300" />
            <p className="text-gray-500 font-medium">No bookings yet</p>
          </div>
        )}

        {!loading && !error && bookings.length > 0 && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            {/* Desktop table */}
            <table className="w-full hidden sm:table">
              <thead>
                <tr className="border-b border-gray-100 text-left">
                  <th className="px-6 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">Student</th>
                  <th className="px-4 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">Goal</th>
                  <th className="px-4 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">Level</th>
                  <th className="px-4 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">Status</th>
                  <th className="px-4 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">Booked</th>
                  <th className="px-4 py-3.5" />
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {bookings.map(b => (
                  <tr key={b.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-primary-100 text-primary text-sm font-bold flex items-center justify-center flex-shrink-0">
                          {initials(b)}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900">{b.firstName} {b.lastName}</p>
                          <p className="text-xs text-gray-400">{b.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-600">{GOAL_LABELS[b.sessionGoal] ?? b.sessionGoal}</td>
                    <td className="px-4 py-4 text-sm text-gray-600">{LEVEL_LABELS[b.frenchLevel] ?? b.frenchLevel}</td>
                    <td className="px-4 py-4"><StatusBadge status={b.status} /></td>
                    <td className="px-4 py-4 text-sm text-gray-400">{timeAgo(b.createdAt)}</td>
                    <td className="px-4 py-4 text-right">
                      <Link
                        to={`/admin/booking/${b.id}`}
                        className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary-600"
                      >
                        View <ChevronRight size={14} />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Mobile card list */}
            <div className="sm:hidden divide-y divide-gray-100">
              {bookings.map(b => (
                <Link key={b.id} to={`/admin/booking/${b.id}`} className="flex items-center gap-3 px-4 py-4 hover:bg-gray-50">
                  <div className="w-10 h-10 rounded-full bg-primary-100 text-primary text-sm font-bold flex items-center justify-center flex-shrink-0">
                    {initials(b)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 truncate">{b.firstName} {b.lastName}</p>
                    <p className="text-xs text-gray-400 truncate">{GOAL_LABELS[b.sessionGoal]} · {timeAgo(b.createdAt)}</p>
                  </div>
                  <StatusBadge status={b.status} />
                  <ChevronRight size={16} className="text-gray-300 flex-shrink-0" />
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
