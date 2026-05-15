interface StatusBadgeProps {
  status: string
  size?: 'sm' | 'md' | 'lg'
}

export function StatusBadge({ status, size = 'md' }: StatusBadgeProps) {
  const statusConfig: Record<string, { bg: string; text: string; dot: string }> = {
    active: { bg: 'bg-green-100', text: 'text-green-800', dot: 'bg-green-500' },
    pending: { bg: 'bg-yellow-100', text: 'text-yellow-800', dot: 'bg-yellow-500' },
    confirmed: { bg: 'bg-blue-100', text: 'text-blue-800', dot: 'bg-blue-500' },
    completed: { bg: 'bg-green-100', text: 'text-green-800', dot: 'bg-green-500' },
    cancelled: { bg: 'bg-red-100', text: 'text-red-800', dot: 'bg-red-500' },
    failed: { bg: 'bg-red-100', text: 'text-red-800', dot: 'bg-red-500' },
    error: { bg: 'bg-red-100', text: 'text-red-800', dot: 'bg-red-500' },
    warning: { bg: 'bg-yellow-100', text: 'text-yellow-800', dot: 'bg-yellow-500' },
    critical: { bg: 'bg-red-100', text: 'text-red-800', dot: 'bg-red-500' },
    queued: { bg: 'bg-blue-100', text: 'text-blue-800', dot: 'bg-blue-500' },
    replied: { bg: 'bg-green-100', text: 'text-green-800', dot: 'bg-green-500' },
    skipped: { bg: 'bg-gray-100', text: 'text-gray-800', dot: 'bg-gray-500' },
    awaiting_human: { bg: 'bg-purple-100', text: 'text-purple-800', dot: 'bg-purple-500' },
    human_handling: { bg: 'bg-purple-100', text: 'text-purple-800', dot: 'bg-purple-500' },
    closed: { bg: 'bg-gray-100', text: 'text-gray-800', dot: 'bg-gray-500' },
    inbound: { bg: 'bg-blue-100', text: 'text-blue-800', dot: 'bg-blue-500' },
    outbound: { bg: 'bg-purple-100', text: 'text-purple-800', dot: 'bg-purple-500' },
  }

  const config = statusConfig[status] || { bg: 'bg-gray-100', text: 'text-gray-800', dot: 'bg-gray-500' }
  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-2 text-base',
  }

  return (
    <span className={`badge ${config.bg} ${config.text} ${sizeClasses[size]} flex items-center gap-2`}>
      <span className={`${config.dot} w-2 h-2 rounded-full`}></span>
      {status.replace(/_/g, ' ').charAt(0).toUpperCase() + status.replace(/_/g, ' ').slice(1)}
    </span>
  )
}
