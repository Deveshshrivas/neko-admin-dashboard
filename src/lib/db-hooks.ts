import { supabase, isSupabaseConfigured } from './supabase'
import {
  TABLES,
  COLS_CUSTOMER,
  COLS_CONVERSATION,
  COLS_MESSAGE,
  COLS_BOOKING,
  COLS_BRANCH,
  COLS_ERROR,
  getCurrentBranch,
} from './schema'

interface BranchSummary {
  id: string
  name: string
  name_en?: string
}

// Fetch conversations with filters (WITH BRANCH)
export async function useConversations(page = 1, status = '', searchTerm = '', branchId?: string | null) {
  if (!isSupabaseConfigured) {
    return { data: [], count: 0 }
  }

  const branch = branchId === undefined ? getCurrentBranch() : branchId
  const pageSize = 10
  const start = (page - 1) * pageSize
  const end = start + pageSize - 1

  let query = supabase
    .from(TABLES.CONVERSATIONS)
    .select('*', { count: 'exact' })

  // Only filter by branch if branch is not explicitly null/empty and not the special "all" value
  if (branch && branch !== 'all') {
    query = query.eq(COLS_CONVERSATION.branch_id, branch)
  }

  if (status) {
    query = query.eq(COLS_CONVERSATION.status, status)
  }

  if (searchTerm) {
    // Search by customer_id since phone is not directly on conversations
    query = query.or(
      `${COLS_CONVERSATION.customer_id}.ilike.%${searchTerm}%`
    )
  }

  const { data, error, count } = await query.range(start, end).order(COLS_CONVERSATION.created_at, { ascending: false })

  if (error) throw error
  return { data: data || [], count: count || 0 }
}

// Fetch customers with pagination and search
export async function useCustomers(page = 1, pageSize = 10, searchTerm = '') {
  if (!isSupabaseConfigured) {
    return { data: [], count: 0 }
  }

  const start = (page - 1) * pageSize
  const end = start + pageSize - 1

  let query = supabase
    .from(TABLES.CUSTOMERS)
    .select(
      `${COLS_CUSTOMER.id}, ${COLS_CUSTOMER.name}, ${COLS_CUSTOMER.phone}, ${COLS_CUSTOMER.email}, ${COLS_CUSTOMER.is_vip}, ${COLS_CUSTOMER.is_member}, ${COLS_CUSTOMER.available_credit_thb}, ${COLS_CUSTOMER.created_at}`,
      { count: 'exact' }
    )

  if (searchTerm) {
    query = query.or(
      `${COLS_CUSTOMER.name}.ilike.%${searchTerm}%,${COLS_CUSTOMER.phone}.ilike.%${searchTerm}%,${COLS_CUSTOMER.email}.ilike.%${searchTerm}%`
    )
  }

  const { data, error, count } = await query.range(start, end).order(COLS_CUSTOMER.created_at, { ascending: false })

  if (error) throw error
  return { data: data || [], count: count || 0 }
}

// Fetch all branches
export async function useBranches() {
  if (!isSupabaseConfigured) {
    return { data: [], count: 0 }
  }

  const { data, error, count } = await supabase
    .from(TABLES.BRANCHES)
    .select(`${COLS_BRANCH.id}, ${COLS_BRANCH.name_en}`, { count: 'exact' })
    .order(COLS_BRANCH.name_en, { ascending: true })

  if (error) throw error
  
  // Map name_en to name for compatibility
  const rows = (data || []) as unknown as Array<Omit<BranchSummary, 'name'>>
  const mappedData: BranchSummary[] = rows.map((item) => ({
    ...item,
    name: item.name_en || '',
  }))
  
  return { data: mappedData, count: count || 0 }
}

// Fetch bookings with pagination and filters (WITH BRANCH)
export async function useBookings(page = 1, status = '', searchTerm = '', branchId?: string | null) {
  if (!isSupabaseConfigured) {
    return { data: [], count: 0 }
  }

  const branch = branchId === undefined ? getCurrentBranch() : branchId
  const pageSize = 10
  const start = (page - 1) * pageSize
  const end = start + pageSize - 1

  let query = supabase
    .from(TABLES.BOOKINGS)
    .select(
      `${COLS_BOOKING.id}, ${COLS_BOOKING.code}, ${COLS_BOOKING.status}, ${COLS_BOOKING.start_at}, ${COLS_BOOKING.end_at}, ${COLS_BOOKING.created_at}`,
      { count: 'exact' }
    )

  // Only filter by branch if branch is not explicitly null/empty and not the special "all" value
  if (branch && branch !== 'all') {
    query = query.eq(COLS_BOOKING.branch_id, branch)
  }

  if (status) {
    query = query.eq(COLS_BOOKING.status, status)
  }

  if (searchTerm) {
    query = query.ilike(COLS_BOOKING.code, `%${searchTerm}%`)
  }

  const { data, error, count } = await query.range(start, end).order(COLS_BOOKING.start_at, { ascending: false })

  if (error) throw error
  return { data: data || [], count: count || 0 }
}

// Fetch messages with filters
export async function useMessages(page = 1, direction = '', msgStatus = '', searchTerm = '') {
  if (!isSupabaseConfigured) {
    return { data: [], count: 0 }
  }

  const pageSize = 10
  const start = (page - 1) * pageSize
  const end = start + pageSize - 1

  let query = supabase
    .from(TABLES.MESSAGES)
    .select(
      `${COLS_MESSAGE.id}, ${COLS_MESSAGE.content_text}, ${COLS_MESSAGE.direction}, ${COLS_MESSAGE.processing_status}, ${COLS_MESSAGE.created_at}`,
      { count: 'exact' }
    )

  if (direction) {
    query = query.eq(COLS_MESSAGE.direction, direction)
  }

  if (msgStatus) {
    query = query.eq(COLS_MESSAGE.processing_status, msgStatus)
  }

  if (searchTerm) {
    query = query.ilike(COLS_MESSAGE.content_text, `%${searchTerm}%`)
  }

  const { data, error, count } = await query.range(start, end).order(COLS_MESSAGE.created_at, { ascending: false })

  if (error) throw error
  return { data: data || [], count: count || 0 }
}

// Fetch messages for a specific conversation
export async function useMessagesByConversation(conversationId: string, page = 1, pageSize = 20) {
  if (!isSupabaseConfigured) {
    return { data: [], count: 0 }
  }

  const start = (page - 1) * pageSize
  const end = start + pageSize - 1

  const { data, error, count } = await supabase
    .from(TABLES.MESSAGES)
    .select('*', { count: 'exact' })
    .eq(COLS_MESSAGE.conversation_id, conversationId)
    .range(start, end)
    .order(COLS_MESSAGE.created_at, { ascending: false })

  if (error) throw error
  return { data: data ? [...data].reverse() : [], count: count || 0 }
}

// Fetch errors with filters
export async function useErrors(page = 1, severity = '', searchTerm = '') {
  if (!isSupabaseConfigured) {
    return { data: [], count: 0 }
  }

  const pageSize = 10
  const start = (page - 1) * pageSize
  const end = start + pageSize - 1

  let query = supabase
    .from(TABLES.WORKFLOW_ERRORS)
    .select(
      `${COLS_ERROR.id}, ${COLS_ERROR.timestamp}, ${COLS_ERROR.severity}, ${COLS_ERROR.workflow}, ${COLS_ERROR.message}, ${COLS_ERROR.created_at}`,
      { count: 'exact' }
    )
    .order(COLS_ERROR.timestamp, { ascending: false })

  if (severity) {
    query = query.eq(COLS_ERROR.severity, severity)
  }

  if (searchTerm) {
    query = query.ilike(COLS_ERROR.message, `%${searchTerm}%`)
  }

  const { data, error, count } = await query.range(start, end)

  if (error) throw error
  return { data: data || [], count: count || 0 }
}

// Fetch dashboard statistics (WITH BRANCH)
export async function useDashboardStats(branchId?: string) {
  if (!isSupabaseConfigured) {
    return {
      totalCustomers: 0,
      activeConversations: 0,
      pendingBookings: 0,
      totalMessages: 0,
      criticalErrors: 0,
    }
  }

  const branch = branchId || getCurrentBranch()

  try {
    let convQuery = supabase
      .from(TABLES.CONVERSATIONS)
      .select('id', { count: 'exact' })
      .in(COLS_CONVERSATION.status, ['active_bot', 'human_handling'])

    let bookingQuery = supabase
      .from(TABLES.BOOKINGS)
      .select('id', { count: 'exact' })
      .in(COLS_BOOKING.status, ['pending', 'confirmed', 'in_service'])

    if (branch) {
      convQuery = convQuery.eq(COLS_CONVERSATION.branch_id, branch)
      bookingQuery = bookingQuery.eq(COLS_BOOKING.branch_id, branch)
    }

    const [customers, conversations, bookings, messages, errors] = await Promise.all([
      supabase.from(TABLES.CUSTOMERS).select('id', { count: 'exact' }),
      convQuery,
      bookingQuery,
      supabase.from(TABLES.MESSAGES).select('id', { count: 'exact' }),
      supabase
        .from(TABLES.WORKFLOW_ERRORS)
        .select('id', { count: 'exact' })
        .eq(COLS_ERROR.severity, 'critical'),
    ])

    return {
      totalCustomers: customers.count || 0,
      activeConversations: conversations.count || 0,
      pendingBookings: bookings.count || 0,
      totalMessages: messages.count || 0,
      criticalErrors: errors.count || 0,
    }
  } catch (error) {
    console.error('Error fetching dashboard stats:', error)
    return {
      totalCustomers: 0,
      activeConversations: 0,
      pendingBookings: 0,
      totalMessages: 0,
      criticalErrors: 0,
    }
  }
}
