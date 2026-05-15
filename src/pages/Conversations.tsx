import { useState, useEffect } from 'react'
import { DataTable, TableColumn } from '../components/DataTable'
import { StatusBadge } from '../components/StatusBadge'
import { useConversations as fetchConversations } from '../lib/db-hooks'

interface Conversation {
  id: string
  customer_id: string
  status: string
  started_at: string
  created_at: string
}

export function ConversationsPage() {
  const [page, setPage] = useState(1)
  const [status, setStatus] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [data, setData] = useState<Conversation[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      try {
        console.log('Fetching conversations - page:', page, 'status:', status, 'search:', searchTerm)
        // Pass null to fetch ALL conversations regardless of branch
        const result = await fetchConversations(page, status, searchTerm, null)
        console.log('✅ Conversations fetched:', result)
        setData(result.data)
        setTotal(result.count)
      } catch (error) {
        console.error('❌ Failed to fetch conversations:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [page, status, searchTerm])

  const columns: TableColumn<Conversation>[] = [
    { key: 'id', label: 'ID' },
    { key: 'customer_id', label: 'Customer ID' },
    {
      key: 'status',
      label: 'Status',
      render: (value) => <StatusBadge status={value} />,
    },
    { key: 'started_at', label: 'Started' },
    { key: 'created_at', label: 'Date' },
  ]

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Conversations</h1>

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
            <option value="active">Active</option>
            <option value="awaiting_human">Awaiting Human</option>
            <option value="human_handling">Human Handling</option>
            <option value="closed">Closed</option>
          </select>
        </div>
        <div>
          <label className="label">Search by Phone</label>
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
