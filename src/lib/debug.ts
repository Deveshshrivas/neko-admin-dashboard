import { supabase } from './supabase'

// Test script to check Supabase connection and data
export async function testSupabaseConnection() {
  try {
    console.log('🔍 Testing Supabase Connection...')

    // Test 1: Check customers
    const { data: customers, error: custError, count: custCount } = await supabase
      .from('customers')
      .select('*', { count: 'exact' })
      .limit(5)

    console.log('📊 Customers:', { count: custCount, error: custError, sample: customers?.[0] })

    // Test 2: Check branches
    const { data: branches, error: branchError, count: branchCount } = await supabase
      .from('branches')
      .select('*', { count: 'exact' })
      .limit(5)

    console.log('🏢 Branches:', { count: branchCount, error: branchError, sample: branches?.[0] })

    // Test 3: Check conversations
    const { data: conversations, error: convError, count: convCount } = await supabase
      .from('conversations')
      .select('*', { count: 'exact' })
      .limit(5)

    console.log('💬 Conversations:', { count: convCount, error: convError, sample: conversations?.[0] })

    // Test 4: Check bookings
    const { data: bookings, error: bookError, count: bookCount } = await supabase
      .from('bookings')
      .select('*', { count: 'exact' })
      .limit(5)

    console.log('📅 Bookings:', { count: bookCount, error: bookError, sample: bookings?.[0] })

    console.log('✅ Supabase connection test complete!')
  } catch (error) {
    console.error('❌ Supabase connection test failed:', error)
  }
}
