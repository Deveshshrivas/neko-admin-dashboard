# 📚 Complete Admin Dashboard Reference

## Project Overview

**Neko Admin Dashboard** - Complete admin dashboard for managing Neko Salon WhatsApp workflows with Supabase backend.

---

## Features

### 7 Dashboard Pages

1. **Dashboard** - System overview with stats and charts
2. **Conversations** - Customer WhatsApp conversations
3. **Bookings** - Service bookings/appointments
4. **Messages** - Message logs and monitoring
5. **Customers** - Customer database management
6. **Errors** - Workflow error tracking
7. **Settings** - Dashboard configuration

### 4 Reusable Components

- **Layout** - Main application layout with sidebar
- **DataTable** - Generic data table component
- **StatCard** - Metric display cards
- **StatusBadge** - Status indicators

### Smart Configuration

- 70+ environment variables for customization
- No hardcoded table/column names
- Dynamic query building
- Works with any database structure

### Modern Tech Stack

- React 18 + TypeScript
- Vite for fast development
- Tailwind CSS for styling
- Supabase for backend
- Recharts for visualizations
- React Router for navigation

---

## Getting Started

### Prerequisites

- Node.js 14+
- npm or yarn
- Supabase account (free)
- Terminal access

### Installation

```bash
# 1. Navigate to folder
cd neko-admin-dashboard

# 2. Install dependencies
npm install

# 3. Create configuration
cp .env.example .env.local

# 4. Edit .env.local with your values
# Add Supabase URL, API key, table names, column names

# 5. Start development
npm run dev

# 6. Open browser
# http://localhost:3000
```

---

## Configuration

### Key Environment Variables

**Connection** (2 vars):
- `VITE_SUPABASE_URL` - Your Supabase URL
- `VITE_SUPABASE_ANON_KEY` - Your API key

**Tables** (7 vars):
- `VITE_TABLE_CUSTOMERS`
- `VITE_TABLE_CONVERSATIONS`
- `VITE_TABLE_MESSAGES`
- `VITE_TABLE_BOOKINGS`
- `VITE_TABLE_BRANCHES`
- `VITE_TABLE_SERVICES`
- `VITE_TABLE_WORKFLOW_ERRORS`

**Columns** (60+ vars):
- `VITE_COL_CUSTOMER_*` (12 columns)
- `VITE_COL_CONVERSATION_*` (9 columns)
- `VITE_COL_MESSAGE_*` (8 columns)
- `VITE_COL_BOOKING_*` (10 columns)
- `VITE_COL_BRANCH_*` (5 columns)
- `VITE_COL_SERVICE_*` (6 columns)
- `VITE_COL_ERROR_*` (7 columns)

**App Config** (4 vars):
- `VITE_APP_TIMEZONE` - Timezone for timestamps
- `VITE_APP_REFRESH_INTERVAL` - Auto-refresh interval
- `VITE_APP_THEME` - UI theme (light/dark)
- `VITE_APP_LANGUAGE` - App language

**n8n Config** (1 var):
- `VITE_N8N_URL` - n8n instance URL

---

## Project Structure

```
src/
├── lib/
│   ├── schema.ts (configuration hub)
│   ├── db-hooks.ts (database queries)
│   └── supabase.ts (client setup)
├── pages/ (7 page components)
├── components/ (4 UI components)
├── App.tsx (routing)
├── main.tsx (entry point)
└── index.css (global styles)
```

---

## Core Files

### schema.ts

Central configuration hub that reads environment variables.

**Exports**:
- `TABLES` - Object with table names
- `COLS_CUSTOMER` - Customer column names
- `COLS_CONVERSATION` - Conversation column names
- `COLS_MESSAGE` - Message column names
- `COLS_BOOKING` - Booking column names
- `COLS_BRANCH` - Branch column names
- `COLS_SERVICE` - Service column names
- `COLS_ERROR` - Error column names
- `APP_CONFIG` - App configuration
- `N8N_CONFIG` - n8n configuration
- Helper functions: `buildSelect()`, `getTableColumns()`

### db-hooks.ts

Reusable database query functions using Supabase.

**Functions**:
- `useCustomers(page, pageSize, searchTerm)` - Fetch customers
- `useConversations(page, status, searchTerm)` - Fetch conversations
- `useBookings(page, status, searchTerm)` - Fetch bookings
- `useMessages(page, direction, status, searchTerm)` - Fetch messages
- `useErrors(page, severity, searchTerm)` - Fetch errors
- `useDashboardStats()` - Fetch statistics

### supabase.ts

Supabase client initialization and TypeScript interfaces.

**Exports**:
- `supabase` - Initialized Supabase client
- TypeScript interfaces for all data types

---

## Page Components

### Dashboard.tsx
- Overview with stat cards
- Message activity chart
- Booking status pie chart
- System health indicators
- Real-time stats fetching

### Conversations.tsx
- Conversation list with pagination
- Filter by status
- Search by phone
- Status badges
- Date and time display

### Bookings.tsx
- Booking list with pagination
- Quick stats (total, week, pending, cancelled)
- Filter by status
- Search by code or phone
- Appointment time display

### Messages.tsx
- Message log with pagination
- Filter by direction (inbound/outbound)
- Filter by status
- Search by content
- Timestamp display

### Customers.tsx
- Customer list with pagination
- Quick stats (total, VIP, members, credit)
- Filter by type (VIP/members)
- Search by name or phone
- Customer badges

### Errors.tsx
- Error log with pagination
- Critical error alert banner
- Error stats by severity
- Filter by severity
- Search by message
- Auto-sorting by timestamp

### Settings.tsx
- Supabase connection settings
- n8n configuration
- Theme selection
- Timezone selection
- Refresh interval control
- Settings persistence to localStorage

---

## Component Library

### Layout.tsx

Main application layout component.

**Features**:
- Collapsible sidebar
- Main content area
- Top navigation bar
- Date display
- 7 menu items for navigation

### DataTable.tsx

Generic reusable data table component.

**Props**:
- `columns` - Column definitions
- `data` - Array of data rows
- `loading` - Loading state
- `pagination` - Pagination config
- `emptyMessage` - Message when no data

**Features**:
- Generic column rendering
- Custom render functions
- Pagination controls
- Loading spinner
- Empty state

### StatCard.tsx

Metric display card component.

**Props**:
- `icon` - React icon
- `title` - Card title
- `value` - Metric value
- `trend` - Optional trend indicator
- `variant` - Color variant

**Variants**: blue, purple, green, orange, red

### StatusBadge.tsx

Status indicator badge component.

**Props**:
- `status` - Status value
- `size` - Badge size (sm/md/lg)

**Supported Statuses** (16+):
- active, pending, confirmed, completed, cancelled
- failed, error, warning, critical
- queued, replied, skipped
- awaiting_human, human_handling, closed
- inbound, outbound

---

## Dependencies

### Core (6)
```
@supabase/supabase-js - Database client
react - UI framework
react-dom - React DOM
react-router-dom - Client routing
lucide-react - Icon library
recharts - Charting library
```

### Dev (14)
```
TypeScript ecosystem
Vite & plugins
Tailwind CSS
ESLint & plugins
PostCSS
```

---

## Build & Deployment

### Development

```bash
npm run dev
```
Starts development server with HMR at http://localhost:3000

### Production Build

```bash
npm run build
```
Creates optimized build in `dist/` folder

### Preview

```bash
npm run preview
```
Preview production build locally

### Linting

```bash
npm run lint
```
Check code quality with ESLint

---

## Styling

### Tailwind CSS

Comprehensive utility-first styling.

**Features**:
- Responsive design (mobile-first)
- Dark mode support (in config)
- Custom colors (blue, purple, green, orange, red)
- Component utilities

### Global Styles (index.css)

```css
Custom component classes:
- .badge - Badge styling
- .card - Card container
- .btn - Button styling
- .input - Input styling
- .label - Label styling
- .table - Table styling
```

---

## Responsive Design

**Breakpoints**:
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

**Grid System**:
- 1 column on mobile
- 2-3 columns on tablet
- 4-5 columns on desktop

**Navigation**:
- Hamburger menu on mobile
- Full sidebar on desktop

---

## Performance

- **Bundle Size**: Optimized with Vite
- **HMR**: Fast hot module replacement
- **Code Splitting**: Automatic route-based splitting
- **Image Optimization**: Built-in with Vite
- **CSS Purging**: Tailwind CSS purges unused styles

---

## Security

### Best Practices

- ✅ Use `.env.local` (never commit)
- ✅ Supabase API key security
- ✅ Row-level security (RLS) in Supabase
- ✅ No hardcoded credentials
- ✅ HTTPS only in production

### Environment Variables

- Never share `.env.local`
- Keep API keys confidential
- Use different keys for different environments
- Rotate keys periodically

---

## Troubleshooting

### No Data Showing

1. Check `.env.local` exists
2. Verify table names match Supabase exactly
3. Verify column names match exactly
4. Restart dev server: `npm run dev`
5. Check browser console for errors

### Connection Error

1. Verify Supabase URL is correct
2. Verify API key is correct
3. Check internet connection
4. Check Supabase project is active

### Build Errors

1. Clear cache: `rm -rf node_modules`
2. Reinstall: `npm install`
3. Clear dist: `rm -rf dist`
4. Rebuild: `npm run build`

---

## Documentation Files

| File | Purpose |
|------|---------|
| `GET_STARTED.md` | Welcome & quick overview |
| `SETUP_CHECKLIST.md` | Step-by-step setup guide |
| `CONFIGURATION_GUIDE.md` | Configuration system |
| `ENV_CONFIG_REFERENCE.md` | All environment variables |
| `ENV_SETUP_GUIDE.md` | Detailed setup help |
| `DASHBOARD_SETUP_GUIDE.md` | Feature guide |
| `QUICK_START.md` | Quick commands |
| `FILES_CREATED.md` | File structure |
| `README.md` | Project README |

---

## Browser Support

- Chrome/Edge: Latest
- Firefox: Latest
- Safari: Latest
- Mobile browsers: Latest

---

## Version

**Version**: 1.0.0  
**Last Updated**: 2024  
**License**: MIT

---

## Support & Resources

1. **Setup**: Follow `SETUP_CHECKLIST.md`
2. **Understanding**: Read `CONFIGURATION_GUIDE.md`
3. **Reference**: Use `ENV_CONFIG_REFERENCE.md`
4. **Features**: Read `DASHBOARD_SETUP_GUIDE.md`

---

**You now have everything to build and deploy your admin dashboard!** 🎉

Start with setup, configure with your database, and enjoy your new dashboard.
