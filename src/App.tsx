import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout'
import { DashboardPage } from './pages/Dashboard'
import { ConversationsPage } from './pages/Conversations'
import { BookingsPage } from './pages/Bookings'
import { MessagesPage } from './pages/Messages'
import { CustomersPage } from './pages/Customers'
import { ErrorsPage } from './pages/Errors'
import { SettingsPage } from './pages/Settings'
import { testSupabaseConnection } from './lib/debug'

export default function App() {
  useEffect(() => {
    testSupabaseConnection()
  }, [])

  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/conversations" element={<ConversationsPage />} />
          <Route path="/bookings" element={<BookingsPage />} />
          <Route path="/messages" element={<MessagesPage />} />
          <Route path="/customers" element={<CustomersPage />} />
          <Route path="/errors" element={<ErrorsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </Router>
  )
}
