# Tampil Bugar - Cashier App Mockup

A functional UI mockup/prototype for a massage and reflexology business cashier application. This prototype demonstrates the complete cashier workflow with hardcoded sample data.

## 🎯 Purpose

This is an **interactive mockup** designed to:
- Visualize the complete cashier workflow
- Demonstrate UI/UX interactions
- Gather feedback before full development
- Validate business requirements

**Note**: This is NOT a production application. All data is hardcoded and no backend integration exists.

## ✨ Features

### 1. Transaction Screen
- Service selection with multiple options
- Duration-based pricing (30/60/90 minutes)
- Therapist assignment
- Client information capture
- Quantity selection
- Real-time subtotal calculation
- Promo code support (WELCOME10, SAVE5)
- Dynamic service addition/removal

### 2. Payment Screen
- Multiple payment methods:
  - 💵 Cash
  - 💳 Credit/Debit Card
  - 📱 QRIS (with QR code placeholder)
- Tip options (preset and custom)
- Complete payment breakdown
- Transaction summary

### 3. Receipt Screen
- Professional receipt layout
- Complete transaction details
- Print functionality
- Quick actions for new transaction

### 4. Dashboard
- Revenue summary
- Transaction statistics
- Service breakdown with visual charts
- Payment method analytics
- Today vs. Week view toggle
- Recent transactions table

### 5. Client History
- Client database view
- Visit tracking
- Total spending per client
- Last visit information
- VIP client identification
- Search functionality
- Top clients ranking

## 🎨 Sample Data

### Services & Pricing
```
Full Body Massage:
- 30 min: $30
- 60 min: $60
- 90 min: $85

Foot Reflex:
- 30 min: $25
- 60 min: $50

Back Massage:
- 30 min: $20
- 60 min: $40
- 90 min: $55
```

### Staff Members
- Siti
- Budi
- Ani
- Rudi

### Sample Clients
- Rina (2 visits)
- Ahmad (5 visits)
- Siti (1 visit)

### Promo Codes
- `WELCOME10` - 10% discount
- `SAVE5` - $5 off

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Cece124/tampilbugar.git
cd tampilbugar
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to:
```
http://localhost:5173
```

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## 🌐 Live Preview

**Tampil Bugar is now live!** You can access the interactive mockup at:

**[https://tampilbugar.vercel.app](https://tampilbugar.vercel.app)**

This live preview allows you to:
- ✅ Test all screens and interactions without installing anything
- ✅ Share the link with stakeholders for feedback
- ✅ View the app on different devices (mobile, tablet, desktop)
- ✅ Experience the complete cashier workflow

**Note**: This is a deployed version of the mockup. All data is still hardcoded and will reset on page refresh. No backend integration exists.

## 📱 Responsive Design

The application is fully responsive and works on:
- 📱 Mobile devices (320px+)
- 📲 Tablets (768px+)
- 💻 Desktops (1024px+)

## 🖨️ Print Functionality

The receipt screen includes print functionality:
- Click "Print Receipt" on the receipt screen
- Or use browser print (Ctrl/Cmd + P)
- Print layout is optimized for thermal receipt printers

## 🎮 How to Test the Mockup

### Complete Transaction Flow

1. **Start a Transaction**
   - Select a service (e.g., "Full Body Massage")
   - Choose duration (e.g., "60 min - $60.00")
   - Select a therapist (e.g., "Siti")
   - Set quantity (default: 1)
   - Click "Add to Transaction"

2. **Add Client Information**
   - Enter client name (required)
   - Optionally add phone number

3. **Apply Promo Code** (optional)
   - Enter "WELCOME10" or "SAVE5"
   - Click "Apply"

4. **Proceed to Payment**
   - Click "Proceed to Payment"
   - Add tip (optional)
   - Select payment method
   - Click "Complete Payment"

5. **View Receipt**
   - Review transaction details
   - Print if needed
   - Start new transaction or view dashboard

### Explore Dashboard

1. Click "📊 Dashboard" in navigation
2. Toggle between "Today" and "This Week"
3. View revenue, transaction count, and averages
4. Check service and payment breakdowns
5. Review recent transactions

### Check Client History

1. Click "👥 Clients" in navigation
2. View all clients sorted by visits
3. Search for specific clients
4. Check VIP clients (5+ visits)
5. Review top clients and recent activity

## 🔧 Technical Stack

- **Framework**: React 19.2.3
- **Build Tool**: Vite 7.3.0
- **Styling**: Tailwind CSS 4.1.18
- **State Management**: React Context API
- **Language**: JavaScript (ES6+)

## 📂 Project Structure

```
tampilbugar/
├── src/
│   ├── components/          # React components
│   │   ├── Navigation.jsx
│   │   ├── TransactionScreen.jsx
│   │   ├── PaymentScreen.jsx
│   │   ├── ReceiptScreen.jsx
│   │   ├── DashboardScreen.jsx
│   │   └── ClientsScreen.jsx
│   ├── contexts/            # React Context for state
│   │   └── AppContext.jsx
│   ├── data/                # Mock data
│   │   └── mockData.js
│   ├── utils/               # Helper functions
│   │   └── helpers.js
│   ├── App.jsx              # Main app component
│   ├── main.jsx             # Entry point
│   └── index.css            # Global styles
├── public/                  # Static assets
├── index.html               # HTML template
├── vite.config.js           # Vite configuration
├── tailwind.config.js       # Tailwind configuration
├── postcss.config.js        # PostCSS configuration
└── package.json             # Dependencies
```

## 🎯 Next Steps - Data Collection

To prepare for production development, please provide:

### 1. Complete Service List
- Service names
- Available durations for each service
- Pricing for each duration
- Service categories (if any)
- Any seasonal or promotional services

### 2. Staff Information
- Complete staff list
- Staff roles/specializations
- Working hours/availability
- Commission structure (if applicable)

### 3. Business Rules
- Tax rate (currently 10%)
- Tip guidelines
- Discount policies
- Membership programs
- Loyalty rewards
- Cancellation policies

### 4. Payment Processing
- Preferred payment gateway
- Supported payment methods
- Currency preferences
- Receipt format requirements

### 5. Reporting Needs
- Required reports (daily, weekly, monthly)
- Key performance indicators (KPIs)
- Export formats needed
- Integration with accounting software

### 6. Client Management
- Required client information fields
- Privacy/GDPR requirements
- Client communication preferences
- Marketing consent handling

### 7. Hardware Requirements
- Receipt printer specifications
- Card reader type
- Tablet/device specifications
- Internet connectivity requirements

### 8. Integration Requirements
- Booking system integration
- Inventory management
- Employee scheduling
- Accounting software
- Marketing tools (email, SMS)

### 9. Multi-location Support
- Number of locations
- Centralized vs. distributed data
- Inter-location transfers
- Location-specific pricing

### 10. User Roles & Permissions
- Staff roles (cashier, manager, admin)
- Permission levels
- Time clock requirements
- Audit trail needs

## 🐛 Known Limitations (Mockup Only)

- No backend - all data is lost on refresh
- No authentication/authorization
- Payment methods are simulated
- No actual printing (uses browser print)
- No data persistence
- No real-time updates
- No backend validation
- Limited error handling

## 📝 Feedback & Questions

Please provide feedback on:
1. User interface and design
2. Workflow and user experience
3. Missing features or functionality
4. Screen layouts and navigation
5. Mobile responsiveness
6. Any confusing elements

## 📄 License

ISC

## 👥 Contributors

This is a prototype/mockup for demonstration purposes.

---

**Remember**: This is a MOCKUP for visualization and feedback. All features shown are for demonstration only and do not connect to any real backend services or payment processors.
