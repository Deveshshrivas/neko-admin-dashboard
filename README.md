# Neko Admin Dashboard

Complete admin dashboard for managing Neko Salon WhatsApp workflows.

## Features

✅ **7 Dashboard Pages**
- Dashboard (overview with charts)
- Conversations (customer chat management)
- Bookings (appointment tracking)
- Messages (message logs)
- Customers (customer database)
- Errors (workflow error monitoring)
- Settings (configuration)

✅ **Fully Configurable**
- All table names configurable via `.env.local`
- All column names configurable via `.env.local`
- No code changes needed

✅ **Production Ready**
- React 18 + TypeScript
- Supabase integration
- Responsive design (Tailwind CSS)
- Data visualization (Recharts)
- Reusable components

---

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Configure
cp .env.example .env.local
# Edit .env.local with your Supabase info

# 3. Run development server
npm run dev

# 4. Open browser
# http://localhost:3000
```

---

## Documentation

Start with **GET_STARTED.md** or **SETUP_CHECKLIST.md**

- [GET_STARTED.md](GET_STARTED.md) - Welcome & overview
- [SETUP_CHECKLIST.md](SETUP_CHECKLIST.md) - Step-by-step setup
- [QUICK_START.md](QUICK_START.md) - Quick commands
- [CONFIGURATION_GUIDE.md](CONFIGURATION_GUIDE.md) - How it works
- [ENV_CONFIG_REFERENCE.md](ENV_CONFIG_REFERENCE.md) - All settings
- [ENV_SETUP_GUIDE.md](ENV_SETUP_GUIDE.md) - Detailed help
- [DASHBOARD_SETUP_GUIDE.md](DASHBOARD_SETUP_GUIDE.md) - Features
- [ADMIN_DASHBOARD_README.md](ADMIN_DASHBOARD_README.md) - Complete ref

---

## Tech Stack

- **Frontend**: React 18, TypeScript
- **Build**: Vite
- **Styling**: Tailwind CSS, PostCSS
- **Database**: Supabase
- **Charts**: Recharts
- **Icons**: Lucide React
- **Routing**: React Router v6

---

## Project Structure

```
src/
├── lib/
│   ├── schema.ts (configuration)
│   ├── db-hooks.ts (database)
│   └── supabase.ts (setup)
├── pages/ (7 pages)
├── components/ (4 components)
├── App.tsx
├── main.tsx
└── index.css
```

---

## Commands

```bash
npm run dev       # Start dev server
npm run build     # Build for production
npm run preview   # Preview production build
npm run lint      # Run ESLint
```

---

## Configuration

Edit `.env.local` to configure:
- Supabase URL & API key
- Table names
- Column names
- App settings

See [SETUP_CHECKLIST.md](SETUP_CHECKLIST.md) for detailed steps.

---

## License

MIT

---

**Version**: 1.0.0  
**Created**: 2024
