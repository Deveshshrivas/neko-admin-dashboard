// Auto-generated TypeScript types from Neko Salon Supabase schema

// ============================================
// CUSTOMERS & IDENTITIES
// ============================================
export interface Customer {
  id: string
  name: string | null
  phone: string | null
  email: string | null
  gender: string | null
  birthday: string | null
  preferred_branch_id: string | null
  preferred_language: string
  is_member: boolean
  member_id: string | null
  is_vip: boolean
  available_credit_thb: number
  tags: string[]
  notes_internal: string | null
  consent_marketing: boolean
  consent_data_storage: boolean
  last_seen_at: string
  created_at: string
  updated_at: string
}

export interface CustomerIdentity {
  id: string
  customer_id: string
  channel: 'whatsapp' | 'messenger'
  external_id: string
  channel_account_id: string
  display_name_on_platform: string | null
  profile_pic_url: string | null
  first_seen_at: string
  last_seen_at: string
}

export interface CustomerMemory {
  customer_id: string
  facts: string | null
  preferences: string | null
  treatment_history: string | null
  employee_notes: string | null
  structured: Record<string, any>
  last_updated: string
}

// ============================================
// MESSAGING & CONVERSATIONS
// ============================================
export interface ChannelAccount {
  id: string
  channel: 'whatsapp' | 'messenger'
  external_id: string
  branch_id: string | null
  display_name: string
  credential_ref: string | null
  wa_phone_number: string | null
  fb_page_name: string | null
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface Conversation {
  id: string
  customer_id: string
  channel_account_id: string
  branch_id: string | null
  status: 'active_bot' | 'awaiting_human' | 'human_handling' | 'closed'
  bot_state: Record<string, any>
  pending_question: Record<string, any> | null
  summary_th: string | null
  summary_updated_at: string | null
  summary_message_count: number
  bot_confusion_count: number
  assigned_employee_id: string | null
  last_inbound_at: string | null
  last_outbound_at: string | null
  started_at: string
  closed_at: string | null
  created_at: string
  updated_at: string
}

export interface Message {
  id: string
  conversation_id: string
  channel_account_id: string
  role: 'customer' | 'bot' | 'employee'
  direction: 'inbound' | 'outbound'
  message_type: 'text' | 'image' | 'video' | 'audio' | 'sticker' | 'location' | 'template' | 'interactive' | 'reaction' | 'unsupported'
  content_text: string | null
  content_media_url: string | null
  content_media_type: string | null
  external_message_id: string | null
  channel: 'whatsapp' | 'messenger'
  sender_employee_id: string | null
  wa_template_slug: string | null
  delivery_status: 'sent' | 'delivered' | 'read' | 'failed' | null
  processing_status: 'received' | 'processing' | 'replied' | 'failed' | 'skipped'
  llm_intent: string | null
  llm_confidence: number | null
  metadata: Record<string, any> | null
  created_at: string
}

// ============================================
// BOOKINGS & SERVICES
// ============================================
export interface Booking {
  id: string
  code: string
  customer_id: string
  conversation_id: string | null
  branch_id: string
  stylist_id: string | null
  service_slug: string
  start_at: string
  end_at: string
  status: 'pending' | 'confirmed' | 'in_service' | 'completed' | 'no_show' | 'cancelled' | 'rescheduled'
  source: 'bot' | 'walk_in' | 'staff_manual' | 'phone'
  customer_notes: string | null
  internal_notes: string | null
  deposit_amount: number | null
  deposit_status: 'not_required' | 'pending' | 'paid' | 'forfeited' | 'applied_as_credit'
  deposit_payment_ref: string | null
  cancellation_reason: string | null
  cancelled_at: string | null
  cancelled_by: 'customer' | 'staff' | 'bot_no_show' | null
  rescheduled_from_id: string | null
  reminder_24h_sent: boolean
  reminder_2h_sent: boolean
  confirmed_at: string | null
  created_at: string
  updated_at: string
}

export interface Service {
  slug: string
  category: string
  name_th: string
  name_en: string
  description_th: string | null
  duration_minutes: number
  requires_consultation: boolean
  nakhon_pathom_price: number | null
  nakhon_pathom_promo_price: number | null
  nakhon_pathom_price_text: string | null
  nakhon_pathom_available: boolean
  ladprao_price: number | null
  ladprao_promo_price: number | null
  ladprao_price_text: string | null
  ladprao_available: boolean
  eligible_stylists_nakhon_pathom: string[]
  eligible_stylists_ladprao: string[]
  is_active: boolean
  display_order: number
  created_at: string
  updated_at: string
}

export interface Promotion {
  id: string
  title_th: string
  title_en: string | null
  description_th: string | null
  service_slug: string | null
  discount_type: 'percent' | 'fixed' | 'bundle' | 'free_addon' | 'package' | null
  discount_value: number | null
  original_price: number | null
  promo_price: number | null
  valid_from: string
  valid_until: string | null
  image_url: string | null
  before_image_url: string | null
  after_image_url: string | null
  terms_th: string | null
  target_branches: string[]
  target_segments: string[]
  is_active: boolean
  created_by: string | null
  created_at: string
  updated_at: string
}

// ============================================
// BRANCHES & STYLISTS
// ============================================
export interface Branch {
  id: string
  slug: string
  name_th: string
  name_en: string
  address_th: string | null
  address_en: string | null
  phone: string | null
  google_maps_url: string | null
  latitude: number | null
  longitude: number | null
  opening_hours: Record<string, any>
  special_hours: Record<string, any>
  config: Record<string, any>
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface BranchAlias {
  id: string
  branch_id: string
  alias: string
  alias_type: 'thai' | 'english' | 'nickname' | 'misspelling' | 'landmark'
  priority: number
  is_active: boolean
  created_at: string
}

export interface Stylist {
  id: string
  branch_id: string
  name_th: string
  nickname_en: string | null
  gender: string | null
  specialties: string[]
  photo_url: string | null
  weekly_schedule: Record<string, any>
  is_active: boolean
  created_at: string
  updated_at: string
}

// ============================================
// EMPLOYEES & ADMIN
// ============================================
export interface Employee {
  id: string
  email: string
  phone: string | null
  name: string
  nickname: string | null
  pin_hash: string | null
  role: 'super_admin' | 'admin' | 'manager' | 'staff' | 'read_only'
  branch_ids: string[]
  permissions: Record<string, any>
  notification_channel: 'line' | 'email' | 'both'
  notification_line_id: string | null
  notification_email: string | null
  is_active: boolean
  last_login_at: string | null
  deleted_at: string | null
  created_at: string
  updated_at: string
}

export interface EmployeeAuditLog {
  id: string
  employee_id: string | null
  employee_name: string | null
  action: string
  entity_type: string | null
  entity_id: string | null
  branch_id: string | null
  before_data: Record<string, any> | null
  after_data: Record<string, any> | null
  ip_address: string | null
  user_agent: string | null
  notes: string | null
  created_at: string
}

// ============================================
// SUPPORT & AUTOMATION
// ============================================
export interface HandoverSession {
  id: string
  conversation_id: string
  branch_id: string | null
  employee_id: string | null
  reason: string
  priority: 'normal' | 'high' | 'urgent'
  trigger_message_id: string | null
  summary: string | null
  resolution_notes: string | null
  resolution_outcome: 'resolved' | 'customer_left' | 'escalated' | 'spam' | 'other' | null
  started_at: string
  taken_over_at: string | null
  ended_at: string | null
  created_at: string
}

export interface FaqIntent {
  id: string
  intent: string
  keywords: string[]
  response_template: string
  skip_llm: boolean
  category: string | null
  priority: number
  is_active: boolean
  created_at: string
}
