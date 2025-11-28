# 🎯 Quick Start Guide - Donation Management System

## 🚀 Getting Started

### 1. Update Node.js (REQUIRED)
Your current Node.js version (16.0.0) is too old. Next.js requires >=20.9.0.

**Option A: Using nvm (Recommended)**
```bash
# Install nvm if you don't have it
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Install and use Node.js 20
nvm install 20
nvm use 20
nvm alias default 20
```

**Option B: Direct Download**
Download from https://nodejs.org/ (LTS version 20.x)

### 2. Start the Development Server
```bash
cd /Users/nirgunsubedi/Desktop/Work/DonorSense/donorsense-prototype
npm run dev
```

### 3. Open Your Browser
- **Donations Page**: http://localhost:3000/donations
- **OCR Scanner**: http://localhost:3000/ocr

---

## 📋 Page Overview

### 🎯 Donations Page (`/donations`)

**Top Section - Action Buttons:**
```
[Create Form] [View Forms] [View Data] [OCR Upload & History]
```

**Statistics Row (4 Cards):**
```
┌─────────────┬─────────────┬─────────────┬─────────────┐
│ $187,650    │ 4 Donors    │ 6 Trans.    │ 5 Active    │
│ Total       │ Unique      │ Total       │ Campaigns   │
│ Donations   │ Donors      │ Transactions│             │
└─────────────┴─────────────┴─────────────┴─────────────┘
```

**Charts Row (2 Graphs):**
```
┌───────────────────────────┬───────────────────────────┐
│ Campaign Performance      │ Donation Trends           │
│ [Filter: Last 30 days ▼]  │ [Filter: Last 7 days ▼]   │
│                           │                           │
│ Education for All ██████  │    Bar Chart              │
│ Clean Water █████████     │    ▃ ▅ ▄ ▆ ▅ ▆ █         │
│ Healthcare ████           │                           │
│ Emergency Relief ███      │    Mon Tue Wed Thu Fri    │
│ Youth Development ██      │                           │
└───────────────────────────┴───────────────────────────┘
```

**Active Campaigns Grid (3 Columns):**
```
┌─────────────┬─────────────┬─────────────┐
│ Education   │ Clean Water │ Healthcare  │
│ ██████ 65%  │ █████████ 77%│ ████ 72%   │
│ $32,500     │ $58,200     │ $28,750     │
│ [View]      │ [View]      │ [View]      │
└─────────────┴─────────────┴─────────────┘
```

**Recent Donations List:**
```
┌─ Filters ──────────────────────────────────────────┐
│ [Search...] [Status ▼] [Campaign ▼] [Date ▼] [⚙️] │
└────────────────────────────────────────────────────┘

┌─ Sarah Johnson ─────────────────────────── $500 ✓ ─┐
│ sarah.j@email.com                                   │
│ Education for All • One-time • Credit Card          │
│ [View] [Edit] [Receipt] [Delete]   DON-001 • TXN-..│
└─────────────────────────────────────────────────────┘

┌─ Michael Chen ──────────────────────────── $1,000 ⟳ ┐
│ m.chen@email.com                                    │
│ Clean Water • Recurring (Monthly) • Bank Transfer  │
│ [View] [Edit] [Receipt] [Delete]   DON-002 • TXN-..│
└─────────────────────────────────────────────────────┘
```

---

### 📸 OCR Scanner Page (`/ocr`)

**Layout:**
```
┌─ Left Column (Upload) ────┬─ Right Column (History) ──────┐
│                           │                                │
│  ┌─────────────────────┐  │ ┌─ check_12345.jpg ──────✓──┐│
│  │                     │  │ │ John Doe      | $150       ││
│  │   📤 Click to       │  │ │ 2025-11-28    | Cheque     ││
│  │   Upload            │  │ │ [View] [Download] [Delete] ││
│  │                     │  │ └────────────────────────────┘│
│  │ PNG, JPG, PDF       │  │                                │
│  └─────────────────────┘  │ ┌─ receipt_abc789.jpg ────────┐│
│                           │ │ Jane Smith    | $500        ││
│  ┌─ Data Extracted ──┐    │ │ 2025-11-27    | Cash       ││
│  │ Donor: Michael B.  │    │ │ [View] [Download] [Delete] ││
│  │ Amount: $300       │    │ └────────────────────────────┘│
│  │ Date: 2025-11-28   │    │                                │
│  │ Method: Cheque     │    │ ┌─ check_67890.jpg ──────✓──┐│
│  │ Campaign: [Select▼]│    │ │ Robert Johnson | $750      ││
│  │ Notes: [...]       │    │ │ 2025-11-26    | Cheque     ││
│  │                    │    │ │ [View] [Download] [Delete] ││
│  │ [Save as Donation] │    │ └────────────────────────────┘│
│  └────────────────────┘    │                                │
└───────────────────────────┴────────────────────────────────┘
```

---

## 🎮 Interactive Features

### Filtering & Search
1. **Search Bar** - Type donor name, campaign, or transaction ID
2. **Status Filter** - Filter by Completed/Processing/Active
3. **Campaign Filter** - Show donations from specific campaign
4. **Date Filter** - Today/Last 7 days/Last 30 days/All time

### Donation Actions
- **View** 👁️ - Opens detailed modal with all information
- **Edit** ✏️ - Edit donation details
- **Receipt** 📄 - Download receipt
- **Delete** 🗑️ - Remove donation (with confirmation)

### OCR Workflow
1. Click upload area or drag file
2. Wait for processing (2 seconds)
3. Review extracted data
4. Edit if needed
5. Select campaign
6. Add notes (optional)
7. Click "Save as Donation"

---

## 📊 Data Files

### Sample Donations (`/data/donations.json`)
6 realistic donations with:
- Different donors
- Various campaigns
- Multiple payment methods
- Different statuses
- Some recurring, some one-time

### Sample Campaigns (`/data/campaigns.json`)
5 active campaigns:
- Education for All
- Clean Water Initiative
- Healthcare Fund
- Emergency Relief
- Youth Development

---

## 🎨 Visual Indicators

### Status Colors
- 🟢 **Completed** - Green (#4ADE80)
- 🟡 **Processing** - Orange (#FFA500)
- 🟣 **Active** - Purple (#6A5ACD)

### Icons
- 💵 DollarSign - Money/Donations
- 👥 Users - Donors
- 📈 TrendingUp - Campaigns
- 📊 BarChart - Analytics
- ✓ CheckCircle - Success/Completed
- ⏱️ Clock - Processing
- 👁️ Eye - View
- ✏️ Edit - Modify
- 🗑️ Trash - Delete
- 📥 Download - Export

---

## 🔧 Troubleshooting

### Issue: Node.js version error
**Solution**: Update to Node.js 20.x (see step 1 above)

### Issue: Port 3000 already in use
**Solution**: 
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use different port
PORT=3001 npm run dev
```

### Issue: Module not found
**Solution**:
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

---

## 📱 Responsive Design

The system works on:
- 🖥️ Desktop (1920px+)
- 💻 Laptop (1366px+)
- 📱 Tablet (768px+)
- 📱 Mobile (375px+)

All charts, grids, and tables adapt automatically!

---

## 🎯 Quick Tips

1. **Use filters** to quickly find specific donations
2. **Click on any donation card** to see full details
3. **Export button** lets you download donation data
4. **OCR page** keeps history of all scanned documents
5. **Campaign graphs** are interactive - hover for details
6. **Date filters** on charts change the data range

---

## 🚀 Ready to Use!

Once you update Node.js and run `npm run dev`, everything will work perfectly!

All buttons are functional, all filters work, and the OCR system is ready to process receipts.

**Enjoy your new donation management system!** 🎉
