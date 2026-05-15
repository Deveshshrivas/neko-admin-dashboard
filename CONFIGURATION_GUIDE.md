# 📖 Configuration Guide

## How Does It Work?

The dashboard is **100% configurable** through `.env.local`. No code changes needed.

---

## The Problem It Solves

### Before (Without Configuration)
You would need code like this:

```javascript
// Hardcoded in source code - can't change without editing
const data = await supabase
  .from('customers')  // Fixed table name
  .select('id, name, phone, email, vip, member, credit, tags')
```

**Problems:**
- Table name is hardcoded as `customers`
- If your table is named `users` or `profiles`, code breaks
- Every new column name requires code change
- Non-technical users can't configure it

### After (With Configuration System)
Everything goes in `.env.local`:

```env
VITE_TABLE_CUSTOMERS=customers      # or: users, profiles, anything
VITE_COL_CUSTOMER_ID=id             # or: user_id, customer_id, anything
VITE_COL_CUSTOMER_NAME=name         # or: full_name, customer_name, anything
```

Then code uses these values:

```javascript
// Dynamically reads from .env
const tableName = import.meta.env.VITE_TABLE_CUSTOMERS
const colName = import.meta.env.VITE_COL_CUSTOMER_NAME

const data = await supabase
  .from(tableName)      // Reads from .env: "customers"
  .select(`${colId}, ${colName}`)  // Reads from .env
```

**Benefits:**
- ✅ Works with ANY table name
- ✅ Works with ANY column name
- ✅ Non-technical users can configure
- ✅ No code changes needed
- ✅ Easy to switch between databases

---

## How Configuration Works

### 3-Step Process

```
1. User creates .env.local
   ↓
2. Application reads it at startup
   ↓
3. All pages use configured values
```

### The Files Involved

**`.env.example`** (Template)
- Comprehensive template with all possible settings
- You copy this to `.env.local`

**`.env.local`** (Your Configuration - DO NOT SHARE)
- YOUR actual configuration with YOUR database info
- Read by Vite at build time
- Variables accessible as `import.meta.env.VITE_*`
- NEVER commit to git

**`src/lib/schema.ts`** (Configuration Hub)
- Reads all environment variables
- Provides `TABLES` object with table names
- Provides `COLS_*` objects with column names
- Used by all pages and database functions

**`src/lib/db-hooks.ts`** (Database Layer)
- Uses `schema.ts` constants
- Builds dynamic queries with actual table/column names
- Used by all pages for data fetching

**Page Components** (e.g., `Dashboard.tsx`)
- Never hardcode table/column names
- Import and use values from `schema.ts`
- Automatically work with any database structure

---

## File Inventory

### What Was Added/Modified

**Configuration Files:**
- `.env.example` (100+ lines) - Expanded with 60+ variables

**New Source Files:**
- `src/lib/schema.ts` (130 lines) - Configuration hub
- `src/lib/db-hooks.ts` (150+ lines) - Database functions using configuration

**Updated Source Files:**
- `src/pages/*.tsx` - All use configuration system
- `src/components/Layout.tsx` - Navigation with configuration

### What Files Read Configuration

```
schema.ts ← reads .env
  ├→ db-hooks.ts ← uses schema.ts
  ├→ Dashboard.tsx ← uses schema.ts
  ├→ Conversations.tsx ← uses schema.ts
  ├→ Bookings.tsx ← uses schema.ts
  ├→ Messages.tsx ← uses schema.ts
  ├→ Customers.tsx ← uses schema.ts
  ├→ Errors.tsx ← uses schema.ts
  └→ Settings.tsx ← uses schema.ts
```

---

## Configuration Sections

### 1. Supabase Connection (2 variables)
```env
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...
```

### 2. Table Names (7 variables)
```env
VITE_TABLE_CUSTOMERS=customers
VITE_TABLE_CONVERSATIONS=conversations
VITE_TABLE_MESSAGES=messages
VITE_TABLE_BOOKINGS=bookings
VITE_TABLE_BRANCHES=branches
VITE_TABLE_SERVICES=services
VITE_TABLE_WORKFLOW_ERRORS=workflow_errors
```

### 3. Column Names (70+ variables)
Organized by table:
```env
# Customer columns
VITE_COL_CUSTOMER_ID=id
VITE_COL_CUSTOMER_NAME=name
VITE_COL_CUSTOMER_PHONE=phone
# ... 12 columns

# Conversation columns
VITE_COL_CONVERSATION_ID=id
VITE_COL_CONVERSATION_STATUS=status
# ... 9 columns

# ... similar for Message, Booking, Branch, Service, Error tables
```

### 4. App Configuration (4 variables)
```env
VITE_APP_TIMEZONE=Asia/Kolkata
VITE_APP_REFRESH_INTERVAL=30000
VITE_APP_THEME=light
VITE_APP_LANGUAGE=en
```

### 5. n8n Configuration (1 variable)
```env
VITE_N8N_URL=https://n8n.example.com
```

---

## How to Update Configuration

### Step 1: Find Your Value
```
Go to Supabase → Tables
See table name: "customers"
```

### Step 2: Update .env.local
```env
# Before:
VITE_TABLE_CUSTOMERS=customers

# After (if your table is named differently):
VITE_TABLE_CUSTOMERS=salon_customers
```

### Step 3: Restart Dev Server
```bash
npm run dev
```

### That's It!
All pages automatically use the new value.

---

## Fallback Values

If you don't set a variable, code uses defaults:

```typescript
// In schema.ts
const tableName = getEnv('VITE_TABLE_CUSTOMERS', 'customers')
//                                               ↑ fallback value
```

**Defaults match common naming conventions:**
- Tables: `customers`, `conversations`, `messages`, `bookings`, `branches`, `services`, `workflow_errors`
- Columns: `id`, `name`, `phone`, `email`, `status`, `created_at`, `updated_at`, etc.

If your database uses these standard names, you might not need to change everything!

---

## Security

### What's Safe to Share
- `.env.example` ✅ It's just a template

### What's NOT Safe to Share
- `.env.local` ❌ Contains your Supabase API key
- `.env.*.local` ❌ Environment-specific secrets
- `.env.*.production` ❌ Production secrets

### Best Practice
```bash
# .gitignore
.env.local
.env.*.local
.env.production.local
```

---

## Troubleshooting Configuration

### Problem: "Column doesn't exist"
**Cause:** Column name in `.env.local` doesn't match Supabase
**Fix:** 
1. Go to Supabase → Tables → Click your table
2. Copy exact column name
3. Paste in `.env.local`

### Problem: "Table doesn't exist"
**Cause:** Table name doesn't match
**Fix:**
1. Go to Supabase → Tables
2. Copy exact table name
3. Paste in `.env.local`

### Problem: "Still not working after update"
**Fix:**
1. Save `.env.local`
2. Restart dev server: Ctrl+C then `npm run dev`
3. Hard refresh browser: Ctrl+Shift+R

---

## Advanced: Adding New Columns

If your table has columns the template doesn't include:

1. Add to `.env.example`:
```env
VITE_COL_CUSTOMER_CUSTOM_FIELD=custom_field
```

2. Add to `.env.local`:
```env
VITE_COL_CUSTOMER_CUSTOM_FIELD=my_custom_column
```

3. Add to `src/lib/schema.ts`:
```typescript
export const COLS_CUSTOMER = {
  // ... existing columns
  customField: getEnv('VITE_COL_CUSTOMER_CUSTOM_FIELD', 'custom_field'),
}
```

4. Use in page components:
```typescript
import { COLS_CUSTOMER } from '../lib/schema'

const data = await supabase
  .from(TABLES.CUSTOMERS)
  .select(`${COLS_CUSTOMER.id}, ${COLS_CUSTOMER.customField}`)
```

---

## Summary

✅ **Everything is configurable** - Just update `.env.local`
✅ **No code changes** - Change names without touching code
✅ **Organized structure** - schema.ts is the hub
✅ **Dynamic queries** - Pages use configured values
✅ **Secure** - Don't share `.env.local`
✅ **Simple** - Easy for non-technical users

---

**Configuration = Freedom** 🎉

No more hardcoding. Just fill in `.env.local` and go!
