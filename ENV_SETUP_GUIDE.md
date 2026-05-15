# 📖 Detailed Environment Setup Guide

## Complete Setup Instructions with Examples

---

## Getting Your Supabase Credentials

### Method 1: From Project Settings

**Get URL:**
1. Open https://supabase.com/projects
2. Click your project name
3. Click "Settings" (gear icon, bottom left)
4. Click "API" in left sidebar
5. Under "Config" section, find "Project URL"
6. Copy the URL (looks like: `https://xxxxx.supabase.co`)

**Get API Key:**
1. Same Settings → API page
2. Scroll down to "Project API keys"
3. Click on the row with "anon" (or "public")
4. Click copy icon next to the key
5. The key looks like: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

### Troubleshooting: Can't Find API Page
- Make sure you're logged in to Supabase
- Make sure you clicked the correct project
- Look for "Settings" gear icon at bottom left
- If still missing, create a new project and try again

---

## Finding Your Table Names

### Method 1: From Supabase Dashboard

**Step 1:** Open Supabase → Click your project

**Step 2:** Look for "Tables" in left sidebar

**Step 3:** You'll see a list like:
```
Tables
├── customers
├── conversations
├── messages
├── bookings
├── branches
├── services
└── workflow_errors
```

**Step 4:** Write down exactly what you see (including spelling and case)

### Method 2: Using SQL Query (If Supabase UI not working)

1. Click "SQL Editor" in sidebar
2. Copy-paste this query:
```sql
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;
```
3. Click "Run"
4. You'll see all table names

### What If My Tables Are Named Differently?

If your tables are named:
- `salon_customers` instead of `customers`
- `user_chats` instead of `conversations`
- `sms_logs` instead of `messages`

That's fine! Just update `.env.local` with YOUR actual names.

---

## Finding Your Column Names

### Method 1: Visual Method (Easiest)

**Step 1:** Go to Supabase → Click a table (e.g., "customers")

**Step 2:** You'll see column headers:
```
╔════╦══════╦═══════╦═══════╦══════╗
║ id ║ name ║ phone ║ email ║ tags ║
╚════╩══════╩═══════╩═══════╩══════╝
```

**Step 3:** Write down the exact column names:
- `id`
- `name`
- `phone`
- `email`
- `tags`
- ... (and any others you see)

**Step 4:** Repeat for each table (conversations, messages, bookings, etc.)

### Method 2: SQL Query Method

1. Click "SQL Editor"
2. Copy-paste this query:
```sql
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'customers' 
ORDER BY ordinal_position;
```
Replace `'customers'` with your table name
3. Click "Run"
4. See all columns for that table

### Method 3: Table Info Method

1. Click on a table
2. Click "Table Info" or "i" icon
3. See column names listed

---

## What If My Column Names Are Different?

### Example 1: Different ID Column
**Supabase**: `customer_id` instead of `id`
**Solution**: Update `.env.local`
```env
VITE_COL_CUSTOMER_ID=customer_id
```

### Example 2: Different Name Column
**Supabase**: `full_name` instead of `name`
**Solution**: Update `.env.local`
```env
VITE_COL_CUSTOMER_NAME=full_name
```

### Example 3: Different Status Column
**Supabase**: `chat_status` instead of `status`
**Solution**: Update `.env.local`
```env
VITE_COL_CONVERSATION_STATUS=chat_status
```

### Example 4: Timestamp Named Differently
**Supabase**: `created` instead of `created_at`
**Solution**: Update `.env.local`
```env
VITE_COL_CUSTOMER_CREATED=created
```

---

## Common Column Name Variations

Your database might use these variations:

```
ID columns:              name → name_col
├── id                   ├── full_name
├── customer_id          ├── customer_name
├── user_id              ├── fname + lname
└── cust_id              └── customer_full_name

Contact columns:         Status columns:
├── phone                ├── status
├── phone_number         ├── chat_status
├── mobile               ├── state
└── cell                 └── workflow_state

Timestamp columns:       Relationship columns:
├── created_at           ├── customer_id
├── created              ├── cust_id
├── created_date         ├── user_id
└── creation_time        └── ref_id
```

---

## Complete Step-by-Step Example

Let's say you're setting up for the `customers` table:

### Step 1: Go to Supabase Dashboard
```
https://supabase.com/projects → Your Project
```

### Step 2: Find Connection Info
- Settings → API
- Copy Project URL: `https://abc123.supabase.co`
- Copy API Key: `eyJhbG...`

### Step 3: Find Table Names
- Click "Tables"
- See: customers, conversations, messages, bookings, etc.

### Step 4: Find Customer Columns
- Click "customers" table
- See columns: id, name, phone, email, vip, member, credit, tags, created_at, updated_at

### Step 5: Update .env.local
```env
# Connection
VITE_SUPABASE_URL=https://abc123.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbG...

# Tables
VITE_TABLE_CUSTOMERS=customers
VITE_TABLE_CONVERSATIONS=conversations
# ... (continue for all 7 tables)

# Customer Columns
VITE_COL_CUSTOMER_ID=id
VITE_COL_CUSTOMER_NAME=name
VITE_COL_CUSTOMER_PHONE=phone
VITE_COL_CUSTOMER_EMAIL=email
VITE_COL_CUSTOMER_VIP=vip
VITE_COL_CUSTOMER_MEMBER=member
VITE_COL_CUSTOMER_CREDIT=credit
VITE_COL_CUSTOMER_TAGS=tags
VITE_COL_CUSTOMER_CREATED=created_at
VITE_COL_CUSTOMER_UPDATED=updated_at
```

### Step 6: Repeat for Other Tables
Do same for: conversations, messages, bookings, branches, services, workflow_errors

### Step 7: Test
```bash
npm run dev
# Open http://localhost:3000
# Check if data appears
```

---

## Troubleshooting Table/Column Issues

### Problem: "Table 'xyz' doesn't exist"
**Cause**: Table name in `.env.local` doesn't match Supabase

**Check**:
1. Go to Supabase → Tables
2. Is the table spelled exactly the same?
3. Check uppercase/lowercase
4. Check for underscores, hyphens, spaces

**Solution**:
```env
# In Supabase: "Customers" (capital C)
# In .env.local: should be "Customers" (capital C)
VITE_TABLE_CUSTOMERS=Customers
```

### Problem: "Column 'xyz' doesn't exist"
**Cause**: Column name in `.env.local` doesn't match Supabase

**Check**:
1. Go to Supabase → Click table
2. Look at column headers
3. Exact spelling and case?

**Solution**:
```env
# In Supabase: column "customer_id"
# In .env.local: should be "customer_id"
VITE_COL_CUSTOMER_ID=customer_id
```

### Problem: "Can't connect to Supabase"
**Cause**: URL or API key wrong

**Check**:
1. URL correct? Should be `https://xxxxx.supabase.co`
2. API key correct? Should start with `eyJ`
3. Copied without extra spaces?

**Solution**:
- Go back to Supabase
- Re-copy URL and Key carefully
- Make sure no extra spaces
- Try again

---

## Missing Columns?

If a column doesn't exist in your database, you have options:

### Option 1: Add the Column (If You Can)
```sql
ALTER TABLE customers ADD COLUMN vip BOOLEAN DEFAULT FALSE;
```

### Option 2: Leave It Empty
The dashboard will still work, just won't show that column

### Option 3: Map to Different Column
```env
# If you don't have 'vip' but have 'is_vip'
VITE_COL_CUSTOMER_VIP=is_vip
```

---

## Before You Start

Checklist:
- [ ] Supabase project created
- [ ] Have access to Supabase dashboard
- [ ] Know your table names (or can copy from Supabase)
- [ ] Know your column names (or can copy from Supabase)
- [ ] Have Node.js installed
- [ ] Terminal access

---

## After Setup

Once you've filled in `.env.local`:

1. **Save the file**
2. **Restart dev server**:
   ```bash
   npm run dev
   ```
3. **Open browser**: http://localhost:3000
4. **Check for data**: Click on any page, should show data

---

## Video Summary

If this is confusing, here's what you're doing:

1. **Get 2 keys** from Supabase (URL + API Key)
2. **Get 7 table names** from Supabase Tables list
3. **Get 60+ column names** by clicking each table
4. **Fill them in** `.env.local`
5. **Restart** dev server
6. **Done** ✅

---

**That's it! You now understand the complete setup process.** 🎉
