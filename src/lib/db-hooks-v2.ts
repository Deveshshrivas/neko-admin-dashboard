import { supabase, isSupabaseConfigured } from './supabase'
import { getCurrentBranch } from './schema'
import type {
  Customer,
  Conversation,
  Message,
  Booking,
  Branch,
  Stylist,
  Service,
  Employee,
  ChannelAccount,
  Promotion,
  FaqIntent,
  HandoverSession,
  BranchAlias,
} from './types'

// ============================================
// CUSTOMERS
// ============================================
export async function fetchCustomers(page = 1, searchTerm = '', branchId?: string) {
  if (!isSupabaseConfigured) return { data: [], count: 0 }

  const pageSize = 10
  const start = (page - 1) * pageSize
  const end = start + pageSize - 1

  let query = supabase
    .from('customers')
    .select('*', { count: 'exact' })

  if (searchTerm) {
    query = query.or(
      `name.ilike.%${searchTerm}%,phone.ilike.%${searchTerm}%,email.ilike.%${searchTerm}%`
    )
  }

  if (branchId) {
    query = query.eq('preferred_branch_id', branchId)
  }

  const { data, error, count } = await query.range(start, end).order('created_at', { ascending: false })

  if (error) throw error
  return { data: (data as Customer[]) || [], count: count || 0 }
}

export async function fetchCustomerById(id: string) {
  if (!isSupabaseConfigured) return null

  const { data, error } = await supabase
    .from('customers')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw error
  return (data as Customer) || null
}

// ============================================
// CONVERSATIONS
// ============================================
export async function fetchConversations(page = 1, status = '', searchTerm = '', branchId?: string) {
  if (!isSupabaseConfigured) return { data: [], count: 0 }

  const branch = branchId || getCurrentBranch()
  const pageSize = 10
  const start = (page - 1) * pageSize
  const end = start + pageSize - 1

  let query = supabase
    .from('conversations')
    .select('*', { count: 'exact' })

  if (branch) {
    query = query.eq('branch_id', branch)
  }

  if (status) {
    query = query.eq('status', status)
  }

  if (searchTerm) {
    // Search in related customer phone
    query = query.or(`customer_id.ilike.%${searchTerm}%`)
  }

  const { data, error, count } = await query.range(start, end).order('created_at', { ascending: false })

  if (error) throw error
  return { data: (data as Conversation[]) || [], count: count || 0 }
}

export async function fetchConversationById(id: string) {
  if (!isSupabaseConfigured) return null

  const { data, error } = await supabase
    .from('conversations')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw error
  return (data as Conversation) || null
}

// ============================================
// MESSAGES
// ============================================
export async function fetchMessages(conversationId: string, page = 1) {
  if (!isSupabaseConfigured) return { data: [], count: 0 }

  const pageSize = 20
  const start = (page - 1) * pageSize
  const end = start + pageSize - 1

  const { data, error, count } = await supabase
    .from('messages')
    .select('*', { count: 'exact' })
    .eq('conversation_id', conversationId)
    .range(start, end)
    .order('created_at', { ascending: false })

  if (error) throw error
  return { data: (data as Message[]) || [], count: count || 0 }
}

export async function fetchMessagesByStatus(status: string, page = 1, searchTerm = '') {
  if (!isSupabaseConfigured) return { data: [], count: 0 }

  const pageSize = 10
  const start = (page - 1) * pageSize
  const end = start + pageSize - 1

  let query = supabase
    .from('messages')
    .select('*', { count: 'exact' })
    .eq('processing_status', status)

  if (searchTerm) {
    query = query.ilike('content_text', `%${searchTerm}%`)
  }

  const { data, error, count } = await query.range(start, end).order('created_at', { ascending: false })

  if (error) throw error
  return { data: (data as Message[]) || [], count: count || 0 }
}

// ============================================
// BOOKINGS
// ============================================
export async function fetchBookings(page = 1, status = '', searchTerm = '', branchId?: string) {
  if (!isSupabaseConfigured) return { data: [], count: 0 }

  const branch = branchId || getCurrentBranch()
  const pageSize = 10
  const start = (page - 1) * pageSize
  const end = start + pageSize - 1

  let query = supabase
    .from('bookings')
    .select('*', { count: 'exact' })

  if (branch) {
    query = query.eq('branch_id', branch)
  }

  if (status) {
    query = query.eq('status', status)
  }

  if (searchTerm) {
    query = query.or(`code.ilike.%${searchTerm}%`)
  }

  const { data, error, count } = await query.range(start, end).order('start_at', { ascending: false })

  if (error) throw error
  return { data: (data as Booking[]) || [], count: count || 0 }
}

export async function fetchBookingById(id: string) {
  if (!isSupabaseConfigured) return null

  const { data, error } = await supabase
    .from('bookings')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw error
  return (data as Booking) || null
}

export async function fetchUpcomingBookings(branchId?: string, daysAhead = 7) {
  if (!isSupabaseConfigured) return []

  const branch = branchId || getCurrentBranch()
  const now = new Date()
  const futureDate = new Date(now.getTime() + daysAhead * 24 * 60 * 60 * 1000)

  let query = supabase
    .from('bookings')
    .select('*')
    .gte('start_at', now.toISOString())
    .lte('start_at', futureDate.toISOString())
    .neq('status', 'cancelled')

  if (branch) {
    query = query.eq('branch_id', branch)
  }

  const { data, error } = await query.order('start_at', { ascending: true })

  if (error) throw error
  return (data as Booking[]) || []
}

// ============================================
// BRANCHES
// ============================================
export async function fetchBranches() {
  if (!isSupabaseConfigured) return { data: [], count: 0 }

  const { data, error, count } = await supabase
    .from('branches')
    .select('*', { count: 'exact' })
    .order('name_en', { ascending: true })

  if (error) throw error
  return { data: (data as Branch[]) || [], count: count || 0 }
}

export async function fetchBranchById(id: string) {
  if (!isSupabaseConfigured) return null

  const { data, error } = await supabase
    .from('branches')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw error
  return (data as Branch) || null
}

export async function fetchBranchAliases(branchId: string) {
  if (!isSupabaseConfigured) return []

  const { data, error } = await supabase
    .from('branch_aliases')
    .select('*')
    .eq('branch_id', branchId)
    .order('priority', { ascending: true })

  if (error) throw error
  return (data as BranchAlias[]) || []
}

// ============================================
// STYLISTS
// ============================================
export async function fetchStylists(branchId?: string) {
  if (!isSupabaseConfigured) return { data: [], count: 0 }

  let query = supabase
    .from('stylists')
    .select('*', { count: 'exact' })
    .eq('is_active', true)

  if (branchId) {
    query = query.eq('branch_id', branchId)
  }

  const { data, error, count } = await query.order('name_th', { ascending: true })

  if (error) throw error
  return { data: (data as Stylist[]) || [], count: count || 0 }
}

export async function fetchStylistById(id: string) {
  if (!isSupabaseConfigured) return null

  const { data, error } = await supabase
    .from('stylists')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw error
  return (data as Stylist) || null
}

// ============================================
// SERVICES
// ============================================
export async function fetchServices(page = 1, category = '', searchTerm = '') {
  if (!isSupabaseConfigured) return { data: [], count: 0 }

  const pageSize = 15
  const start = (page - 1) * pageSize
  const end = start + pageSize - 1

  let query = supabase
    .from('services')
    .select('*', { count: 'exact' })
    .eq('is_active', true)

  if (category) {
    query = query.eq('category', category)
  }

  if (searchTerm) {
    query = query.or(`name_th.ilike.%${searchTerm}%,name_en.ilike.%${searchTerm}%`)
  }

  const { data, error, count } = await query.range(start, end).order('display_order', { ascending: true })

  if (error) throw error
  return { data: (data as Service[]) || [], count: count || 0 }
}

export async function fetchServiceBySlug(slug: string) {
  if (!isSupabaseConfigured) return null

  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error) throw error
  return (data as Service) || null
}

export async function fetchServiceCategories() {
  if (!isSupabaseConfigured) return []

  const { data, error } = await supabase
    .from('services')
    .select('category')
    .eq('is_active', true)

  if (error) throw error
  const categories = ((data || []) as Array<{ category: string | null }>)
    .map((row) => row.category)
    .filter((category): category is string => Boolean(category))

  return [...new Set(categories)]
}

// ============================================
// PROMOTIONS
// ============================================
export async function fetchActivePromotions(branchId?: string) {
  if (!isSupabaseConfigured) return []

  const now = new Date().toISOString()

  let query = supabase
    .from('promotions')
    .select('*')
    .eq('is_active', true)
    .gte('valid_from', now)
    .or(`valid_until.is.null,valid_until.gte.${now}`)

  if (branchId) {
    query = query.contains('target_branches', [branchId])
  }

  const { data, error } = await query.order('valid_from', { ascending: false })

  if (error) throw error
  return (data as Promotion[]) || []
}

// ============================================
// EMPLOYEES
// ============================================
export async function fetchEmployees(branchId?: string) {
  if (!isSupabaseConfigured) return { data: [], count: 0 }

  let query = supabase
    .from('employees')
    .select('*', { count: 'exact' })
    .eq('is_active', true)
    .is('deleted_at', null)

  if (branchId) {
    query = query.contains('branch_ids', [branchId])
  }

  const { data, error, count } = await query.order('name', { ascending: true })

  if (error) throw error
  return { data: (data as Employee[]) || [], count: count || 0 }
}

export async function fetchEmployeeById(id: string) {
  if (!isSupabaseConfigured) return null

  const { data, error } = await supabase
    .from('employees')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw error
  return (data as Employee) || null
}

// ============================================
// HANDOVER SESSIONS
// ============================================
export async function fetchHandoverSessions(page = 1, branchId?: string, status?: string) {
  if (!isSupabaseConfigured) return { data: [], count: 0 }

  const pageSize = 10
  const start = (page - 1) * pageSize
  const end = start + pageSize - 1

  let query = supabase
    .from('handover_sessions')
    .select('*', { count: 'exact' })

  if (branchId) {
    query = query.eq('branch_id', branchId)
  }

  if (status === 'active') {
    query = query.is('ended_at', null)
  } else if (status === 'closed') {
    query = query.not('ended_at', 'is', null)
  }

  const { data, error, count } = await query.range(start, end).order('started_at', { ascending: false })

  if (error) throw error
  return { data: (data as HandoverSession[]) || [], count: count || 0 }
}

export async function fetchLatestHandoverSessionByConversation(conversationId: string) {
  if (!isSupabaseConfigured) return null

  const { data, error } = await supabase
    .from('handover_sessions')
    .select('*')
    .eq('conversation_id', conversationId)
    .order('started_at', { ascending: false })
    .limit(1)

  if (error) throw error
  return ((data as HandoverSession[]) || [])[0] || null
}

// ============================================
// FAQ INTENTS
// ============================================
export async function fetchFaqIntents(searchTerm = '') {
  if (!isSupabaseConfigured) return []

  let query = supabase
    .from('faq_intents')
    .select('*')
    .eq('is_active', true)

  if (searchTerm) {
    query = query.or(`intent.ilike.%${searchTerm}%,response_template.ilike.%${searchTerm}%`)
  }

  const { data, error } = await query.order('priority', { ascending: false })

  if (error) throw error
  return (data as FaqIntent[]) || []
}

// ============================================
// DASHBOARD STATISTICS
// ============================================
export async function fetchDashboardStats(branchId?: string) {
  if (!isSupabaseConfigured) {
    return {
      totalCustomers: 0,
      activeConversations: 0,
      pendingBookings: 0,
      completedBookings: 0,
      activeHandovers: 0,
      totalMessages: 0,
    }
  }

  const branch = branchId || getCurrentBranch()

  try {
    const queries = [
      supabase.from('customers').select('id', { count: 'exact' }),
      supabase
        .from('conversations')
        .select('id', { count: 'exact' })
        .eq('status', 'active_bot'),
      supabase
        .from('bookings')
        .select('id', { count: 'exact' })
        .eq('status', 'pending'),
      supabase
        .from('bookings')
        .select('id', { count: 'exact' })
        .eq('status', 'completed'),
      supabase
        .from('handover_sessions')
        .select('id', { count: 'exact' })
        .is('ended_at', null),
      supabase.from('messages').select('id', { count: 'exact' }),
    ]

    const results = await Promise.all(queries)

    const stats = {
      totalCustomers: results[0].count || 0,
      activeConversations: results[1].count || 0,
      pendingBookings: results[2].count || 0,
      completedBookings: results[3].count || 0,
      activeHandovers: results[4].count || 0,
      totalMessages: results[5].count || 0,
    }

    // Filter by branch if specified
    if (branch) {
      const branchQueries = [
        supabase
          .from('conversations')
          .select('id', { count: 'exact' })
          .eq('branch_id', branch)
          .eq('status', 'active_bot'),
        supabase
          .from('bookings')
          .select('id', { count: 'exact' })
          .eq('branch_id', branch)
          .eq('status', 'pending'),
      ]

      const branchResults = await Promise.all(branchQueries)
      stats.activeConversations = branchResults[0].count || 0
      stats.pendingBookings = branchResults[1].count || 0
    }

    return stats
  } catch (error) {
    console.error('Error fetching dashboard stats:', error)
    return {
      totalCustomers: 0,
      activeConversations: 0,
      pendingBookings: 0,
      completedBookings: 0,
      activeHandovers: 0,
      totalMessages: 0,
    }
  }
}

// ============================================
// CHANNEL ACCOUNTS
// ============================================
export async function fetchChannelAccounts(branchId?: string) {
  if (!isSupabaseConfigured) return { data: [], count: 0 }

  let query = supabase
    .from('channel_accounts')
    .select('*', { count: 'exact' })
    .eq('is_active', true)

  if (branchId) {
    query = query.or(`branch_id.eq.${branchId},branch_id.is.null`)
  }

  const { data, error, count } = await query.order('display_name', { ascending: true })

  if (error) throw error
  return { data: (data as ChannelAccount[]) || [], count: count || 0 }
}
