// Central configuration hub - reads all environment variables
// No need to edit this file - all configuration goes in .env.local

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

// Table names from environment
export const TABLES = {
  CUSTOMERS: getEnv('VITE_TABLE_CUSTOMERS', 'customers'),
  CONVERSATIONS: getEnv('VITE_TABLE_CONVERSATIONS', 'conversations'),
  MESSAGES: getEnv('VITE_TABLE_MESSAGES', 'messages'),
  BOOKINGS: getEnv('VITE_TABLE_BOOKINGS', 'bookings'),
  BRANCHES: getEnv('VITE_TABLE_BRANCHES', 'branches'),
  SERVICES: getEnv('VITE_TABLE_SERVICES', 'services'),
  WORKFLOW_ERRORS: getEnv('VITE_TABLE_WORKFLOW_ERRORS', 'workflow_errors'),
} as const

// Customer table columns
export const COLS_CUSTOMER = {
  id: getEnv('VITE_COL_CUSTOMER_ID', 'id'),
  name: getEnv('VITE_COL_CUSTOMER_NAME', 'name'),
  phone: getEnv('VITE_COL_CUSTOMER_PHONE', 'phone'),
  email: getEnv('VITE_COL_CUSTOMER_EMAIL', 'email'),
  gender: getEnv('VITE_COL_CUSTOMER_GENDER', 'gender'),
  birthday: getEnv('VITE_COL_CUSTOMER_BIRTHDAY', 'birthday'),
  preferred_language: getEnv('VITE_COL_CUSTOMER_LANGUAGE', 'preferred_language'),
  is_vip: getEnv('VITE_COL_CUSTOMER_VIP', 'is_vip'),
  is_member: getEnv('VITE_COL_CUSTOMER_MEMBER', 'is_member'),
  available_credit_thb: getEnv('VITE_COL_CUSTOMER_CREDIT', 'available_credit_thb'),
  tags: getEnv('VITE_COL_CUSTOMER_TAGS', 'tags'),
  created_at: getEnv('VITE_COL_CUSTOMER_CREATED', 'created_at'),
  updated_at: getEnv('VITE_COL_CUSTOMER_UPDATED', 'updated_at'),
} as const

// Conversation table columns
export const COLS_CONVERSATION = {
  id: getEnv('VITE_COL_CONVERSATION_ID', 'id'),
  customer_id: getEnv('VITE_COL_CONVERSATION_CUSTOMER_ID', 'customer_id'),
  status: getEnv('VITE_COL_CONVERSATION_STATUS', 'status'),
  started_at: getEnv('VITE_COL_CONVERSATION_START_TIME', 'started_at'),
  closed_at: getEnv('VITE_COL_CONVERSATION_END_TIME', 'closed_at'),
  assigned_employee_id: getEnv('VITE_COL_CONVERSATION_ASSIGNED_TO', 'assigned_employee_id'),
  branch_id: getEnv('VITE_COL_CONV_BRANCH_ID', 'branch_id'),
  created_at: getEnv('VITE_COL_CONVERSATION_CREATED', 'created_at'),
  updated_at: getEnv('VITE_COL_CONVERSATION_UPDATED', 'updated_at'),
} as const

// Message table columns
export const COLS_MESSAGE = {
  id: getEnv('VITE_COL_MESSAGE_ID', 'id'),
  conversation_id: getEnv('VITE_COL_MESSAGE_CONVERSATION_ID', 'conversation_id'),
  content_text: getEnv('VITE_COL_MESSAGE_CONTENT', 'content_text'),
  direction: getEnv('VITE_COL_MESSAGE_DIRECTION', 'direction'),
  processing_status: getEnv('VITE_COL_MESSAGE_STATUS', 'processing_status'),
  created_at: getEnv('VITE_COL_MESSAGE_CREATED', 'created_at'),
} as const

// Booking table columns
export const COLS_BOOKING = {
  id: getEnv('VITE_COL_BOOKING_ID', 'id'),
  code: getEnv('VITE_COL_BOOKING_CODE', 'code'),
  customer_id: getEnv('VITE_COL_BOOKING_CUSTOMER_ID', 'customer_id'),
  service_slug: getEnv('VITE_COL_BOOKING_SERVICE_ID', 'service_slug'),
  branch_id: getEnv('VITE_COL_BOOKING_BRANCH_ID', 'branch_id'),
  status: getEnv('VITE_COL_BOOKING_STATUS', 'status'),
  start_at: getEnv('VITE_COL_BOOKING_APPOINTMENT_TIME', 'start_at'),
  end_at: getEnv('VITE_COL_BOOKING_END_TIME', 'end_at'),
  created_at: getEnv('VITE_COL_BOOKING_CREATED', 'created_at'),
  updated_at: getEnv('VITE_COL_BOOKING_UPDATED', 'updated_at'),
} as const

// Branch table columns
export const COLS_BRANCH = {
  id: getEnv('VITE_COL_BRANCH_ID', 'id'),
  slug: getEnv('VITE_COL_BRANCH_SLUG', 'slug'),
  name_th: getEnv('VITE_COL_BRANCH_NAME_TH', 'name_th'),
  name_en: getEnv('VITE_COL_BRANCH_NAME_EN', 'name_en'),
  address_th: getEnv('VITE_COL_BRANCH_ADDRESS_TH', 'address_th'),
  address_en: getEnv('VITE_COL_BRANCH_ADDRESS_EN', 'address_en'),
  phone: getEnv('VITE_COL_BRANCH_PHONE', 'phone'),
  created_at: getEnv('VITE_COL_BRANCH_CREATED', 'created_at'),
} as const

// Service table columns
export const COLS_SERVICE = {
  slug: getEnv('VITE_COL_SERVICE_ID', 'slug'),
  name_th: getEnv('VITE_COL_SERVICE_NAME_TH', 'name_th'),
  name_en: getEnv('VITE_COL_SERVICE_NAME_EN', 'name_en'),
  category: getEnv('VITE_COL_SERVICE_CATEGORY', 'category'),
  duration_minutes: getEnv('VITE_COL_SERVICE_DURATION', 'duration_minutes'),
  created_at: getEnv('VITE_COL_SERVICE_CREATED', 'created_at'),
} as const

// Error table columns
export const COLS_ERROR = {
  id: getEnv('VITE_COL_ERROR_ID', 'id'),
  timestamp: getEnv('VITE_COL_ERROR_TIMESTAMP', 'timestamp'),
  severity: getEnv('VITE_COL_ERROR_SEVERITY', 'severity'),
  workflow: getEnv('VITE_COL_ERROR_WORKFLOW', 'workflow'),
  message: getEnv('VITE_COL_ERROR_MESSAGE', 'message'),
  details: getEnv('VITE_COL_ERROR_DETAILS', 'details'),
  created_at: getEnv('VITE_COL_ERROR_CREATED', 'created_at'),
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
