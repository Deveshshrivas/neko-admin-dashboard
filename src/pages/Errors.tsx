import { useState, useEffect } from 'react'
import { DataTable, TableColumn } from '../components/DataTable'
import { StatusBadge } from '../components/StatusBadge'
import { useErrors } from '../lib/db-hooks'
import { AlertTriangle } from 'lucide-react'

interface WorkflowError {
  id: string
  timestamp: string
  severity: string
  workflow: string
  message: string
  created_at: string
}

export function ErrorsPage() {
  const [page, setPage] = useState(1)
  const [severity, setSeverity] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [data, setData] = useState<WorkflowError[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      try {
        const result = await useErrors(page, severity, searchTerm)
        setData(result.data)
        setTotal(result.count)
      } catch (error) {
        console.error('Failed to fetch errors:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [page, severity, searchTerm])

  const criticalErrors = data.filter((e) => e.severity === 'critical').length

  const columns: TableColumn<WorkflowError>[] = [
    { key: 'timestamp', label: 'Time' },
    {
      key: 'severity',
      label: 'Severity',
      render: (value) => <StatusBadge status={value} />,
    },
    { key: 'workflow', label: 'Workflow' },
    { key: 'message', label: 'Message' },
    { key: 'created_at', label: 'Date' },
  ]

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Workflow Errors</h1>

      {/* Critical Alert */}
      {criticalErrors > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3">
          <AlertTriangle className="text-red-600" size={24} />
          <div>
            <p className="font-semibold text-red-900">Critical Errors Detected</p>
            <p className="text-red-700 text-sm">{criticalErrors} critical errors require immediate attention</p>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card">
          <p className="text-gray-600 text-sm">Total Errors</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{total}</p>
        </div>
        <div className="card">
          <p className="text-gray-600 text-sm">Critical</p>
          <p className="text-2xl font-bold text-red-600 mt-1">{criticalErrors}</p>
        </div>
        <div className="card">
          <p className="text-gray-600 text-sm">Warning</p>
          <p className="text-2xl font-bold text-yellow-600 mt-1">
            {data.filter((e) => e.severity === 'warning').length}
          </p>
        </div>
        <div className="card">
          <p className="text-gray-600 text-sm">Info</p>
          <p className="text-2xl font-bold text-blue-600 mt-1">
            {data.filter((e) => e.severity === 'info').length}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="card grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="label">Severity Filter</label>
          <select
            value={severity}
            onChange={(e) => {
              setSeverity(e.target.value)
              setPage(1)
            }}
            className="input"
          >
            <option value="">All Severity</option>
            <option value="critical">Critical</option>
            <option value="warning">Warning</option>
            <option value="info">Info</option>
          </select>
        </div>
        <div className="md:col-span-2">
          <label className="label">Search by Message</label>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value)
              setPage(1)
            }}
            placeholder="Search errors..."
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
