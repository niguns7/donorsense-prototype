'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Users, Search, Filter, Mail, Phone, DollarSign, Calendar } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function DonorsPage() {
  const [searchQuery, setSearchQuery] = useState('')

  const donors = [
    { id: 1, name: 'Michael Brown', email: 'michael@email.com', phone: '(555) 123-4567', totalDonated: 15000, donationCount: 24, lastDonation: '2024-11-26', tags: ['Major Donor', 'Monthly'] },
    { id: 2, name: 'Sarah Johnson', email: 'sarah@email.com', phone: '(555) 234-5678', totalDonated: 12500, donationCount: 18, lastDonation: '2024-11-25', tags: ['Monthly', 'Corporate'] },
    { id: 3, name: 'John Smith', email: 'john@email.com', phone: '(555) 345-6789', totalDonated: 10200, donationCount: 15, lastDonation: '2024-11-24', tags: ['Major Donor'] },
    { id: 4, name: 'Emily Davis', email: 'emily@email.com', phone: '(555) 456-7890', totalDonated: 8900, donationCount: 12, lastDonation: '2024-11-23', tags: ['Monthly'] },
    { id: 5, name: 'David Wilson', email: 'david@email.com', phone: '(555) 567-8901', totalDonated: 7500, donationCount: 10, lastDonation: '2024-11-22', tags: ['Corporate'] }
  ]

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#1A1A1A] mb-2">Donor Management</h1>
        <p className="text-[#6B6B6B]">View and manage your donor relationships</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Donors', value: '342', icon: Users, color: '#6A5ACD' },
          { label: 'Active Monthly', value: '89', icon: Calendar, color: '#4ADE80' },
          { label: 'Major Donors', value: '23', icon: DollarSign, color: '#9B87FF' },
          { label: 'New This Month', value: '12', icon: Users, color: '#C7BFFF' }
        ].map((stat, i) => (
          <Card key={i}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-[#6B6B6B]">{stat.label}</span>
                <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
              </div>
              <p className="text-2xl font-bold text-[#1A1A1A]">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Search and Filter */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B6B6B]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search donors by name, email..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6A5ACD]"
              />
            </div>
            <Button variant="outline">
              <Filter className="w-4 h-4" />
              Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Donors List */}
      <Card>
        <CardHeader>
          <CardTitle>All Donors</CardTitle>
          <CardDescription>Manage and view donor profiles</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {donors.map((donor, index) => (
              <motion.div
                key={donor.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="p-4 border border-gray-200 rounded-xl hover:shadow-lg transition-all cursor-pointer"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#6A5ACD] to-[#9B87FF] flex items-center justify-center text-white font-bold">
                      {donor.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-[#1A1A1A] mb-1">{donor.name}</h4>
                      <div className="flex items-center gap-4 text-sm text-[#6B6B6B]">
                        <span className="flex items-center gap-1">
                          <Mail className="w-3 h-3" />
                          {donor.email}
                        </span>
                        <span className="flex items-center gap-1">
                          <Phone className="w-3 h-3" />
                          {donor.phone}
                        </span>
                      </div>
                      <div className="flex gap-2 mt-2">
                        {donor.tags.map(tag => (
                          <span key={tag} className="px-2 py-1 text-xs bg-[#C7BFFF]/20 text-[#6A5ACD] rounded-full font-medium">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-[#1A1A1A]">${donor.totalDonated.toLocaleString()}</p>
                    <p className="text-sm text-[#6B6B6B]">{donor.donationCount} donations</p>
                    <p className="text-xs text-[#6B6B6B] mt-1">Last: {donor.lastDonation}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
