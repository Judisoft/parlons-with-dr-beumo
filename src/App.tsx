import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom'
import Navbar from '@/components/common/Navbar'
import HomePage from '@/pages/HomePage'
import RegisterPage from '@/pages/RegisterPage'
import AdminBookingsPage from '@/pages/admin/AdminBookingsPage'
import AdminBookingDetailPage from '@/pages/admin/AdminBookingDetailPage'
import AdminPinGuard from '@/components/admin/AdminPinGuard'

function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1"><Outlet /></main>
      <footer className="bg-gray-900 text-gray-400 text-sm text-center py-6">
        &copy; {new Date().getFullYear()} Parlons. All rights reserved.
      </footer>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>
        <Route element={<AdminPinGuard />}>
          <Route path="/admin/booking" element={<AdminBookingsPage />} />
          <Route path="/admin/booking/:id" element={<AdminBookingDetailPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
