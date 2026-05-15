import { useState, useEffect } from 'react'
import { DataTable, TableColumn } from '../components/DataTable'
import { StatusBadge } from '../components/StatusBadge'
import { useBookings } from '../lib/db-hooks'
import { supabase } from '../lib/supabase'

interface Booking {
  id: string
  code: string
  status: string
  start_at: string
  end_at: string
  created_at: string
}

interface Stats {
  total: number
  thisWeek: number
  pending: number
  cancelled: number
}

export function BookingsPage() {
  const [page, setPage] = useState(1)
  const [status, setStatus] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [data, setData] = useState<Booking[]>([])
  const [total, setTotal] = useState(0)
  const [stats, setStats] = useState<Stats>({ total: 0, thisWeek: 0, pending: 0, cancelled: 0 })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function fetchStats() {
      try {
        const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()

        const [totalRes, weekRes, pendingRes, cancelledRes] = await Promise.all([
          supabase.from('bookings').select('id', { count: 'exact' }).limit(1),
          supabase.from('bookings').select('id', { count: 'exact' }).gte('created_at', weekAgo).limit(1),
          supabase.from('bookings').select('id', { count: 'exact' }).eq('status', 'pending').limit(1),
          supabase.from('bookings').select('id', { count: 'exact' }).eq('status', 'cancelled').limit(1),
        ])

        setStats({
          total: totalRes.count || 0,
          thisWeek: weekRes.count || 0,
          pending: pendingRes.count || 0,
          cancelled: cancelledRes.count || 0,
        })
      } catch (error) {
        console.error('Failed to fetch booking stats:', error)
      }
    }
    fetchStats()
  }, [])

  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      try {
        console.log('🔍 Fetching bookings - page:', page, 'filter:', status, 'search:', searchTerm)
        // Pass null to fetch ALL bookings regardless of branch
        const result = await useBookings(page, status, searchTerm, null)
        console.log('✅ Bookings fetched:', result)
        setData(result.data)
        setTotal(result.count)
      } catch (error) {
        console.error('❌ Failed to fetch bookings:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [page, status, searchTerm])

  const columns: TableColumn<Booking>[] = [
    { key: 'code', label: 'Booking Code' },
    {
      key: 'status',
      label: 'Status',
      render: (value) => <StatusBadge status={value} />,
    },
    { key: 'start_at', label: 'Start Time' },
    { key: 'end_at', label: 'End Time' },
    { key: 'created_at', label: 'Date' },
  ]

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Bookings</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card">
          <p className="text-gray-600 text-sm">Total Bookings</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{stats.total}</p>
        </div>
        <div className="card">
          <p className="text-gray-600 text-sm">This Week</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{stats.thisWeek}</p>
        </div>
        <div className="card">
          <p className="text-gray-600 text-sm">Pending</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{stats.pending}</p>
        </div>
        <div className="card">
          <p className="text-gray-600 text-sm">Cancelled</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{stats.cancelled}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="card grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="label">Status Filter</label>
          <select
            value={status}
            onChange={(e) => {
              setStatus(e.target.value)
              setPage(1)
            }}
            className="input"
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
        <div>
          <label className="label">Search</label>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value)
              setPage(1)
            }}
            placeholder="Search code..."
            className="input"
          />
        </div>
      </div>

      {/* Table */}
      <DataTable
        columns={columns}
        data={data}
        loading={loading}
        pagination={{
          page,
          pageSize: 10,
          total,
          onPageChange: setPage,
        }}
      />
    </div>
  )
}
