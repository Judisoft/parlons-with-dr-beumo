import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { bookingAdminService, Booking, BookingStatus } from '@/services/bookingAdminService'
import { ArrowLeft, Loader2, Mail, Trash2 } from 'lucide-react'

const GOAL_LABELS: Record<string, string> = {
  'tef-prep':       'TEF Canada',
  'tcf-prep':       'TCF',
  'delf-dalf-prep': 'DELF / DALF',
  'general':        'General French',
  'conversation':   'Conversation Practice',
}

const LEVEL_LABELS: Record<string, string> = {
  beginner:     'Beginner',
  intermediate: 'Intermediate',
  advanced:     'Advanced',
}

const TIME_LABELS: Record<string, string> = {
  morning:   'Morning (8 am – 12 pm)',
  afternoon: 'Afternoon (12 pm – 5 pm)',
  evening:   'Evening (5 pm – 8 pm)',
}

function StatusBadge({ status }: { status: BookingStatus }) {
  const styles = {
    pending:   'bg-amber-50 text-amber-700 border-amber-200',
    confirmed: 'bg-green-50 text-green-700 border-green-200',
    cancelled: 'bg-red-50 text-red-600 border-red-200',
  }
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${styles[status]}`}>
      {(status ?? 'pending').charAt(0).toUpperCase() + (status ?? 'pending').slice(1)}
    </span>
  )
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">{label}</dt>
      <dd className="text-sm text-gray-900">{value}</dd>
    </div>
  )
}

export default function AdminBookingDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const [booking, setBooking]           = useState<Booking | null>(null)
  const [loading, setLoading]           = useState(true)
  const [error, setError]               = useState<string | null>(null)
  const [selectedStatus, setSelectedStatus] = useState<BookingStatus>('pending')
  const [updating, setUpdating]         = useState(false)
  const [deleting, setDeleting]         = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)

  useEffect(() => {
    if (!id) return
    bookingAdminService.getById(id)
      .then(res => {
        setBooking(res.data)
        setSelectedStatus(res.data.status)
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [id])

  async function handleUpdateStatus() {
    if (!booking) return
    setUpdating(true)
    try {
      const res = await bookingAdminService.updateStatus(booking.id, selectedStatus)
      setBooking(res.data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Update failed')
    } finally {
      setUpdating(false)
    }
  }

  async function handleDelete() {
    if (!booking) return
    setDeleting(true)
    try {
      await bookingAdminService.delete(booking.id)
      navigate('/admin/booking')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Delete failed')
      setDeleting(false)
    }
  }

  if (loading) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <Loader2 size={28} className="animate-spin text-primary" />
    </div>
  )

  if (error || !booking) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center">
        <p className="text-red-600 text-sm mb-4">{error ?? 'Booking not found'}</p>
        <Link to="/admin/booking" className="text-primary text-sm font-medium hover:underline">← Back to bookings</Link>
      </div>
    </div>
  )

  const initials = (booking.firstName[0] + booking.lastName[0]).toUpperCase()

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link to="/admin/booking" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 font-medium">
            <ArrowLeft size={15} /> Back to bookings
          </Link>
          <img src="/parlons_logo.svg" alt="Parlons" className="h-16 w-auto" style={{ mixBlendMode: "multiply" }} />
        </div>

        {/* Identity card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-5">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-full bg-primary-100 text-primary text-xl font-bold flex items-center justify-center flex-shrink-0">
              {initials}
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">{booking.firstName} {booking.lastName}</h1>
              <div className="flex items-center gap-2">
                <p className="text-sm text-gray-500">{booking.email}</p>
                <a
                  href={`mailto:${booking.email}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-primary-200 text-primary text-xs font-medium hover:bg-primary-50 transition-colors"
                >
                  <Mail size={12} /> Email
                </a>
              </div>
            </div>
            <div className="ml-auto">
              <StatusBadge status={booking.status} />
            </div>
          </div>

          <dl className="grid grid-cols-2 gap-x-6 gap-y-5">
            <Field label="Session Goal"   value={GOAL_LABELS[booking.sessionGoal]  ?? booking.sessionGoal} />
            <Field label="French Level"   value={LEVEL_LABELS[booking.frenchLevel] ?? booking.frenchLevel} />
            <Field label="Preferred Time" value={TIME_LABELS[booking.preferredTime] ?? booking.preferredTime} />
            <Field label="Preferred Days" value={booking.preferredDays.map(d => d.charAt(0).toUpperCase() + d.slice(1)).join(', ')} />
            <Field label="Booked On"      value={new Date(booking.createdAt).toLocaleString()} />
          </dl>
        </div>

        {/* Update status */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-5">
          <h2 className="text-sm font-semibold text-gray-700 mb-4">Update Status</h2>
          <div className="flex items-center gap-3">
            <select
              value={selectedStatus}
              onChange={e => setSelectedStatus(e.target.value as BookingStatus)}
              className="form-input bg-white flex-1"
            >
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <button
              onClick={handleUpdateStatus}
              disabled={updating || selectedStatus === booking.status}
              className="btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
            >
              {updating && <Loader2 size={14} className="animate-spin" />}
              Save
            </button>
          </div>
        </div>

        {/* Delete */}
        <div className="bg-white rounded-2xl border border-red-100 shadow-sm p-6">
          <h2 className="text-sm font-semibold text-gray-700 mb-1">Delete Booking</h2>
          <p className="text-xs text-gray-400 mb-4">This action cannot be undone.</p>
          {!confirmDelete ? (
            <button
              onClick={() => setConfirmDelete(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-red-200 text-red-600 text-sm font-medium hover:bg-red-50 transition-colors"
            >
              <Trash2 size={14} /> Delete booking
            </button>
          ) : (
            <div className="flex items-center gap-3">
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-red-600 text-white text-sm font-medium hover:bg-red-700 transition-colors disabled:opacity-60"
              >
                {deleting && <Loader2 size={14} className="animate-spin" />}
                Yes, delete
              </button>
              <button
                onClick={() => setConfirmDelete(false)}
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}
