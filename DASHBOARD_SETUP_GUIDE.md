# 📊 Admin Dashboard Setup & Features Guide

## Complete Dashboard Feature Guide

---

## 🎯 Dashboard Pages Overview

### 1. Dashboard (Home Page)

**Purpose**: Overview of the entire system

**What You See**:
- 5 stat cards:
  - Total Customers
  - Active Conversations
  - Pending Bookings
  - Total Messages
  - Critical Errors

- Charts:
  - Message Activity (7-day trend)
  - Booking Status (pie chart)

- System Health:
  - Database Connection Status
  - API Response Time
  - Error Rate

**How to Use**:
- First page you see when opening dashboard
- Check stats at a glance
- See system health status
- Monitor message trends

---

### 2. Conversations Page

**Purpose**: Manage and monitor customer WhatsApp conversations

**What You See**:
- List of all conversations
- Filter options
- Search functionality
- Pagination

**Filters Available**:
- **Status**: All, Active, Awaiting Human, Human Handling, Closed
- **Search**: By customer phone number

**Table Shows**:
- Conversation ID
- Customer Phone
- Status (with color badge)
- Started Time
- Date

**How to Use**:
1. Click "Conversations" in sidebar
2. Use status filter to see specific types
3. Search by phone number to find conversations
4. Click pagination to see more conversations
5. Check status badges for conversation state

**Status Meanings**:
- 🟢 **Active** - Ongoing conversation
- 🟡 **Awaiting Human** - Waiting for human response
- 🟣 **Human Handling** - Human is currently handling
- ⚪ **Closed** - Conversation ended

---

### 3. Bookings Page

**Purpose**: Track salon service bookings/appointments

**What You See**:
- 4 stat cards (Total, This Week, Pending, Cancelled)
- Filter options
- Booking list with pagination
- Search functionality

**Quick Stats**:
- **Total Bookings**: All bookings in system
- **This Week**: Bookings in current week
- **Pending**: Awaiting confirmation
- **Cancelled**: Cancelled bookings

**Filters Available**:
- **Status**: All, Pending, Confirmed, Completed, Cancelled
- **Search**: By booking code or customer phone

**Table Shows**:
- Booking Code (unique identifier)
- Customer Phone
- Status (with color badge)
- Appointment Time
- Date

**How to Use**:
1. Click "Bookings" in sidebar
2. Check stats at top for overview
3. Filter by status to see specific bookings
4. Search for specific booking or customer
5. Navigate through pages

**Status Meanings**:
- 🟡 **Pending** - Awaiting confirmation
- 🔵 **Confirmed** - Confirmed by customer
- 🟢 **Completed** - Service completed
- 🔴 **Cancelled** - Booking cancelled

---

### 4. Messages Page

**Purpose**: Monitor all WhatsApp messages

**What You See**:
- Message logs with pagination
- Multiple filter options
- Search functionality

**Filters Available**:
- **Direction**: All, Inbound, Outbound
- **Status**: All, Queued, Replied, Failed, Skipped
- **Search**: By message content

**Table Shows**:
- Message ID
- Direction (with badge)
- Message Content
- Status (with badge)
- Timestamp

**How to Use**:
1. Click "Messages" in sidebar
2. Use direction filter to see incoming or outgoing
3. Filter by status to find specific message types
4. Search to find specific content
5. Review message history

**Status Meanings**:
- 🔵 **Queued** - Waiting to be sent
- 🟢 **Replied** - Got a reply
- 🔴 **Failed** - Failed to send
- ⚪ **Skipped** - Message skipped

---

### 5. Customers Page

**Purpose**: Manage customer database

**What You See**:
- 4 stat cards (Total, VIP, Members, Total Credit)
- Filter options
- Customer list with pagination
- Search functionality

**Quick Stats**:
- **Total Customers**: All customers
- **VIP Members**: VIP customers
- **Regular Members**: Regular members
- **Total Credit**: Total store credit

**Filters Available**:
- **Type**: All, VIP Only, Members Only
- **Search**: By name or phone number

**Table Shows**:
- Customer ID
- Name
- Phone
- Email
- Type (VIP/Member badges)
- Credit Balance
- Join Date

**How to Use**:
1. Click "Customers" in sidebar
2. Check stats for overview
3. Filter to see specific customer types
4. Search for specific customer
5. See customer history

**Customer Types**:
- 🔴 **VIP** - Premium customers
- 🔵 **Member** - Regular members
- None - One-time customers

---

### 6. Errors Page

**Purpose**: Monitor and troubleshoot workflow errors

**What You See**:
- Alert banner (if critical errors)
- 4 stat cards (Total, Critical, Warning, Info)
- Filter options
- Error logs with pagination
- Search functionality

**Quick Stats**:
- **Total Errors**: All errors
- **Critical**: Red alert level
- **Warning**: Yellow level
- **Info**: Blue level

**Filters Available**:
- **Severity**: All, Critical, Warning, Info
- **Search**: By error message

**Table Shows**:
- Timestamp
- Severity (with badge)
- Workflow Name
- Error Message
- Date

**How to Use**:
1. Click "Errors" in sidebar
2. Check alert banner for critical issues
3. Review stat cards for error count by severity
4. Filter by severity level
5. Search for specific error
6. Take action on critical errors

**Severity Levels**:
- 🔴 **Critical** - Requires immediate action
- 🟡 **Warning** - Pay attention, not critical
- 🔵 **Info** - Informational only

---

### 7. Settings Page

**Purpose**: Configure dashboard settings

**What You See**:
- Supabase connection settings
- n8n configuration
- App settings
- Save and reset buttons

**Supabase Settings**:
- Project URL
- API Key (password field)

**n8n Settings**:
- n8n URL

**App Settings**:
- **Theme**: Light, Dark, Auto
- **Timezone**: Select your timezone
- **Refresh Interval**: How often to refresh data (milliseconds)

**How to Use**:
1. Click "Settings" in sidebar
2. Update Supabase credentials if needed
3. Add n8n URL if using n8n
4. Change theme preference
5. Set timezone for timestamps
6. Adjust refresh interval
7. Click "Save Settings"
8. Success message confirms

**Info**:
- Settings saved to browser's local storage
- Only affects your browser
- Settings persist between sessions
- Click "Reset to Defaults" to restore default values

---

## 🎨 UI Elements Guide

### Status Badges

Status indicators with colors:
- 🟢 Green: Active, Confirmed, Completed, Healthy
- 🟡 Yellow: Pending, Warning, Awaiting
- 🔵 Blue: Inbound, Info, Active
- 🟣 Purple: Human Handling, Outbound
- 🔴 Red: Critical, Cancelled, Failed, Error
- ⚪ Gray: Closed, Skipped, Inactive

### Stat Cards

Display key metrics:
- Large number (the stat)
- Subtitle (what it means)
- Optional trend indicator
- Color-coded icon

### Data Tables

Interactive tables with:
- Column headers
- Sortable data
- Pagination controls
- Loading state (spinner)
- Empty state message
- Results counter

### Navigation

Left sidebar with:
- Dashboard
- Conversations
- Bookings
- Messages
- Customers
- Errors
- Settings

Collapsible/expandable sidebar for more screen space

---

## 🔄 Common Workflows

### Workflow 1: Respond to Customer Message

1. Click "Messages" page
2. Find message with status "Queued"
3. Check customer phone
4. Read message content
5. Go to Conversations to continue chat
6. Reply through WhatsApp/n8n

### Workflow 2: Manage Bookings

1. Click "Bookings" page
2. Check "Pending" bookings
3. Search by customer phone
4. Confirm or cancel booking
5. Update customer via message
6. Track through Messages page

### Workflow 3: Handle Critical Error

1. Dashboard shows critical error alert
2. Click "Errors" page
3. Filter by "Critical"
4. See error message and workflow name
5. Take corrective action
6. Check if error resolves

### Workflow 4: Customer Search

1. Go to "Customers" page
2. Search by name or phone
3. See customer details
4. View customer history
5. Check booking history
6. Review message logs

### Workflow 5: Monitor System Health

1. Click "Dashboard" (home page)
2. Check 5 stat cards
3. Look at system health bars
4. Check message activity chart
5. Review booking status pie chart
6. Take action if issues detected

---

## ⌨️ Keyboard Shortcuts

| Action | Shortcut |
|--------|----------|
| Search | Ctrl+F (browser search) |
| Refresh | F5 |
| Home | Cmd/Ctrl+Home |
| Next Page | Arrow Down (in pagination) |
| Previous Page | Arrow Up (in pagination) |

---

## 📱 Mobile Support

Dashboard is responsive:
- **Desktop**: Full width, all features
- **Tablet**: Adjusted layout, readable
- **Mobile**: Stacked layout, touch-friendly

**Best Experience**:
- Desktop or laptop for best experience
- Tablet for portability
- Mobile for quick checks

---

## 💾 Data Persistence

**Dashboard Data**:
- Automatically fetches from Supabase
- Updates in real-time (or on refresh)
- No local storage (except settings)

**Settings**:
- Saved to browser local storage
- Persist between sessions
- Can be reset

**Bookmarks**:
- Each page has unique URL
- Can bookmark specific pages
- Deep linking works

---

## 🔐 Security Notes

- Never share `.env.local` file
- API key is sensitive
- Only accessible to you
- Logged actions go to database
- No passwords required (uses Supabase auth)

---

## 📊 Tips & Tricks

### Tip 1: Use Filters
Filters help you find specific data quickly

### Tip 2: Search First
Search by phone or name to find customers

### Tip 3: Check Status
Status badges show at a glance what's happening

### Tip 4: Monitor Errors
Check Errors page regularly for issues

### Tip 5: Use Dashboard
Dashboard gives quick overview before drilling down

### Tip 6: Bookmark Pages
Use browser bookmarks for quick access

---

## ❓ Frequently Asked Questions

**Q: Why is no data showing?**
A: Check .env.local has correct table/column names

**Q: How to refresh data?**
A: Press F5 or click refresh button

**Q: Can I modify data?**
A: Currently view-only, modifications through Supabase

**Q: How often does data update?**
A: Manual refresh, or auto-refresh interval from Settings

**Q: Can I export data?**
A: Not built-in yet, can copy from table

**Q: Is dashboard mobile-friendly?**
A: Yes, responsive design on all devices

---

## 🎓 Learning Resources

- Check documentation files in folder
- Hover over items for tooltips
- Try different filters
- Explore all pages
- Adjust settings to preferences

---

**Congratulations!** You now know how to use every page in the dashboard! 🎉

Start with Dashboard page, then explore others as needed.
