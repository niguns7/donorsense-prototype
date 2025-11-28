# DonorSense.AI - Prototype

A complete nonprofit donation management and fundraising platform built with Next.js, TypeScript, and Tailwind CSS.

## 🚀 Features

### ✅ Implemented
- **Authentication System** - Login/Signup with email and password
- **3-Step Organization Onboarding** - Theme customization, business info, ready screen
- **Dashboard** - Real-time metrics, donation trends, top donors
- **Donation Management** - Form builder, OCR receipt upload (mock), API key integration
- **Donor Management** - Donor profiles, segmentation, donation history
- **Campaign Module** - Campaign list, progress tracking (UI)
- **Video Generation** - Template selector (UI placeholder)
- **Meta Ads** - Pixel integration UI (placeholder)
- **Dynamic Theming** - Organization colors apply to sidebar and UI

### 🔧 Tech Stack
- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **UI Components:** shadcn/ui
- **Icons:** Lucide React
- **Animations:** Framer Motion
- **Charts:** Recharts
- **State Management:** Zustand
- **Forms:** React Hook Form + Zod
- **Mock Backend:** JSON file storage (/data)

## 📦 Installation

### Prerequisites
- Node.js 22.x (use nvm: `nvm use 22`)
- Yarn package manager

### Setup Steps

1. **Clone and Install**
```bash
cd donorsense-prototype
yarn install
```

2. **Start Development Server**
```bash
yarn dev
```

3. **Open Browser**
Navigate to [http://localhost:3001](http://localhost:3001)

## 🎯 Usage

### 1. Create Account
- Go to homepage
- Click "Get Started"
- Enter email and password
- Submit to create account

### 2. Complete Onboarding
**Step 1: Theme**
- Upload logo (optional)
- Choose primary, secondary, tertiary colors
- Preview colors

**Step 2: Business Info**
- Enter organization name (required)
- Add EIN, country, state
- Provide contact email and description

**Step 3: Ready**
- Review setup
- Click "Go to Dashboard"

### 3. Explore Features

**Dashboard**
- View total donations, donors, active campaigns
- See recent donations
- Check top donors

**Donations**
- Create donation forms
- Upload receipts with OCR (mock extraction)
- Generate and use API keys

**Donors**
- Browse donor list
- View donor profiles
- Filter by tags

**Campaigns**
- View campaign progress
- Track goals and raised amounts

**Video & Meta Ads**
- UI placeholders for future features

## 📁 Project Structure

```
/app
  /api               # API routes (mock backend)
    /auth            # Login/signup endpoints
    /organizations   # Org CRUD operations
  /auth              # Authentication pages
  /dashboard         # Main dashboard
  /donations         # Donation management
  /donors            # Donor management
  /campaigns         # Campaign list
  /video             # Video generation (UI only)
  /meta              # Meta ads (UI only)
  /onboarding        # 3-step wizard
  
/components
  /ui                # shadcn/ui components
  Sidebar.tsx        # Navigation sidebar

/data                # Mock JSON database
  organizations.json
  donors.json
  donations.json
  campaigns.json
  admin.json

/lib
  db.ts              # JSON read/write functions
  store.ts           # Zustand auth store
  types.ts           # TypeScript definitions
  utils.ts           # Utility functions
```

## 🎨 Customization

### Color Theme
Colors are stored in `organizations.json` and applied dynamically:
- Primary: Sidebar active states, buttons
- Secondary: Highlights, cards
- Tertiary: Accents

### Adding Mock Data
Edit JSON files in `/data`:
- **organizations.json** - User accounts
- **donations.json** - Donation records
- **donors.json** - Donor profiles
- **campaigns.json** - Campaign data

## 🔐 Mock Authentication
- No password hashing (prototype only)
- Session stored in localStorage via Zustand
- Automatic redirect if not authenticated

## 📊 Mock Data Examples

### Sample Organization
```json
{
  "id": "org-123",
  "name": "Hope Foundation",
  "email": "admin@hope.org",
  "theme": {
    "primary": "#6A5ACD",
    "secondary": "#9B87FF",
    "tertiary": "#C7BFFF"
  },
  "isActive": true
}
```

### Sample Donation
```json
{
  "id": "don-456",
  "organizationId": "org-123",
  "donorName": "John Doe",
  "amount": 500,
  "method": "card",
  "status": "completed",
  "type": "one-time"
}
```

## 🚧 Future Enhancements
- Admin super dashboard
- Real charts with Recharts
- Form builder with drag-and-drop
- Actual OCR integration
- Meta Ads API integration
- Video generation with AI
- Email notifications
- Export reports

## 📝 Notes
- This is a **prototype** with mock data
- No real payment processing
- All data stored locally in JSON files
- No database required

## 🐛 Known Issues
- ESLint warnings for `any` types (intentional for prototype)
- Image optimization warnings (using base64 for demo)
- No error boundaries yet
- Limited form validation

## 📞 Support
For issues or questions about this prototype, refer to the codebase documentation or create an issue.

---

**Built with ❤️ for nonprofits by DonorSense.AI**
