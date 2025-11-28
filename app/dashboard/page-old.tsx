'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { 
  DollarSign, 
  Users, 
  TrendingUp, 
  Target,
  ArrowUp,
  ArrowDown,
  Calendar
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuthStore } from '@/lib/store'

export default function DashboardPage() {
  const { user } = useAuthStore()
  const [stats, setStats] = useState({
    totalDonations: 0,
    totalDonors: 0,
    activeCampaigns: 0,
    thisMonthAmount: 0,
    lastMonthAmount: 0,
    donorGrowth: 0
  })

  useEffect(() => {
    // Mock data - in real app, fetch from API
    setStats({
      totalDonations: 125450.50,
      totalDonors: 342,
      activeCampaigns: 5,
      thisMonthAmount: 24500,
      lastMonthAmount: 19200,
      donorGrowth: 12.5
    })
  }, [user])

  const percentageChange = ((stats.thisMonthAmount - stats.lastMonthAmount) / stats.lastMonthAmount * 100).toFixed(1)

  const metrics = [
    {
      title: 'Total Donations',
      value: `$${stats.totalDonations.toLocaleString()}`,
      change: `+${percentageChange}%`,
      trend: 'up',
      icon: DollarSign,
      color: '#4ADE80'
    },
    {
      title: 'Total Donors',
      value: stats.totalDonors.toLocaleString(),
      change: `+${stats.donorGrowth}%`,
      trend: 'up',
      icon: Users,
      color: '#6A5ACD'
    },
    {
      title: 'Active Campaigns',
      value: stats.activeCampaigns,
      change: '2 pending',
      trend: 'neutral',
      icon: Target,
      color: '#9B87FF'
    },
    {
      title: 'This Month',
      value: `$${stats.thisMonthAmount.toLocaleString()}`,
      change: `$${stats.lastMonthAmount.toLocaleString()} last month`,
      trend: 'up',
      icon: TrendingUp,
      color: '#C7BFFF'
    }
  ]

  const recentDonations = [
    { id: 1, donor: 'John Smith', amount: 500, date: '2024-11-27', method: 'Card' },
    { id: 2, donor: 'Sarah Johnson', amount: 250, date: '2024-11-27', method: 'Bank Transfer' },
    { id: 3, donor: 'Michael Brown', amount: 1000, date: '2024-11-26', method: 'Card' },
    { id: 4, donor: 'Emily Davis', amount: 150, date: '2024-11-26', method: 'PayPal' },
    { id: 5, donor: 'David Wilson', amount: 750, date: '2024-11-25', method: 'Card' }
  ]

  const topDonors = [
    { name: 'Michael Brown', amount: 15000, donations: 24 },
    { name: 'Sarah Johnson', amount: 12500, donations: 18 },
    { name: 'John Smith', amount: 10200, donations: 15 },
    { name: 'Emily Davis', amount: 8900, donations: 12 },
    { name: 'David Wilson', amount: 7500, donations: 10 }
  ]

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[#1A1A1A] mb-2">Dashboard</h1>
            <p className="text-[#6B6B6B]">Welcome back! Here&apos;s your overview</p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-gray-200">
            <Calendar className="w-4 h-4 text-[#6B6B6B]" />
            <span className="text-sm text-[#6B6B6B]">Last 30 days</span>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-[#6B6B6B]">
                  {metric.title}
                </CardTitle>
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${metric.color}20` }}
                >
                  <metric.icon className="w-5 h-5" style={{ color: metric.color }} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-[#1A1A1A] mb-1">{metric.value}</div>
                <div className="flex items-center gap-1 text-sm">
                  {metric.trend === 'up' && (
                    <>
                      <ArrowUp className="w-4 h-4 text-[#4ADE80]" />
                      <span className="text-[#4ADE80] font-medium">{metric.change}</span>
                    </>
                  )}
                  {metric.trend === 'down' && (
                    <>
                      <ArrowDown className="w-4 h-4 text-[#EF4444]" />
                      <span className="text-[#EF4444] font-medium">{metric.change}</span>
                    </>
                  )}
                  {metric.trend === 'neutral' && (
                    <span className="text-[#6B6B6B]">{metric.change}</span>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Charts & Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Recent Donations */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Donations</CardTitle>
            <CardDescription>Latest transactions from your donors</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentDonations.map((donation) => (
                <div key={donation.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#6A5ACD] to-[#9B87FF] flex items-center justify-center text-white font-semibold text-sm">
                      {donation.donor.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="font-medium text-[#1A1A1A]">{donation.donor}</p>
                      <p className="text-xs text-[#6B6B6B]">{donation.method} • {donation.date}</p>
                    </div>
                  </div>
                  <span className="font-semibold text-[#4ADE80]">+${donation.amount}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Donors */}
        <Card>
          <CardHeader>
            <CardTitle>Top Donors</CardTitle>
            <CardDescription>Your most generous supporters</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topDonors.map((donor, index) => (
                <div key={donor.name} className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#6A5ACD] to-[#9B87FF] flex items-center justify-center text-white font-bold text-sm">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-[#1A1A1A]">{donor.name}</p>
                    <p className="text-xs text-[#6B6B6B]">{donor.donations} donations</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-[#1A1A1A]">${donor.amount.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Stats Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-[#6A5ACD] to-[#9B87FF] text-white border-0">
          <CardContent className="pt-6">
            <p className="text-sm opacity-90 mb-1">Average Donation</p>
            <p className="text-3xl font-bold">${(stats.totalDonations / stats.totalDonors).toFixed(2)}</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-[#4ADE80] to-[#4ADE80]/80 text-white border-0">
          <CardContent className="pt-6">
            <p className="text-sm opacity-90 mb-1">Conversion Rate</p>
            <p className="text-3xl font-bold">68.5%</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-[#9B87FF] to-[#C7BFFF] text-white border-0">
          <CardContent className="pt-6">
            <p className="text-sm opacity-90 mb-1">Retention Rate</p>
            <p className="text-3xl font-bold">82.3%</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
