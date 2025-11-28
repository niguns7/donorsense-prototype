'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { 
  Plus,
  Upload,
  DollarSign,
  FileText,
  Eye,
  Edit,
  Trash2,
  Download,
  Filter,
  Search,
  TrendingUp,
  Users,
  BarChart3,
  ExternalLink,
  CheckCircle2,
  Clock,
  AlertCircle
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import donationsData from '@/data/donations.json'
import campaignsData from '@/data/campaigns.json'

interface Donation {
  id: string
  donor: {
    name: string
    email: string
    phone: string
  }
  campaign: {
    id: string
    name: string
  }
  amount: number
  currency: string
  type: string
  method: string
  status: string
  date: string
  transactionId: string
  receipt: string
  notes?: string
  frequency?: string
  checkNumber?: string
}

interface Campaign {
  id: string
  name: string
  description: string
  goal: number
  raised: number
  donors: number
  startDate: string
  endDate: string
  status: string
  category: string
}

export default function DonationsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [campaignFilter, setCampaignFilter] = useState<string>('all')
  const [dateFilter, setDateFilter] = useState<string>('all')
  const [selectedDonation, setSelectedDonation] = useState<Donation | null>(null)

  const donations: Donation[] = donationsData as Donation[]
  const campaigns: Campaign[] = campaignsData as Campaign[]

  // Filter donations
  const filteredDonations = useMemo(() => {
    return donations.filter(donation => {
      const matchesSearch = 
        donation.donor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        donation.campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        donation.transactionId.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesStatus = statusFilter === 'all' || donation.status === statusFilter
      const matchesCampaign = campaignFilter === 'all' || donation.campaign.id === campaignFilter
      
      let matchesDate = true
      if (dateFilter !== 'all') {
        const donationDate = new Date(donation.date)
        const now = new Date()
        const daysDiff = Math.floor((now.getTime() - donationDate.getTime()) / (1000 * 60 * 60 * 24))
        
        if (dateFilter === 'today') matchesDate = daysDiff === 0
        else if (dateFilter === '7days') matchesDate = daysDiff <= 7
        else if (dateFilter === '30days') matchesDate = daysDiff <= 30
      }
      
      return matchesSearch && matchesStatus && matchesCampaign && matchesDate
    })
  }, [donations, searchTerm, statusFilter, campaignFilter, dateFilter])

  // Calculate campaign stats for charts
  const campaignStats = useMemo(() => {
    const stats: Record<string, { total: number; count: number; campaign: Campaign }> = {}
    
    donations.forEach(donation => {
      const campaignId = donation.campaign.id
      if (!stats[campaignId]) {
        const campaign = campaigns.find(c => c.id === campaignId)
        if (campaign) {
          stats[campaignId] = { total: 0, count: 0, campaign }
        }
      }
      if (stats[campaignId] && donation.status === 'Completed') {
        stats[campaignId].total += donation.amount
        stats[campaignId].count += 1
      }
    })
    
    return Object.values(stats).sort((a, b) => b.total - a.total)
  }, [donations, campaigns])

  // Calculate overall stats
  const totalDonations = donations.reduce((sum, d) => d.status === 'Completed' ? sum + d.amount : sum, 0)
  const totalDonors = new Set(donations.map(d => d.donor.email)).size
  const activeCampaigns = campaigns.filter(c => c.status === 'Active').length

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Completed':
        return <CheckCircle2 className="w-4 h-4 text-[#4ADE80]" />
      case 'Processing':
        return <Clock className="w-4 h-4 text-[#FFA500]" />
      case 'Active':
        return <TrendingUp className="w-4 h-4 text-[#6A5ACD]" />
      default:
        return <AlertCircle className="w-4 h-4 text-[#6B6B6B]" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-[#4ADE80]/10 text-[#4ADE80]'
      case 'Processing':
        return 'bg-[#FFA500]/10 text-[#FFA500]'
      case 'Active':
        return 'bg-[#6A5ACD]/10 text-[#6A5ACD]'
      default:
        return 'bg-gray-100 text-gray-600'
    }
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#1A1A1A] mb-2">Donation Management</h1>
        <p className="text-[#6B6B6B]">Track, manage, and analyze all donations</p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3 mb-6">
        <Link href="/donations/forms/builder">
          <Button className="bg-[#6A5ACD] hover:bg-[#5A4ABD]">
            <Plus className="w-4 h-4" />
            Create Donation Form
          </Button>
        </Link>
        <Link href="/donations/forms/builder">
          <Button variant="outline">
            <Eye className="w-4 h-4" />
            Manage Donation Forms
          </Button>
        </Link>
        <Link href="/ocr">
          <Button variant="outline">
            <Upload className="w-4 h-4" />
            OCR Upload & History
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="border-l-4 border-l-[#6A5ACD] h-42">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-1">
                <DollarSign className="w-6 h-6 text-[#6A5ACD]" />
                <span className="text-xs text-[#4ADE80] font-medium">+12.5%</span>
              </div>
              <h3 className="text-xl font-bold text-[#1A1A1A]">
                ${totalDonations.toLocaleString()}
              </h3>
              <p className="text-xs text-[#6B6B6B]">Total Donations</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="border-l-4 border-l-[#4ADE80] h-42">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-1">
                <Users className="w-6 h-6 text-[#4ADE80]" />
                <span className="text-xs text-[#4ADE80] font-medium">+8.3%</span>
              </div>
              <h3 className="text-xl font-bold text-[#1A1A1A]">{totalDonors}</h3>
              <p className="text-xs text-[#6B6B6B]">Unique Donors</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="border-l-4 border-l-[#9B87FF] h-42">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-1">
                <TrendingUp className="w-6 h-6 text-[#9B87FF]" />
                <span className="text-xs text-[#4ADE80] font-medium">Active</span>
              </div>
              <h3 className="text-xl font-bold text-[#1A1A1A]">{donations.length}</h3>
              <p className="text-xs text-[#6B6B6B]">Total Transactions</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="border-l-4 border-l-[#FFA500] h-42">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-1">
                <BarChart3 className="w-6 h-6 text-[#FFA500]" />
                <span className="text-xs text-[#4ADE80] font-medium">+5</span>
              </div>
              <h3 className="text-xl font-bold text-[#1A1A1A]">{activeCampaigns}</h3>
              <p className="text-xs text-[#6B6B6B]">Active Campaigns</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Campaign Performance Charts */}
      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Campaign Performance</CardTitle>
                <CardDescription>Donations by campaign (last 30 days)</CardDescription>
              </div>
              <select className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm">
                <option>Last 7 days</option>
                <option>Last 30 days</option>
                <option>Last 90 days</option>
                <option>This year</option>
              </select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {campaignStats.slice(0, 5).map((stat, index) => {
                const percentage = (stat.campaign.raised / stat.campaign.goal) * 100
                return (
                  <div key={stat.campaign.id}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-[#1A1A1A]">
                        {stat.campaign.name}
                      </span>
                      <span className="text-sm text-[#6B6B6B]">
                        ${stat.total.toLocaleString()} ({stat.count} donations)
                      </span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        transition={{ duration: 0.8, delay: index * 0.1 }}
                        className="h-full bg-gradient-to-r from-[#6A5ACD] to-[#9B87FF] rounded-full"
                      />
                    </div>
                    <p className="text-xs text-[#6B6B6B] mt-1">
                      {percentage.toFixed(1)}% of ${stat.campaign.goal.toLocaleString()} goal
                    </p>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Donation Trends</CardTitle>
                <CardDescription>Daily donation volume</CardDescription>
              </div>
              <select className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm">
                <option>Last 7 days</option>
                <option>Last 30 days</option>
                <option>Last 90 days</option>
              </select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[240px] flex items-end justify-between gap-2">
              {[65, 80, 75, 90, 85, 95, 100].map((height, index) => (
                <motion.div
                  key={index}
                  initial={{ height: 0 }}
                  animate={{ height: `${height}%` }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex-1 bg-gradient-to-t from-[#6A5ACD] to-[#9B87FF] rounded-t-lg relative group cursor-pointer hover:opacity-80 transition-opacity"
                >
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#1A1A1A] text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    ${(height * 50).toFixed(0)}
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="flex justify-between mt-4 text-xs text-[#6B6B6B]">
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
              <span>Sun</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Active Campaigns Grid */}
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Active Campaigns</CardTitle>
              <CardDescription>View details and manage your campaigns</CardDescription>
            </div>
            <Link href="/campaigns">
              <Button variant="outline" size="sm">
                <ExternalLink className="w-4 h-4" />
                View All
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {campaigns.filter(c => c.status === 'Active').map((campaign, index) => {
              const percentage = (campaign.raised / campaign.goal) * 100
              return (
                <motion.div
                  key={campaign.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-[#6A5ACD]">
                    <CardContent className="p-5">
                      <div className="flex items-start justify-between mb-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#6A5ACD] to-[#9B87FF] flex items-center justify-center">
                          <TrendingUp className="w-5 h-5 text-white" />
                        </div>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(campaign.status)}`}>
                          {campaign.status}
                        </span>
                      </div>
                      <h4 className="font-semibold text-[#1A1A1A] mb-1">{campaign.name}</h4>
                      <p className="text-xs text-[#6B6B6B] mb-3 line-clamp-2">{campaign.description}</p>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-[#6B6B6B]">Progress</span>
                          <span className="font-medium text-[#1A1A1A]">{percentage.toFixed(0)}%</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${percentage}%` }}
                            transition={{ duration: 0.8, delay: index * 0.1 }}
                            className="h-full bg-gradient-to-r from-[#6A5ACD] to-[#9B87FF]"
                          />
                        </div>
                        <div className="flex justify-between items-end">
                          <div>
                            <p className="text-lg font-bold text-[#1A1A1A]">
                              ${campaign.raised.toLocaleString()}
                            </p>
                            <p className="text-xs text-[#6B6B6B]">
                              of ${campaign.goal.toLocaleString()}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-semibold text-[#6A5ACD]">{campaign.donors}</p>
                            <p className="text-xs text-[#6B6B6B]">donors</p>
                          </div>
                        </div>
                      </div>

                      <Button variant="outline" size="sm" className="w-full mt-4">
                        <Eye className="w-4 h-4" />
                        View Details
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Recent Donations List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between mb-4">
            <div>
              <CardTitle>Recent Donations</CardTitle>
              <CardDescription>All donations from different campaigns</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4" />
              Export
            </Button>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-3">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B6B6B]" />
              <input
                type="text"
                placeholder="Search by donor, campaign, or transaction..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#6A5ACD] focus:border-transparent"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#6A5ACD]"
            >
              <option value="all">All Status</option>
              <option value="Completed">Completed</option>
              <option value="Processing">Processing</option>
              <option value="Active">Active</option>
            </select>

            <select
              value={campaignFilter}
              onChange={(e) => setCampaignFilter(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#6A5ACD]"
            >
              <option value="all">All Campaigns</option>
              {campaigns.map(campaign => (
                <option key={campaign.id} value={campaign.id}>{campaign.name}</option>
              ))}
            </select>

            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#6A5ACD]"
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="7days">Last 7 Days</option>
              <option value="30days">Last 30 Days</option>
            </select>

            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4" />
              More Filters
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredDonations.map((donation, index) => (
              <motion.div
                key={donation.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="p-4 border border-gray-200 rounded-xl hover:shadow-md transition-all hover:border-[#6A5ACD] cursor-pointer"
                onClick={() => setSelectedDonation(donation)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#6A5ACD] to-[#9B87FF] flex items-center justify-center flex-shrink-0">
                      <DollarSign className="w-6 h-6 text-white" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-semibold text-[#1A1A1A]">{donation.donor.name}</h4>
                          <p className="text-sm text-[#6B6B6B]">{donation.donor.email}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xl font-bold text-[#1A1A1A]">
                            ${donation.amount.toLocaleString()}
                          </p>
                          <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${getStatusColor(donation.status)}`}>
                            {getStatusIcon(donation.status)}
                            {donation.status}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                        <div>
                          <p className="text-[#6B6B6B] text-xs mb-0.5">Campaign</p>
                          <p className="font-medium text-[#1A1A1A] truncate">{donation.campaign.name}</p>
                        </div>
                        <div>
                          <p className="text-[#6B6B6B] text-xs mb-0.5">Type</p>
                          <p className="font-medium text-[#1A1A1A]">
                            {donation.type}
                            {donation.frequency && ` (${donation.frequency})`}
                          </p>
                        </div>
                        <div>
                          <p className="text-[#6B6B6B] text-xs mb-0.5">Method</p>
                          <p className="font-medium text-[#1A1A1A]">{donation.method}</p>
                        </div>
                        <div>
                          <p className="text-[#6B6B6B] text-xs mb-0.5">Date</p>
                          <p className="font-medium text-[#1A1A1A]">
                            {new Date(donation.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>

                      {donation.notes && (
                        <p className="text-xs text-[#6B6B6B] mt-2 italic">Note: {donation.notes}</p>
                      )}

                      <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-100">
                        <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); }}>
                          <Eye className="w-4 h-4" />
                          View
                        </Button>
                        <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); }}>
                          <Edit className="w-4 h-4" />
                          Edit
                        </Button>
                        <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); }}>
                          <Download className="w-4 h-4" />
                          Receipt
                        </Button>
                        <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); }}>
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </Button>
                        <div className="ml-auto text-xs text-[#6B6B6B] font-mono">
                          ID: {donation.id} • TXN: {donation.transactionId}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredDonations.length === 0 && (
            <div className="text-center py-12">
              <FileText className="w-16 h-16 text-[#6B6B6B] mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-semibold text-[#1A1A1A] mb-2">No donations found</h3>
              <p className="text-[#6B6B6B]">Try adjusting your filters or search terms</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Donation Detail Modal */}
      {selectedDonation && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedDonation(null)}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-gray-200 sticky top-0 bg-white">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-[#1A1A1A]">Donation Details</h2>
                  <p className="text-[#6B6B6B]">Complete donation information</p>
                </div>
                <button
                  onClick={() => setSelectedDonation(null)}
                  className="text-[#6B6B6B] hover:text-[#1A1A1A] text-2xl"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Amount */}
              <div className="text-center p-6 bg-gradient-to-br from-[#6A5ACD]/10 to-transparent rounded-xl">
                <p className="text-[#6B6B6B] mb-2">Donation Amount</p>
                <p className="text-4xl font-bold text-[#1A1A1A] mb-2">
                  ${selectedDonation.amount.toLocaleString()}
                </p>
                <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedDonation.status)}`}>
                  {getStatusIcon(selectedDonation.status)}
                  {selectedDonation.status}
                </span>
              </div>

              {/* Donor Information */}
              <div>
                <h3 className="font-semibold text-[#1A1A1A] mb-3 flex items-center gap-2">
                  <Users className="w-5 h-5 text-[#6A5ACD]" />
                  Donor Information
                </h3>
                <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-xl">
                  <div>
                    <p className="text-xs text-[#6B6B6B] mb-1">Name</p>
                    <p className="font-medium text-[#1A1A1A]">{selectedDonation.donor.name}</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#6B6B6B] mb-1">Email</p>
                    <p className="font-medium text-[#1A1A1A]">{selectedDonation.donor.email}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-xs text-[#6B6B6B] mb-1">Phone</p>
                    <p className="font-medium text-[#1A1A1A]">{selectedDonation.donor.phone}</p>
                  </div>
                </div>
              </div>

              {/* Donation Details */}
              <div>
                <h3 className="font-semibold text-[#1A1A1A] mb-3 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-[#6A5ACD]" />
                  Donation Details
                </h3>
                <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-xl">
                  <div>
                    <p className="text-xs text-[#6B6B6B] mb-1">Campaign</p>
                    <p className="font-medium text-[#1A1A1A]">{selectedDonation.campaign.name}</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#6B6B6B] mb-1">Type</p>
                    <p className="font-medium text-[#1A1A1A]">{selectedDonation.type}</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#6B6B6B] mb-1">Method</p>
                    <p className="font-medium text-[#1A1A1A]">{selectedDonation.method}</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#6B6B6B] mb-1">Date</p>
                    <p className="font-medium text-[#1A1A1A]">
                      {new Date(selectedDonation.date).toLocaleString()}
                    </p>
                  </div>
                  {selectedDonation.frequency && (
                    <div>
                      <p className="text-xs text-[#6B6B6B] mb-1">Frequency</p>
                      <p className="font-medium text-[#1A1A1A]">{selectedDonation.frequency}</p>
                    </div>
                  )}
                  {selectedDonation.checkNumber && (
                    <div>
                      <p className="text-xs text-[#6B6B6B] mb-1">Check Number</p>
                      <p className="font-medium text-[#1A1A1A]">{selectedDonation.checkNumber}</p>
                    </div>
                  )}
                  <div>
                    <p className="text-xs text-[#6B6B6B] mb-1">Transaction ID</p>
                    <p className="font-medium text-[#1A1A1A] font-mono text-xs">{selectedDonation.transactionId}</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#6B6B6B] mb-1">Receipt Number</p>
                    <p className="font-medium text-[#1A1A1A]">{selectedDonation.receipt}</p>
                  </div>
                  {selectedDonation.notes && (
                    <div className="col-span-2">
                      <p className="text-xs text-[#6B6B6B] mb-1">Notes</p>
                      <p className="font-medium text-[#1A1A1A]">{selectedDonation.notes}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <Button className="flex-1">
                  <Download className="w-4 h-4" />
                  Download Receipt
                </Button>
                <Button variant="outline" className="flex-1">
                  <Edit className="w-4 h-4" />
                  Edit Donation
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}
