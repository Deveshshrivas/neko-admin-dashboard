import { useState, useEffect } from 'react'
import { DataTable, TableColumn } from '../components/DataTable'
import { useCustomers } from '../lib/db-hooks'
import { supabase } from '../lib/supabase'

interface Customer {
  id: string
  name: string
  phone: string
  email?: string
  is_vip?: boolean
  is_member?: boolean
  available_credit_thb?: number
  created_at: string
}

interface Stats {
  total: number
  vip: number
  members: number
  totalCredit: number
}

export function CustomersPage() {
  const [page, setPage] = useState(1)
  const [filterType, setFilterType] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [data, setData] = useState<Customer[]>([])
  const [total, setTotal] = useState(0)
  const [stats, setStats] = useState<Stats>({ total: 0, vip: 0, members: 0, totalCredit: 0 })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function fetchStats() {
      try {
        const [totalRes, vipRes, memberRes] = await Promise.all([
          supabase.from('customers').select('id', { count: 'exact' }).limit(1),
          supabase.from('customers').select('id', { count: 'exact' }).eq('is_vip', true).limit(1),
          supabase.from('customers').select('id', { count: 'exact' }).eq('is_member', true).limit(1),
        ])

        setStats({
          total: totalRes.count || 0,
          vip: vipRes.count || 0,
          members: memberRes.count || 0,
          totalCredit: 0,
        })
      } catch (error) {
        console.error('Failed to fetch customer stats:', error)
      }
    }
    fetchStats()
  }, [])

  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      try {
        console.log('🔍 Fetching customers - page:', page, 'search:', searchTerm)
        const result = await useCustomers(page, 10, searchTerm)
        console.log('✅ Customers fetched:', result)
        let filtered = result.data

        if (filterType === 'vip') {
          filtered = filtered.filter((c) => c.is_vip)
        } else if (filterType === 'member') {
          filtered = filtered.filter((c) => c.is_member)
        }

        setData(filtered)
        setTotal(result.count)
      } catch (error) {
        console.error('❌ Failed to fetch customers:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [page, filterType, searchTerm])

  const columns: TableColumn<Customer>[] = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Name' },
    { key: 'phone', label: 'Phone' },
    { key: 'email', label: 'Email' },
    {
      key: 'is_vip',
      label: 'Type',
      render: (_, row) => (
        <div className="flex gap-2">
          {row.is_vip && <span className="badge badge-danger">VIP</span>}
          {row.is_member && <span className="badge badge-info">Member</span>}
        </div>
      ),
    },
    { key: 'available_credit_thb', label: 'Credit (THB)' },
    { key: 'created_at', label: 'Joined' },
  ]

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Customers</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card">
          <p className="text-gray-600 text-sm">Total Customers</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{stats.total}</p>
        </div>
        <div className="card">
          <p className="text-gray-600 text-sm">VIP Members</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{stats.vip}</p>
        </div>
        <div className="card">
          <p className="text-gray-600 text-sm">Regular Members</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{stats.members}</p>
        </div>
        <div className="card">
          <p className="text-gray-600 text-sm">Total Credit</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">฿0</p>
        </div>
      </div>

      {/* Filters */}
      <div className="card grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="label">Filter by Type</label>
          <select
            value={filterType}
            onChange={(e) => {
              setFilterType(e.target.value)
              setPage(1)
            }}
            className="input"
          >
            <option value="">All Customers</option>
            <option value="vip">VIP Only</option>
            <option value="member">Members Only</option>
          </select>
        </div>
        <div className="md:col-span-2">
          <label className="label">Search by Name or Phone</label>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value)
              setPage(1)
            }}
            placeholder="Search..."
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
