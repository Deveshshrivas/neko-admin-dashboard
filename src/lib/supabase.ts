import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Check if credentials are configured
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseKey)

// Create client or use dummy for setup mode
export const supabase = isSupabaseConfigured 
  ? createClient(supabaseUrl, supabaseKey)
  : createClient('https://demo.supabase.co', 'demo-key-for-setup-only')

export interface Customer {
  id: string
  name: string
  phone: string
  email?: string
  gender?: string
  language?: string
  vip?: boolean
  member?: boolean
  credit?: number
  tags?: string[]
  created_at: string
  updated_at: string
}

export interface Conversation {
  id: string
  customer_id: string
  status: string
  start_time?: string
  end_time?: string
  assigned_to?: string
  phone?: string
  customer?: Customer
  created_at: string
  updated_at: string
}

export interface Message {
  id: string
  conversation_id: string
  content: string
  direction: string
  status: string
  timestamp: string
  media_url?: string
  created_at: string
}

export interface Booking {
  id: string
  booking_code: string
  customer_id: string
  service_id: string
  branch_id: string
  status: string
  appointment_time: string
  phone?: string
  customer?: Customer
  service?: Service
  branch?: Branch
  created_at: string
  updated_at: string
}

export interface WorkflowError {
  id: string
  timestamp: string
  severity: string
  workflow: string
  message: string
  details?: string
  created_at: string
}

export interface Branch {
  id: string
  name: string
  address?: string
  phone?: string
  created_at: string
}

export interface Service {
  id: string
  name: string
  description?: string
  price?: number
  duration?: number
  created_at: string
}
