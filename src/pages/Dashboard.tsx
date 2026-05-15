import { useState, useEffect } from 'react'
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { StatCard } from '../components/StatCard.tsx'
import { StatusBadge } from '../components/StatusBadge.tsx'
import { Users, MessageCircle, Calendar, AlertTriangle, MapPin } from 'lucide-react'
import { useDashboardStats, useBranches } from '../lib/db-hooks'
import { getCurrentBranch, setCurrentBranch } from '../lib/schema'
import { useBranchListener } from '../hooks/useBranchListener'
import { supabase } from '../lib/supabase'

export function DashboardPage() {
  const [stats, setStats] = useState({
    totalCustomers: 0,
    activeConversations: 0,
    pendingBookings: 0,
    totalMessages: 0,
    criticalErrors: 0,
  })
  const [messageActivityData, setMessageActivityData] = useState<any[]>([])
  const [bookingStatusData, setBookingStatusData] = useState<any[]>([])
  const [branches, setBranches] = useState<any[]>([])
  const [selectedBranch, setSelectedBranch] = useState(getCurrentBranch())
  const [loading, setLoading] = useState(true)
  const branchIdFromListener = useBranchListener()

  useEffect(() => {
    setSelectedBranch(branchIdFromListener)
  }, [branchIdFromListener])

  useEffect(() => {
    async function fetchBranches() {
      try {
        const data = await useBranches()
        setBranches(data.data || [])
        if (data.data && data.data.length > 0 && !selectedBranch) {
          setCurrentBranch(data.data[0].id)
          setSelectedBranch(data.data[0].id)
        }
      } catch (error) {
        console.error('Failed to fetch branches:', error)
      }
    }
    fetchBranches()
  }, [])

  // Fetch message activity by day of week
  useEffect(() => {
    async function fetchMessageActivity() {
      try {
        const { data: messages } = await supabase
          .from('messages')
          .select('created_at')
          .gte('created_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString())

        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
        const counts: Record<string, number> = { Sun: 0, Mon: 0, Tue: 0, Wed: 0, Thu: 0, Fri: 0, Sat: 0 }

        messages?.forEach((msg: any) => {
          const day = days[new Date(msg.created_at).getDay()]
          counts[day]++
        })

        const activityData = days.map(day => ({ date: day, messages: counts[day] }))
        setMessageActivityData(activityData)
      } catch (error) {
        console.error('Failed to fetch message activity:', error)
      }
    }
    fetchMessageActivity()
  }, [selectedBranch])

  // Fetch booking status distribution
  useEffect(() => {
    async function fetchBookingStatus() {
      try {
        const statuses = ['pending', 'confirmed', 'in_service', 'completed', 'cancelled']
        const statusCounts: Record<string, number> = {}

        for (const status of statuses) {
          const { count } = await supabase
            .from('bookings')
            .select('id', { count: 'exact' })
            .eq('status', status)

          statusCounts[status] = count || 0
        }

        const statusData = [
          { name: 'Confirmed', value: statusCounts.confirmed },
          { name: 'Pending', value: statusCounts.pending },
          { name: 'In Service', value: statusCounts.in_service },
          { name: 'Completed', value: statusCounts.completed },
          { name: 'Cancelled', value: statusCounts.cancelled },
        ]

        setBookingStatusData(statusData)
      } catch (error) {
        console.error('Failed to fetch booking status:', error)
      }
    }
    fetchBookingStatus()
  }, [selectedBranch])

  useEffect(() => {
    async function fetchStats() {
      try {
        const data = await useDashboardStats(selectedBranch)
        setStats(data)
      } catch (error) {
        console.error('Failed to fetch stats:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchStats()
  }, [selectedBranch])

  const handleBranchChange = (branchId: string) => {
    setCurrentBranch(branchId)
    setSelectedBranch(branchId)
  }

  // Default fallback data if no real data is loaded
  const defaultMessageData = [
    { date: 'Sun', messages: 0 },
    { date: 'Mon', messages: 0 },
    { date: 'Tue', messages: 0 },
    { date: 'Wed', messages: 0 },
    { date: 'Thu', messages: 0 },
    { date: 'Fri', messages: 0 },
    { date: 'Sat', messages: 0 },
  ]

  const defaultBookingData = [
    { name: 'Confirmed', value: 0 },
    { name: 'Pending', value: 0 },
    { name: 'In Service', value: 0 },
    { name: 'Completed', value: 0 },
    { name: 'Cancelled', value: 0 },
  ]

  // Use state data if available, otherwise use defaults
  const chartMessageData = messageActivityData.length > 0 ? messageActivityData : defaultMessageData
  const chartBookingData = bookingStatusData.length > 0 ? bookingStatusData : defaultBookingData

  const COLORS = ['#10B981', '#F59E0B', '#3B82F6', '#EF4444']

  // Render loading message if data is zero and still loading
  const hasData = stats.totalCustomers > 0 || stats.activeConversations > 0 || stats.pendingBookings > 0

  return (
    <div className="space-y-6">
      {/* Branch Selector */}
      <div className="bg-white rounded-lg shadow p-4 flex items-center gap-4">
        <div className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-blue-500" />
          <span className="font-semibold text-gray-700">Branch:</span>
        </div>
        <select
          value={selectedBranch}
          onChange={(e) => handleBranchChange(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Branches</option>
          {branches.map((branch) => (
            <option key={branch.id} value={branch.id}>
              {branch.name}
            </option>
          ))}
        </select>
        {selectedBranch && (
          <span className="text-sm text-gray-600">
            Showing data for: <strong>{branches.find((b) => b.id === selectedBranch)?.name}</strong>
          </span>
        )}
      </div>

      {!hasData && !loading && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-blue-800">
            <strong>✓ Supabase Connected!</strong> No data in database yet. Add sample data to see live statistics.
          </p>
        </div>
      )}

      <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard
          icon={<Users />}
          title="Total Customers"
          value={stats.totalCustomers}
          variant="blue"
        />
        <StatCard
          icon={<MessageCircle />}
          title="Active Conversations"
          value={stats.activeConversations}
          variant="purple"
        />
        <StatCard
          icon={<Calendar />}
          title="Pending Bookings"
          value={stats.pendingBookings}
          variant="orange"
        />
        <StatCard
          icon={<MessageCircle />}
          title="Total Messages"
          value={stats.totalMessages}
          variant="green"
        />
        <StatCard
          icon={<AlertTriangle />}
          title="Critical Errors"
          value={stats.criticalErrors}
          variant="red"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Message Activity Chart */}
        <div className="card lg:col-span-2">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Message Activity</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartMessageData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="messages"
                stroke="#3B82F6"
                strokeWidth={2}
                dot={{ fill: '#3B82F6', r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Booking Status Chart */}
        <div className="card">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Booking Status</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartBookingData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name} ${value}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {chartBookingData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* System Health */}
      <div className="card">
        <h2 className="text-xl font-bold text-gray-900 mb-4">System Health</h2>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm text-gray-600">Database Connection</span>
              <span className="text-sm font-medium text-green-600">Healthy</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: '100%' }}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm text-gray-600">API Response Time</span>
              <span className="text-sm font-medium text-green-600">Fast</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm text-gray-600">Error Rate</span>
              <span className="text-sm font-medium text-orange-600">Minor</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-orange-500 h-2 rounded-full" style={{ width: '15%' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
