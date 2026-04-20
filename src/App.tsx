import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from '@/components/common/Navbar'
import HomePage from '@/pages/HomePage'
import RegisterPage from '@/pages/RegisterPage'

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </main>
        <footer className="bg-gray-900 text-gray-400 text-sm text-center py-6">
          &copy; {new Date().getFullYear()} Parlons. All rights reserved.
        </footer>
      </div>
    </BrowserRouter>
  )
}
