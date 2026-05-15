import { ChevronLeft, ChevronRight } from 'lucide-react'
import { ReactNode } from 'react'

export interface TableColumn<T> {
  key: keyof T
  label: string
  render?: (value: any, row: T) => ReactNode
}

interface DataTableProps<T> {
  columns: TableColumn<T>[]
  data: T[]
  loading?: boolean
  pagination?: {
    page: number
    pageSize: number
    total: number
    onPageChange: (page: number) => void
  }
  emptyMessage?: string
}

export function DataTable<T extends { id: string }>({
  columns,
  data,
  loading = false,
  pagination,
  emptyMessage = 'No data found',
}: DataTableProps<T>) {
  if (loading) {
    return (
      <div className="card">
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </div>
    )
  }

  if (!data || data.length === 0) {
    return (
      <div className="card">
        <div className="flex justify-center items-center h-40">
          <p className="text-gray-500">{emptyMessage}</p>
        </div>
      </div>
    )
  }

  const totalPages = pagination ? Math.ceil(pagination.total / pagination.pageSize) : 1

  return (
    <div className="card">
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              {columns.map((col) => (
                <th key={String(col.key)}>{col.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.id}>
                {columns.map((col) => (
                  <td key={`${row.id}-${String(col.key)}`}>
                    {col.render ? col.render(row[col.key], row) : String(row[col.key] ?? '')}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {pagination && totalPages > 1 && (
        <div className="flex items-center justify-between mt-4 pt-4 border-t">
          <p className="text-sm text-gray-600">
            Page {pagination.page} of {totalPages} ({pagination.total} results)
          </p>
          <div className="flex gap-2">
            <button
              className="btn btn-secondary btn-sm disabled:opacity-50"
              onClick={() => pagination.onPageChange(pagination.page - 1)}
              disabled={pagination.page === 1}
            >
              <ChevronLeft size={16} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                className={`btn btn-sm ${
                  page === pagination.page ? 'btn-primary' : 'btn-secondary'
                }`}
                onClick={() => pagination.onPageChange(page)}
              >
                {page}
              </button>
            ))}
            <button
              className="btn btn-secondary btn-sm disabled:opacity-50"
              onClick={() => pagination.onPageChange(pagination.page + 1)}
              disabled={pagination.page === totalPages}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
