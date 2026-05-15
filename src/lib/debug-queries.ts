// Debug utility to test individual Supabase queries
import { supabase, isSupabaseConfigured } from './supabase'

export const debugQueries = {
  // Test if Supabase is configured
  async testConnection() {
    console.log('🔍 Testing Supabase connection...')
    if (!isSupabaseConfigured) {
      console.error('❌ Supabase not configured - missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY')
      return false
    }

    try {
      const { error } = await supabase
        .from('customers')
        .select('id')
        .limit(1)

      if (error) {
        console.error('❌ Query failed:', error.message)
        console.error('   Code:', error.code)
        console.error('   Details:', error.details)
        return false
      }

      console.log('✅ Connection successful - queries can reach Supabase')
      return true
    } catch (error) {
      console.error('❌ Connection error:', error)
      return false
    }
  },

  // Test customers table with detailed info
  async testCustomers() {
    console.log('\n📊 Testing CUSTOMERS table...')
    try {
      const { data, error, count } = await supabase
        .from('customers')
        .select('*', { count: 'exact' })
        .limit(5)

      if (error) {
        console.error('❌ Error:', error.message)
        console.error('   Code:', error.code)
        return { error: error.message, data: null, count: 0 }
      }

      console.log(`   Total: ${count} rows | Retrieved: ${data?.length || 0} rows`)
      if (data && data.length > 0) {
        console.log('   First record:')
        console.table(data[0])
      } else {
        console.warn('   ⚠️ Table exists but contains no data')
      }
      return { data, count, error: null }
    } catch (error) {
      console.error('❌ Error:', error)
      return { error: String(error), data: null, count: 0 }
    }
  },

  // Test conversations table
  async testConversations() {
    console.log('\n💬 Testing CONVERSATIONS table...')
    try {
      const { data, error, count } = await supabase
        .from('conversations')
        .select('*', { count: 'exact' })
        .limit(5)

      if (error) {
        console.error('❌ Error:', error.message)
        return { error: error.message, data: null, count: 0 }
      }

      console.log(`   Total: ${count} rows | Retrieved: ${data?.length || 0} rows`)
      if (data && data.length > 0) {
        console.log('   First record:')
        console.table(data[0])
      } else {
        console.warn('   ⚠️ Table exists but contains no data')
      }
      return { data, count, error: null }
    } catch (error) {
      console.error('❌ Error:', error)
      return { error: String(error), data: null, count: 0 }
    }
  },

  // Test messages table
  async testMessages() {
    console.log('\n✉️ Testing MESSAGES table...')
    try {
      const { data, error, count } = await supabase
        .from('messages')
        .select('*', { count: 'exact' })
        .limit(5)

      if (error) {
        console.error('❌ Error:', error.message)
        return { error: error.message, data: null, count: 0 }
      }

      console.log(`   Total: ${count} rows | Retrieved: ${data?.length || 0} rows`)
      if (data && data.length > 0) {
        console.log('   First record:')
        console.table(data[0])
      } else {
        console.warn('   ⚠️ Table exists but contains no data')
      }
      return { data, count, error: null }
    } catch (error) {
      console.error('❌ Error:', error)
      return { error: String(error), data: null, count: 0 }
    }
  },

  // Test bookings table
  async testBookings() {
    console.log('\n📅 Testing BOOKINGS table...')
    try {
      const { data, error, count } = await supabase
        .from('bookings')
        .select('*', { count: 'exact' })
        .limit(5)

      if (error) {
        console.error('❌ Error:', error.message)
        return { error: error.message, data: null, count: 0 }
      }

      console.log(`   Total: ${count} rows | Retrieved: ${data?.length || 0} rows`)
      if (data && data.length > 0) {
        console.log('   First record:')
        console.table(data[0])
      } else {
        console.warn('   ⚠️ Table exists but contains no data')
      }
      return { data, count, error: null }
    } catch (error) {
      console.error('❌ Error:', error)
      return { error: String(error), data: null, count: 0 }
    }
  },

  // Test branches table
  async testBranches() {
    console.log('\n🏢 Testing BRANCHES table...')
    try {
      const { data, error, count } = await supabase
        .from('branches')
        .select('*', { count: 'exact' })

      if (error) {
        console.error('❌ Error:', error.message)
        return { error: error.message, data: null, count: 0 }
      }

      console.log(`   Total: ${count} rows | Retrieved: ${data?.length || 0} rows`)
      if (data && data.length > 0) {
        console.log('   All records:')
        console.table(data)
      } else {
        console.warn('   ⚠️ Table exists but contains no data')
      }
      return { data, count, error: null }
    } catch (error) {
      console.error('❌ Error:', error)
      return { error: String(error), data: null, count: 0 }
    }
  },

  // Check Row Level Security status
  async checkRLS() {
    console.log('\n🔐 Checking RLS Configuration...')
    console.log('   To diagnose RLS issues:')
    console.log('   1. Go to Supabase Dashboard → Authentication → Policies')
    console.log('   2. Check if policies are blocking SELECT on anon key')
    console.log('   3. For development, you can disable RLS temporarily')
    console.log('   4. Or ensure policies allow: SELECT for authenticated users')
  },

  // Run all tests
  async runAll() {
    console.log('=' .repeat(60))
    console.log('🚀 SUPABASE DIAGNOSTICS')
    console.log('=' .repeat(60))

    const connection = await this.testConnection()

    if (!connection) {
      console.log('\n⚠️ Cannot connect to Supabase')
      console.log('   Check your VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY')
      return
    }

    await this.testCustomers()
    await this.testConversations()
    await this.testMessages()
    await this.testBookings()
    await this.testBranches()

    console.log('\n' + '='.repeat(60))
    console.log('SUMMARY:')
    console.log('=' .repeat(60))
    console.log('✅ Connection: Working')
    console.log('❓ Data: Check counts above')
    console.log('   - If all counts are 0: No data in database yet')
    console.log('   - If errors appear: Check RLS policies')
    console.log('\n💡 Next steps:')
    console.log('   1. Add test data in Supabase dashboard')
    console.log('   2. Or check Row Level Security: debugQueries.checkRLS()')
    console.log('='.repeat(60))
  },
}

// Make globally available in browser console
if (typeof window !== 'undefined') {
  ;(window as any).debugQueries = debugQueries
}
