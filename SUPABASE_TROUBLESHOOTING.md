# 🔧 Supabase Data Fetching - Troubleshooting Guide

## Issues Fixed

### 1. **Column Name Mismatches**
Your schema.ts had column names that didn't match the actual Supabase database structure:

| Component | Wrong Name | Correct Name |
|-----------|-----------|------------|
| Customers | `vip` | `is_vip` |
| Customers | `member` | `is_member` |
| Customers | `credit` | `available_credit_thb` |
| Bookings | `booking_code` | `code` |
| Bookings | `appointment_time` | `start_at` |
| Messages | `content` | `content_text` |
| Messages | `status` | `processing_status` |
| Conversations | `start_time` | `started_at` |
| Conversations | `end_time` | `closed_at` |

### 2. **Files Modified**
✅ `src/lib/schema.ts` - Updated all column definitions
✅ `src/lib/db-hooks.ts` - Updated queries to use correct columns
✅ `src/pages/Bookings.tsx` - Updated field names
✅ `src/pages/Customers.tsx` - Updated field names and filters
✅ `src/pages/Messages.tsx` - Updated field names
✅ `src/pages/Conversations.tsx` - Updated field names

### 3. **New Debug Utility**
Created `src/lib/debug-queries.ts` to help diagnose issues.

## How to Test

### Method 1: Use Debug Console (Recommended)
1. Start your app: `npm run dev`
2. Open browser DevTools (F12)
3. In Console, run:
   ```javascript
   // Test connection
   await debugQueries.testConnection()
   
   // Test all tables
   await debugQueries.runAll()
   
   // Test individual tables
   await debugQueries.testCustomers()
   await debugQueries.testConversations()
   await debugQueries.testMessages()
   await debugQueries.testBookings()
   await debugQueries.testBranches()
   ```

4. Check console output for ✅ (success) or ❌ (error)

### Method 2: Check Network Requests
1. Open DevTools → Network tab
2. Navigate to Customers/Bookings/Messages pages
3. Look for requests to `supabase.co` API
4. Successful responses should show `200` status
5. Check response body for actual data

### Method 3: Browser Console Errors
1. Open DevTools → Console tab
2. Look for red error messages
3. Common errors:
   - `Column not found` - Column name mismatch (should be fixed)
   - `Permission denied` - Row Level Security issue
   - `Network error` - Connectivity problem

## Common Remaining Issues & Fixes

### Issue: Still seeing empty data tables
**Solution:**
1. Verify Supabase URL and key in `.env.local`
2. Run `debugQueries.testConnection()` in console
3. Check Supabase dashboard - does data actually exist?
4. Look for console errors during fetch

### Issue: "Permission denied" errors
**Solution:**
1. Check Supabase RLS (Row Level Security) policies
2. Go to Supabase Dashboard → Authentication → Policies
3. For development, you may need to disable RLS or create policies
4. Ensure anon key has SELECT permissions

### Issue: 401 Unauthorized
**Solution:**
1. Check `.env.local` has correct `VITE_SUPABASE_ANON_KEY`
2. Verify the key in Supabase Settings → API
3. Try logging out and back in

### Issue: 404 Table not found
**Solution:**
1. Verify table names in `schema.ts` TABLES constant
2. Check spelling: `customers`, `bookings`, `messages`, etc.
3. Confirm tables exist in Supabase dashboard

## Verification Checklist

- [ ] Run `debugQueries.testConnection()` - returns ✅
- [ ] All debug tests pass with ✅
- [ ] Customers page loads data
- [ ] Bookings page loads data
- [ ] Messages page loads data
- [ ] Conversations page loads data
- [ ] Filters work (search, status)
- [ ] Pagination works
- [ ] Browser console has no red errors

## If Still Not Working

1. **Export Debug Info:**
   ```javascript
   // In browser console, get debug data
   const tests = {
     connection: await debugQueries.testConnection(),
     customers: await debugQueries.testCustomers(),
     bookings: await debugQueries.testBookings(),
   }
   console.log(JSON.stringify(tests, null, 2))
   ```

2. **Check Supabase Settings:**
   - Project URL matches `VITE_SUPABASE_URL`
   - Anon key matches `VITE_SUPABASE_ANON_KEY`
   - RLS policies allow read access
   - Tables have actual data

3. **Reset Environment:**
   ```bash
   # Clear node_modules and reinstall
   rm -r node_modules
   npm install
   
   # Restart dev server
   npm run dev
   ```

## Next Steps

1. Test using the debug console method above
2. Run `debugQueries.runAll()` and screenshot any errors
3. If errors occur, they'll clearly indicate the issue
4. Common fixes usually involve RLS policies or data validation
