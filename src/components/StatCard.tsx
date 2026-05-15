import { ReactNode } from 'react'

interface StatCardProps {
  icon: ReactNode
  title: string
  value: string | number
  trend?: { value: number; direction: 'up' | 'down' }
  variant?: 'blue' | 'purple' | 'green' | 'orange' | 'red'
}

export function StatCard({ icon, title, value, trend, variant = 'blue' }: StatCardProps) {
  const variants = {
    blue: 'bg-blue-50 text-blue-600',
    purple: 'bg-purple-50 text-purple-600',
    green: 'bg-green-50 text-green-600',
    orange: 'bg-orange-50 text-orange-600',
    red: 'bg-red-50 text-red-600',
  }

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
          {trend && (
            <p
              className={`text-sm mt-2 ${
                trend.direction === 'up' ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {trend.direction === 'up' ? '↑' : '↓'} {trend.value}%
            </p>
          )}
        </div>
        <div className={`p-4 rounded-lg ${variants[variant]}`}>
          <div className="text-2xl">{icon}</div>
        </div>
      </div>
    </div>
  )
}
