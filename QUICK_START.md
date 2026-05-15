# 🚀 Quick Start Guide

## Fast Track to Working Dashboard

### Prerequisites
- Node.js installed
- Supabase account
- Terminal access

---

## 5-Minute Setup

```bash
# 1. Navigate to folder
cd neko-admin-dashboard

# 2. Install dependencies
npm install

# 3. Copy configuration template
cp .env.example .env.local

# 4. Edit .env.local with your values:
# VITE_SUPABASE_URL=https://xxxxx.supabase.co
# VITE_SUPABASE_ANON_KEY=your_key_here
# VITE_TABLE_CUSTOMERS=customers
# ... (fill in all values)

# 5. Start development server
npm run dev

# 6. Open browser
# http://localhost:3000
```

---

## Common Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

---

## Environment Variables Checklist

### Required
- `VITE_SUPABASE_URL` - Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY` - Your Supabase API key

### Table Names (Update to match your DB)
- `VITE_TABLE_CUSTOMERS` - Your customers table name
- `VITE_TABLE_CONVERSATIONS` - Your conversations table name
- `VITE_TABLE_MESSAGES` - Your messages table name
- `VITE_TABLE_BOOKINGS` - Your bookings table name
- `VITE_TABLE_BRANCHES` - Your branches table name
- `VITE_TABLE_SERVICES` - Your services table name
- `VITE_TABLE_WORKFLOW_ERRORS` - Your errors table name

### Column Names (Update to match your columns)
- All `VITE_COL_*` variables - Update to match your actual column names

---

## Folder Structure

```
neko-admin-dashboard/
├── src/
│   ├── lib/
│   │   ├── schema.ts (configuration)
│   │   ├── db-hooks.ts (database)
│   │   └── supabase.ts (setup)
│   ├── pages/ (7 pages)
│   ├── components/ (4 components)
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── .env.example
├── package.json
└── Documentation
```

---

## File Structure After Setup

```
neko-admin-dashboard/
├── node_modules/ (created by npm install)
├── .env.local (copy from .env.example)
├── dist/ (created by npm run build)
└── [all other files]
```

---

## Getting Supabase Info

### Get URL
```
1. Go to https://supabase.com
2. Login → Select project
3. Settings → API
4. Copy "Project URL"
```

### Get API Key
```
1. Same as above
2. Copy "anon/public" key from "Project API keys"
```

### Get Table Names
```
1. Click "Tables" in sidebar
2. You see all your table names
```

### Get Column Names
```
1. Click a table
2. See column headers across the top
3. These are your column names
```

---

## Troubleshooting Quick Fixes

```bash
# Port 3000 already in use?
# Change in vite.config.ts or use:
npm run dev -- --port 3001

# Module not found error?
npm install

# env variables not loading?
# Restart dev server:
# Ctrl+C then npm run dev

# No data showing?
# Check .env.local matches your database exactly
```

---

## Next Steps

1. ✅ Complete setup above
2. 📖 Read `SETUP_CHECKLIST.md` for detailed guide
3. 🎯 Read `CONFIGURATION_GUIDE.md` to understand system
4. 🚀 Start dashboard with `npm run dev`
5. 🌐 Open http://localhost:3000

---

## Support Docs

- **Setup Help**: `SETUP_CHECKLIST.md`
- **Understanding Config**: `CONFIGURATION_GUIDE.md`
- **All Settings Reference**: `ENV_CONFIG_REFERENCE.md`
- **Detailed Setup Guide**: `ENV_SETUP_GUIDE.md`
- **Dashboard Features**: `DASHBOARD_SETUP_GUIDE.md`
- **Complete Reference**: `ADMIN_DASHBOARD_README.md`

---

**You're all set!** 🎉 Dashboard ready to run.
