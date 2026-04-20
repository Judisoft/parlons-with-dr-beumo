import RegisterForm from '@/components/auth/RegisterForm'

export default function RegisterPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-50 flex items-center justify-center px-4 py-14">
      <div className="w-full max-w-lg">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 sm:p-10">
          <div className="text-center mb-8">
            <img src="/parlons_logo.svg" alt="Parlons" className="h-18 w-auto mx-auto mb-4" style={{ mixBlendMode: "multiply" }} />
            <h1 className="text-2xl font-bold text-gray-900">Book a session with Dr. Beumo</h1>
            <p className="text-sm text-gray-500 mt-1">
              Native French speaker &amp; expert tutor — TEF, TCF, DELF/DALF &amp; General French.
            </p>
          </div>

          <RegisterForm />
        </div>
      </div>
    </div>
  )
}
