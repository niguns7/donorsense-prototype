// Type definitions for DonorSense.AI

export interface Organization {
  id: string
  name: string
  email: string
  password: string
  ein?: string
  country?: string
  state?: string
  description?: string
  logo?: string
  theme: {
    primary: string
    secondary: string
    tertiary: string
  }
  apiKey?: string
  isActive: boolean
  createdAt: string
  updatedAt?: string
}

export interface Donor {
  id: string
  organizationId: string
  name: string
  email: string
  phone?: string
  address?: string
  totalDonated: number
  donationCount: number
  firstDonation?: string
  lastDonation?: string
  tags: string[]
  createdAt: string
  updatedAt?: string
}

export interface Donation {
  id: string
  organizationId: string
  donorId: string
  donorName: string
  donorEmail: string
  amount: number
  currency: string
  method: 'card' | 'bank' | 'check' | 'cash' | 'other'
  status: 'completed' | 'pending' | 'failed'
  type: 'one-time' | 'recurring'
  frequency?: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'annually'
  source: 'online' | 'offline' | 'campaign' | 'api'
  campaignId?: string
  notes?: string
  receiptUrl?: string
  createdAt: string
}

export interface Campaign {
  id: string
  organizationId: string
  name: string
  goal: number
  raised: number
  status: 'draft' | 'live' | 'scheduled' | 'completed'
  startDate?: string
  endDate?: string
  description?: string
  imageUrl?: string
  createdAt: string
}

export interface DonationForm {
  id: string
  organizationId: string
  name: string
  title: string
  description: string
  allowOneTime: boolean
  allowRecurring: boolean
  recurringOptions: string[]
  minAmount?: number
  suggestedAmounts: number[]
  customFields: FormField[]
  isActive: boolean
  createdAt: string
}

export interface FormField {
  id: string
  label: string
  type: 'text' | 'email' | 'phone' | 'address' | 'select' | 'checkbox'
  required: boolean
  options?: string[]
}

export interface AdminData {
  revenue: {
    mrr: number
    arr: number
    ltv: number
    churn: number
  }
  organizations: Organization[]
  systemHealth: {
    apiStatus: 'operational' | 'degraded' | 'down'
    latency: number
    errorRate: number
    uptime: number
  }
}
