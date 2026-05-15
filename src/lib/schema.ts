// Central configuration hub.
// Keep deployment secrets/URLs in .env.local; keep stable schema names here.

function getEnv(key: string, fallback: string): string {
  const value = import.meta.env[key]
  return value !== undefined ? value : fallback
}

// Branch management
export function getCurrentBranch(): string {
  if (typeof window === 'undefined') return ''
  const saved = localStorage.getItem('selectedBranch')
  return saved || ''
}

export function setCurrentBranch(branchId: string) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('selectedBranch', branchId)
    window.dispatchEvent(new CustomEvent('branchChanged', { detail: { branchId } }))
  }
}

// Table names
export const TABLES = {
  CUSTOMERS: 'customers',
  CONVERSATIONS: 'conversations',
  MESSAGES: 'messages',
  BOOKINGS: 'bookings',
  BRANCHES: 'branches',
  SERVICES: 'services',
  WORKFLOW_ERRORS: 'workflow_errors',
} as const

// Customer table columns
export const COLS_CUSTOMER = {
  id: 'id',
  name: 'name',
  phone: 'phone',
  email: 'email',
  gender: 'gender',
  birthday: 'birthday',
  preferred_language: 'preferred_language',
  is_vip: 'is_vip',
  is_member: 'is_member',
  available_credit_thb: 'available_credit_thb',
  tags: 'tags',
  created_at: 'created_at',
  updated_at: 'updated_at',
} as const

// Conversation table columns
export const COLS_CONVERSATION = {
  id: 'id',
  customer_id: 'customer_id',
  status: 'status',
  started_at: 'started_at',
  closed_at: 'closed_at',
  assigned_employee_id: 'assigned_employee_id',
  branch_id: 'branch_id',
  created_at: 'created_at',
  updated_at: 'updated_at',
} as const

// Message table columns
export const COLS_MESSAGE = {
  id: 'id',
  conversation_id: 'conversation_id',
  content_text: 'content_text',
  direction: 'direction',
  processing_status: 'processing_status',
  created_at: 'created_at',
} as const

// Booking table columns
export const COLS_BOOKING = {
  id: 'id',
  code: 'code',
  customer_id: 'customer_id',
  service_slug: 'service_slug',
  branch_id: 'branch_id',
  status: 'status',
  start_at: 'start_at',
  end_at: 'end_at',
  created_at: 'created_at',
  updated_at: 'updated_at',
} as const

// Branch table columns
export const COLS_BRANCH = {
  id: 'id',
  slug: 'slug',
  name_th: 'name_th',
  name_en: 'name_en',
  address_th: 'address_th',
  address_en: 'address_en',
  phone: 'phone',
  created_at: 'created_at',
} as const

// Service table columns
export const COLS_SERVICE = {
  slug: 'slug',
  name_th: 'name_th',
  name_en: 'name_en',
  category: 'category',
  duration_minutes: 'duration_minutes',
  created_at: 'created_at',
} as const

// Error table columns
export const COLS_ERROR = {
  id: 'id',
  timestamp: 'timestamp',
  severity: 'severity',
  workflow: 'workflow',
  message: 'message',
  details: 'details',
  created_at: 'created_at',
} as const

// App configuration
export const APP_CONFIG = {
  timezone: getEnv('VITE_APP_TIMEZONE', 'Asia/Kolkata'),
  refreshInterval: parseInt(getEnv('VITE_APP_REFRESH_INTERVAL', '30000')),
  theme: getEnv('VITE_APP_THEME', 'light'),
  language: getEnv('VITE_APP_LANGUAGE', 'en'),
} as const

// n8n configuration
export const N8N_CONFIG = {
  url: getEnv('VITE_N8N_URL', 'https://n8n.example.com'),
  humanReplyWebhookUrl: getEnv('VITE_N8N_HUMAN_REPLY_WEBHOOK_URL', ''),
} as const

// Helper functions
export function buildSelect(columns: Record<string, string>): string {
  return Object.values(columns).join(', ')
}

export function getTableColumns(tableKey: keyof typeof TABLES): Record<string, string> {
  const columnMaps = {
    CUSTOMERS: COLS_CUSTOMER,
    CONVERSATIONS: COLS_CONVERSATION,
    MESSAGES: COLS_MESSAGE,
    BOOKINGS: COLS_BOOKING,
    BRANCHES: COLS_BRANCH,
    SERVICES: COLS_SERVICE,
    WORKFLOW_ERRORS: COLS_ERROR,
  }
  return columnMaps[tableKey] || {}
}
