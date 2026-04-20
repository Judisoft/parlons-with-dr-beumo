import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Lock, Loader2 } from 'lucide-react'

const PIN = '8080'
const STORAGE_KEY = 'admin_authed'

export default function AdminPinGuard() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem(STORAGE_KEY) === '1')
  const [pin, setPin]       = useState('')
  const [error, setError]   = useState(false)
  const [shaking, setShaking] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (pin === PIN) {
      sessionStorage.setItem(STORAGE_KEY, '1')
      setAuthed(true)
    } else {
      setError(true)
      setShaking(true)
      setPin('')
      setTimeout(() => setShaking(false), 500)
    }
  }

  if (authed) return <Outlet />

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="flex justify-center mb-8">
          <img src="/parlons_logo.svg" alt="Parlons" className="h-16 w-auto" style={{ mixBlendMode: "multiply" }} />
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <div className="flex flex-col items-center mb-6">
            <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center mb-3">
              <Lock size={20} className="text-primary" />
            </div>
            <h1 className="text-lg font-bold text-gray-900">Admin access</h1>
            <p className="text-sm text-gray-400 mt-0.5">Enter your PIN to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="password"
              inputMode="numeric"
              pattern="\d*"
              maxLength={8}
              autoFocus
              value={pin}
              onChange={e => { setPin(e.target.value); setError(false) }}
              placeholder="••••"
              className={`form-input text-center text-xl tracking-[0.5em] ${shaking ? 'animate-[shake_0.4s_ease]' : ''} ${error ? 'border-red-400 focus:ring-red-300' : ''}`}
            />
            {error && (
              <p className="text-xs text-red-500 text-center -mt-2">Incorrect PIN. Try again.</p>
            )}
            <button type="submit" className="btn-primary flex items-center justify-center gap-2">
              <Loader2 size={14} className="hidden" />
              Unlock
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
