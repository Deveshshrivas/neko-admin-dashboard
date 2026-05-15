# 🔍 Environment Configuration Reference

## All Environment Variables

Complete reference of all environment variables and where to find them.

---

## 🔐 Supabase Connection (2 variables)

### VITE_SUPABASE_URL
**What it is**: Your Supabase project URL  
**Format**: `https://xxxxx.supabase.co`  
**Where to find**:
1. Go to https://supabase.com
2. Click your project
3. Settings → API
4. Copy "Project URL"

**Example**:
```env
VITE_SUPABASE_URL=https://yfvbzxcvbnm.supabase.co
```

### VITE_SUPABASE_ANON_KEY
**What it is**: Your Supabase anonymous/public API key  
**Format**: Long string starting with `eyJ...`  
**Where to find**:
1. Supabase → Settings → API
2. Under "Project API keys"
3. Copy "anon/public" key

**Example**:
```env
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdoZ...
```

---

## 📊 Table Names (7 variables)

Update these to match YOUR exact table names from Supabase.

### VITE_TABLE_CUSTOMERS
**Used for**: Customer list, customer profiles  
**Default**: `customers`  
**Your table name**: _______________

### VITE_TABLE_CONVERSATIONS
**Used for**: Conversations, chats  
**Default**: `conversations`  
**Your table name**: _______________

### VITE_TABLE_MESSAGES
**Used for**: Message logs, chat history  
**Default**: `messages`  
**Your table name**: _______________

### VITE_TABLE_BOOKINGS
**Used for**: Bookings, appointments, reservations  
**Default**: `bookings`  
**Your table name**: _______________

### VITE_TABLE_BRANCHES
**Used for**: Branch/location information  
**Default**: `branches`  
**Your table name**: _______________

### VITE_TABLE_SERVICES
**Used for**: Service/product information  
**Default**: `services`  
**Your table name**: _______________

### VITE_TABLE_WORKFLOW_ERRORS
**Used for**: Error logs, workflow errors  
**Default**: `workflow_errors`  
**Your table name**: _______________

---

## 📝 Column Names - Customer Table (12 variables)

### VITE_COL_CUSTOMER_ID
**Used for**: Customer ID  
**Default**: `id`  
**Your column**: _______________

### VITE_COL_CUSTOMER_NAME
**Used for**: Customer name  
**Default**: `name`  
**Your column**: _______________

### VITE_COL_CUSTOMER_PHONE
**Used for**: Phone number  
**Default**: `phone`  
**Your column**: _______________

### VITE_COL_CUSTOMER_EMAIL
**Used for**: Email address  
**Default**: `email`  
**Your column**: _______________

### VITE_COL_CUSTOMER_GENDER
**Used for**: Gender field  
**Default**: `gender`  
**Your column**: _______________

### VITE_COL_CUSTOMER_LANGUAGE
**Used for**: Preferred language  
**Default**: `language`  
**Your column**: _______________

### VITE_COL_CUSTOMER_VIP
**Used for**: VIP status flag  
**Default**: `vip`  
**Your column**: _______________

### VITE_COL_CUSTOMER_MEMBER
**Used for**: Member status flag  
**Default**: `member`  
**Your column**: _______________

### VITE_COL_CUSTOMER_CREDIT
**Used for**: Store credit balance  
**Default**: `credit`  
**Your column**: _______________

### VITE_COL_CUSTOMER_TAGS
**Used for**: Customer tags  
**Default**: `tags`  
**Your column**: _______________

### VITE_COL_CUSTOMER_CREATED
**Used for**: Creation timestamp  
**Default**: `created_at`  
**Your column**: _______________

### VITE_COL_CUSTOMER_UPDATED
**Used for**: Last update timestamp  
**Default**: `updated_at`  
**Your column**: _______________

---

## 💬 Column Names - Conversation Table (9 variables)

### VITE_COL_CONVERSATION_ID
**Default**: `id`

### VITE_COL_CONVERSATION_CUSTOMER_ID
**Default**: `customer_id`

### VITE_COL_CONVERSATION_STATUS
**Default**: `status`  
**Possible values**: `active`, `awaiting_human`, `human_handling`, `closed`

### VITE_COL_CONVERSATION_START_TIME
**Default**: `start_time`

### VITE_COL_CONVERSATION_END_TIME
**Default**: `end_time`

### VITE_COL_CONVERSATION_ASSIGNED_TO
**Default**: `assigned_to`

### VITE_COL_CONVERSATION_PHONE
**Default**: `phone`

### VITE_COL_CONVERSATION_CREATED
**Default**: `created_at`

### VITE_COL_CONVERSATION_UPDATED
**Default**: `updated_at`

---

## 📨 Column Names - Message Table (8 variables)

### VITE_COL_MESSAGE_ID
**Default**: `id`

### VITE_COL_MESSAGE_CONVERSATION_ID
**Default**: `conversation_id`

### VITE_COL_MESSAGE_CONTENT
**Default**: `content`

### VITE_COL_MESSAGE_DIRECTION
**Default**: `direction`  
**Possible values**: `inbound`, `outbound`

### VITE_COL_MESSAGE_STATUS
**Default**: `status`  
**Possible values**: `queued`, `replied`, `failed`, `skipped`

### VITE_COL_MESSAGE_TIMESTAMP
**Default**: `timestamp`

### VITE_COL_MESSAGE_MEDIA_URL
**Default**: `media_url`

### VITE_COL_MESSAGE_CREATED
**Default**: `created_at`

---

## 📅 Column Names - Booking Table (10 variables)

### VITE_COL_BOOKING_ID
**Default**: `id`

### VITE_COL_BOOKING_CODE
**Default**: `booking_code`

### VITE_COL_BOOKING_CUSTOMER_ID
**Default**: `customer_id`

### VITE_COL_BOOKING_SERVICE_ID
**Default**: `service_id`

### VITE_COL_BOOKING_BRANCH_ID
**Default**: `branch_id`

### VITE_COL_BOOKING_STATUS
**Default**: `status`  
**Possible values**: `pending`, `confirmed`, `completed`, `cancelled`

### VITE_COL_BOOKING_APPOINTMENT_TIME
**Default**: `appointment_time`

### VITE_COL_BOOKING_PHONE
**Default**: `phone`

### VITE_COL_BOOKING_CREATED
**Default**: `created_at`

### VITE_COL_BOOKING_UPDATED
**Default**: `updated_at`

---

## 🏢 Column Names - Branch Table (5 variables)

### VITE_COL_BRANCH_ID
**Default**: `id`

### VITE_COL_BRANCH_NAME
**Default**: `name`

### VITE_COL_BRANCH_ADDRESS
**Default**: `address`

### VITE_COL_BRANCH_PHONE
**Default**: `phone`

### VITE_COL_BRANCH_CREATED
**Default**: `created_at`

---

## 💇 Column Names - Service Table (6 variables)

### VITE_COL_SERVICE_ID
**Default**: `id`

### VITE_COL_SERVICE_NAME
**Default**: `name`

### VITE_COL_SERVICE_DESCRIPTION
**Default**: `description`

### VITE_COL_SERVICE_PRICE
**Default**: `price`

### VITE_COL_SERVICE_DURATION
**Default**: `duration`

### VITE_COL_SERVICE_CREATED
**Default**: `created_at`

---

## ⚠️ Column Names - Error Table (7 variables)

### VITE_COL_ERROR_ID
**Default**: `id`

### VITE_COL_ERROR_TIMESTAMP
**Default**: `timestamp`

### VITE_COL_ERROR_SEVERITY
**Default**: `severity`  
**Possible values**: `critical`, `warning`, `info`

### VITE_COL_ERROR_WORKFLOW
**Default**: `workflow`

### VITE_COL_ERROR_MESSAGE
**Default**: `message`

### VITE_COL_ERROR_DETAILS
**Default**: `details`

### VITE_COL_ERROR_CREATED
**Default**: `created_at`

---

## ⚙️ App Configuration (4 variables)

### VITE_APP_TIMEZONE
**Default**: `Asia/Kolkata`  
**Options**:
- `Asia/Kolkata` (IST)
- `America/New_York` (EST)
- `Europe/London` (GMT)
- `Asia/Bangkok` (ICT)
- `Australia/Sydney` (AEDT)

### VITE_APP_REFRESH_INTERVAL
**Default**: `30000` (30 seconds)  
**Format**: Milliseconds  
**Minimum**: `5000`

### VITE_APP_THEME
**Default**: `light`  
**Options**: `light`, `dark`, `auto`

### VITE_APP_LANGUAGE
**Default**: `en`  
**Options**: `en`, `hi` (planned)

---

## 🔗 n8n Configuration (1 variable)

### VITE_N8N_URL
**Default**: `https://n8n.example.com`  
**Format**: Full URL to your n8n instance

---

## 📋 Complete .env.local Template

Copy-paste this template and fill in your values:

```env
# ============================================
# SUPABASE CONNECTION
# ============================================
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...

# ============================================
# TABLE NAMES
# ============================================
VITE_TABLE_CUSTOMERS=customers
VITE_TABLE_CONVERSATIONS=conversations
VITE_TABLE_MESSAGES=messages
VITE_TABLE_BOOKINGS=bookings
VITE_TABLE_BRANCHES=branches
VITE_TABLE_SERVICES=services
VITE_TABLE_WORKFLOW_ERRORS=workflow_errors

# ============================================
# CUSTOMER COLUMNS
# ============================================
VITE_COL_CUSTOMER_ID=id
VITE_COL_CUSTOMER_NAME=name
VITE_COL_CUSTOMER_PHONE=phone
VITE_COL_CUSTOMER_EMAIL=email
VITE_COL_CUSTOMER_GENDER=gender
VITE_COL_CUSTOMER_LANGUAGE=language
VITE_COL_CUSTOMER_VIP=vip
VITE_COL_CUSTOMER_MEMBER=member
VITE_COL_CUSTOMER_CREDIT=credit
VITE_COL_CUSTOMER_TAGS=tags
VITE_COL_CUSTOMER_CREATED=created_at
VITE_COL_CUSTOMER_UPDATED=updated_at

# ============================================
# CONVERSATION COLUMNS
# ============================================
VITE_COL_CONVERSATION_ID=id
VITE_COL_CONVERSATION_CUSTOMER_ID=customer_id
VITE_COL_CONVERSATION_STATUS=status
VITE_COL_CONVERSATION_START_TIME=start_time
VITE_COL_CONVERSATION_END_TIME=end_time
VITE_COL_CONVERSATION_ASSIGNED_TO=assigned_to
VITE_COL_CONVERSATION_PHONE=phone
VITE_COL_CONVERSATION_CREATED=created_at
VITE_COL_CONVERSATION_UPDATED=updated_at

# ============================================
# MESSAGE COLUMNS
# ============================================
VITE_COL_MESSAGE_ID=id
VITE_COL_MESSAGE_CONVERSATION_ID=conversation_id
VITE_COL_MESSAGE_CONTENT=content
VITE_COL_MESSAGE_DIRECTION=direction
VITE_COL_MESSAGE_STATUS=status
VITE_COL_MESSAGE_TIMESTAMP=timestamp
VITE_COL_MESSAGE_MEDIA_URL=media_url
VITE_COL_MESSAGE_CREATED=created_at

# ============================================
# BOOKING COLUMNS
# ============================================
VITE_COL_BOOKING_ID=id
VITE_COL_BOOKING_CODE=booking_code
VITE_COL_BOOKING_CUSTOMER_ID=customer_id
VITE_COL_BOOKING_SERVICE_ID=service_id
VITE_COL_BOOKING_BRANCH_ID=branch_id
VITE_COL_BOOKING_STATUS=status
VITE_COL_BOOKING_APPOINTMENT_TIME=appointment_time
VITE_COL_BOOKING_PHONE=phone
VITE_COL_BOOKING_CREATED=created_at
VITE_COL_BOOKING_UPDATED=updated_at

# ============================================
# BRANCH COLUMNS
# ============================================
VITE_COL_BRANCH_ID=id
VITE_COL_BRANCH_NAME=name
VITE_COL_BRANCH_ADDRESS=address
VITE_COL_BRANCH_PHONE=phone
VITE_COL_BRANCH_CREATED=created_at

# ============================================
# SERVICE COLUMNS
# ============================================
VITE_COL_SERVICE_ID=id
VITE_COL_SERVICE_NAME=name
VITE_COL_SERVICE_DESCRIPTION=description
VITE_COL_SERVICE_PRICE=price
VITE_COL_SERVICE_DURATION=duration
VITE_COL_SERVICE_CREATED=created_at

# ============================================
# ERROR COLUMNS
# ============================================
VITE_COL_ERROR_ID=id
VITE_COL_ERROR_TIMESTAMP=timestamp
VITE_COL_ERROR_SEVERITY=severity
VITE_COL_ERROR_WORKFLOW=workflow
VITE_COL_ERROR_MESSAGE=message
VITE_COL_ERROR_DETAILS=details
VITE_COL_ERROR_CREATED=created_at

# ============================================
# n8n CONFIGURATION
# ============================================
VITE_N8N_URL=https://n8n.example.com

# ============================================
# APP CONFIGURATION
# ============================================
VITE_APP_TIMEZONE=Asia/Kolkata
VITE_APP_REFRESH_INTERVAL=30000
VITE_APP_THEME=light
VITE_APP_LANGUAGE=en
```

---

## 🔍 How to Find Your Values

### Table Names
1. Go to Supabase
2. Click "Tables" sidebar
3. See all table names listed
4. Copy each one

### Column Names
1. Click on a table
2. See column headers
3. Copy each column name

### Total Variables
- **2** connection variables
- **7** table name variables
- **60+** column name variables
- **5** app configuration variables
- **Total: 74+ environment variables**

---

**All configuration goes in `.env.local` - Never commit this to git!** 🔒
