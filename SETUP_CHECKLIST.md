# 📋 Setup Checklist - Follow This!

## Simple Step-by-Step Setup

Follow this checklist to get your dashboard working in 15 minutes.

---

## ✅ Step 1: Navigate to Dashboard Folder

```bash
cd neko-admin-dashboard
```

- [ ] You are now inside the neko-admin-dashboard folder

---

## ✅ Step 2: Install Dependencies

```bash
npm install
```

- [ ] Dependencies are installed
- [ ] `node_modules` folder exists

---

## ✅ Step 3: Create .env.local File

```bash
cp .env.example .env.local
```

- [ ] `.env.local` file created
- [ ] It's in the neko-admin-dashboard folder (same level as package.json)

---

## ✅ Step 4: Get Supabase Credentials

### Open Supabase Dashboard
- [ ] Go to https://supabase.com
- [ ] Log in to your account
- [ ] Click on your project name

### Get URL
- [ ] Click **Settings** (⚙️ icon, bottom left)
- [ ] Click **API** (in left menu)
- [ ] Find **"Project URL"**
- [ ] Copy it (looks like: `https://xxxxx.supabase.co`)

### Get API Key
- [ ] In same API page, find **"Project API keys"**
- [ ] Click on **"anon/public"** row
- [ ] Copy the key (long string starting with `eyJ...`)

---

## ✅ Step 5: Update .env.local - Supabase

- [ ] Open `.env.local` in text editor
- [ ] Find: `VITE_SUPABASE_URL=`
- [ ] Replace with your URL: `VITE_SUPABASE_URL=https://xxxxx.supabase.co`
- [ ] Find: `VITE_SUPABASE_ANON_KEY=`
- [ ] Replace with your key: `VITE_SUPABASE_ANON_KEY=eyJ...`
- [ ] Save the file

---

## ✅ Step 6: Find Your Table Names

### In Supabase
- [ ] Click **Tables** (left sidebar)
- [ ] You'll see all your tables

### Write Down Your Table Names
```
Table names I found:
- customers
- conversations
- messages
- bookings
- branches
- services
- workflow_errors
```

---

## ✅ Step 7: Update .env.local - Tables

- [ ] Open `.env.local`
- [ ] Find: `# TABLE NAMES`
- [ ] Update each table name:

```env
VITE_TABLE_CUSTOMERS=customers
VITE_TABLE_CONVERSATIONS=conversations
VITE_TABLE_MESSAGES=messages
VITE_TABLE_BOOKINGS=bookings
VITE_TABLE_BRANCHES=branches
VITE_TABLE_SERVICES=services
VITE_TABLE_WORKFLOW_ERRORS=workflow_errors
```

- [ ] Save the file

---

## ✅ Step 8: Find Your Column Names

### For Each Table in Supabase
1. [ ] Click on customers table
2. [ ] Write down column names: id, name, phone, email, etc.
3. [ ] Repeat for each table

---

## ✅ Step 9: Update .env.local - Columns

- [ ] Open `.env.local`
- [ ] Find: `# COLUMN NAMES`
- [ ] Update each column to match your database

Example:
```env
VITE_COL_CUSTOMER_ID=id
VITE_COL_CUSTOMER_NAME=name
VITE_COL_CUSTOMER_PHONE=phone
# ... etc for all columns
```

- [ ] Save the file

---

## ✅ Step 10: Start the Dashboard

```bash
npm run dev
```

- [ ] Terminal shows: "Local: http://localhost:3000"
- [ ] No errors in terminal

---

## ✅ Step 11: Open in Browser

- [ ] Open browser
- [ ] Go to: http://localhost:3000
- [ ] Dashboard loads (may show loading or empty data)

---

## ✅ Step 12: Check for Your Data

- [ ] Click "Customers" page
- [ ] Do you see customer data?
  - **YES** ✅ SUCCESS!
  - **NO** ⚠️ Go to Troubleshooting

---

## ⚠️ Troubleshooting (If No Data Shows)

### Check 1: Table Names
- [ ] Table name in `.env.local` EXACTLY matches Supabase (case-sensitive!)
- [ ] Example: If Supabase shows `Customers`, must be `Customers` in `.env.local`

### Check 2: Column Names
- [ ] Column name EXACTLY matches Supabase
- [ ] Example: If Supabase shows `user_id`, must be `user_id` in `.env.local`

### Check 3: Restart Dev Server
- [ ] Press Ctrl+C in terminal
- [ ] Run: `npm run dev` again

### Check 4: Browser Cache
- [ ] Press Ctrl+Shift+R (hard refresh)
- [ ] Or open in private/incognito window

### Check 5: Supabase Data
- [ ] Go to Supabase → Tables
- [ ] Click on a table
- [ ] Do you see any rows? If empty, add test data

---

## 🎉 Final Checklist

- [ ] `.env.local` created
- [ ] Supabase URL added
- [ ] Supabase API Key added
- [ ] All table names updated
- [ ] All column names updated
- [ ] Dependencies installed (`npm install`)
- [ ] Dev server running (`npm run dev`)
- [ ] Dashboard opens at http://localhost:3000
- [ ] Data appears on dashboard ✅

---

## ✅ You're Done!

Your dashboard is now working with YOUR database!

### Next Steps
1. Explore each dashboard page
2. Test filtering and search
3. Read **DASHBOARD_SETUP_GUIDE.md** for features

---

**Congratulations!** 🎉 Your admin dashboard is ready!
