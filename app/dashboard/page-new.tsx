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
  Eye,
  Filter
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuthStore } from '@/lib/store'
import { useTheme } from '@/lib/theme-context'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { Button } from '@/components/ui/button'

export default function DashboardPage() {
  const { user } = useAuthStore()
  const { theme } = useTheme()
  const [dateRange, setDateRange] = useState('30days')
  
  const [stats, setStats] = useState({
    totalDonations: 0,
    totalDonors: 0,
    activeCampaigns: 0,
    thisMonthAmount: 0,
    lastMonthAmount: 0,
    donorGrowth: 0,
    avgDonation: 0,
    conversionRate: 0,
    retentionRate: 0
  })

  // Mock data for charts
  const donationTrendData = [
    { month: 'Jan', amount: 12000, donors: 45 },
    { month: 'Feb', amount: 15000, donors: 52 },
    { month: 'Mar', amount: 18000, donors: 61 },
    { month: 'Apr', amount: 14000, donors: 48 },
    { month: 'May', amount: 22000, donors: 75 },
    { month: 'Jun', amount: 28000, donors: 89 },
    { month: 'Jul', amount: 24000, donors: 78 },
    { month: 'Aug', amount: 26000, donors: 82 },
    { month: 'Sep', amount: 30000, donors: 95 },
    { month: 'Oct', amount: 32000, donors: 98 },
    { month: 'Nov', amount: 35000, donors: 105 },
  ]

  const campaignPerformance = [
    { name: 'Holiday Fundraiser', raised: 38500, goal: 50000, donors: 156 },
    { name: 'Building Fund', raised: 42000, goal: 100000, donors: 98 },
    { name: 'Emergency Relief', raised: 25000, goal: 25000, donors: 87 },
    { name: 'Education Program', raised: 18500, goal: 30000, donors: 64 },
  ]

  const donationSources = [
    { name: 'Online Forms', value: 45, amount: 56250 },
    { name: 'Campaigns', value: 30, amount: 37500 },
    { name: 'API Integration', value: 15, amount: 18750 },
    { name: 'Offline/OCR', value: 10, amount: 12500 },
  ]

  const COLORS = [theme.primary, theme.secondary, theme.tertiary, '#4ADE80']

  useEffect(() => {
    setStats({
      totalDonations: 125450.50,
      totalDonors: 342,
      activeCampaigns: 5,
      thisMonthAmount: 35000,
      lastMonthAmount: 32000,
      donorGrowth: 12.5,
      avgDonation: 366.81,
      conversionRate: 68.5,
      retentionRate: 82.3
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
      color: theme.primary,
      subtext: 'from all time'
    },
    {
      title: 'Total Donors',
      value: stats.totalDonors.toLocaleString(),
      change: `+${stats.donorGrowth}%`,
      trend: 'up',
      icon: Users,
      color: theme.secondary,
      subtext: 'active supporters'
    },
    {
      title: 'Active Campaigns',
      value: stats.activeCampaigns,
      change: '2 ending soon',
      trend: 'neutral',
      icon: Target,
      color: theme.tertiary,
      subtext: '3 in planning'
    },
    {
      title: 'Avg. Donation',
      value: `$${stats.avgDonation}`,
      change: '+8.3%',
      trend: 'up',
      icon: TrendingUp,
      color: '#4ADE80',
      subtext: 'per transaction'
    }
  ]

  return (
    <div className="p-8 space-y-6">
      {/* Date Filter */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-[#6B6B6B]">Overview Analytics</p>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant={dateRange === '7days' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setDateRange('7days')}
          >
            7 Days
          </Button>
          <Button 
            variant={dateRange === '30days' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setDateRange('30days')}
          >
            30 Days
          </Button>
          <Button 
            variant={dateRange === '90days' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setDateRange('90days')}
          >
            90 Days
          </Button>
          <Button 
            variant={dateRange === 'year' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setDateRange('year')}
          >
            Year
          </Button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="hover:shadow-lg transition-all duration-300 border-l-4" style={{ borderLeftColor: metric.color }}>
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
                <div className="text-3xl font-bold text-[#1A1A1A] mb-1">{metric.value}</div>
                <div className="flex items-center justify-between">
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
                      <span className="text-[#6B6B6B] font-medium">{metric.change}</span>
                    )}
                  </div>
                  <span className="text-xs text-[#6B6B6B]">{metric.subtext}</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Donation Trends */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Donation Trends</CardTitle>
            <CardDescription>Monthly donation amounts and donor count</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={donationTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#6B6B6B" style={{ fontSize: '12px' }} />
                <YAxis stroke="#6B6B6B" style={{ fontSize: '12px' }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e7eb', 
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                  }} 
                />
                <Line type="monotone" dataKey="amount" stroke={theme.primary} strokeWidth={3} dot={{ fill: theme.primary }} />
                <Line type="monotone" dataKey="donors" stroke={theme.secondary} strokeWidth={2} dot={{ fill: theme.secondary }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Campaign Performance */}
        <Card className="col-span-1">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Campaign Performance</CardTitle>
                <CardDescription>Progress toward goals</CardDescription>
              </div>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={campaignPerformance}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" stroke="#6B6B6B" style={{ fontSize: '10px' }} angle={-15} textAnchor="end" height={80} />
                <YAxis stroke="#6B6B6B" style={{ fontSize: '12px' }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e7eb', 
                    borderRadius: '8px' 
                  }} 
                />
                <Bar dataKey="raised" fill={theme.primary} radius={[8, 8, 0, 0]} />
                <Bar dataKey="goal" fill={`${theme.primary}40`} radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Donation Sources & Active Campaigns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Donation Sources Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Donation Sources</CardTitle>
            <CardDescription>Distribution by channel</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={donationSources}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {donationSources.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {donationSources.map((source, i) => (
                <div key={i} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                    <span className="text-[#6B6B6B]">{source.name}</span>
                  </div>
                  <span className="font-semibold text-[#1A1A1A]">${source.amount.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Active Campaigns Grid */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Active Campaigns</CardTitle>
                <CardDescription>Live fundraising campaigns</CardDescription>
              </div>
              <Button size="sm" style={{ backgroundColor: theme.primary }}>
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {campaignPerformance.slice(0, 4).map((campaign, i) => {
                const progress = (campaign.raised / campaign.goal) * 100
                return (
                  <div key={i} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-sm text-[#1A1A1A]">{campaign.name}</h4>
                      <Button variant="ghost" size="sm" className="h-6 px-2">
                        <Eye className="w-3 h-3" />
                      </Button>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-baseline gap-1">
                        <span className="text-lg font-bold" style={{ color: theme.primary }}>
                          ${(campaign.raised / 1000).toFixed(0)}k
                        </span>
                        <span className="text-xs text-[#6B6B6B]">/ ${(campaign.goal / 1000).toFixed(0)}k</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="h-2 rounded-full transition-all duration-500"
                          style={{ 
                            width: `${Math.min(progress, 100)}%`,
                            backgroundColor: theme.primary
                          }}
                        />
                      </div>
                      <div className="flex items-center justify-between text-xs text-[#6B6B6B]">
                        <span>{progress.toFixed(0)}% funded</span>
                        <span>{campaign.donors} donors</span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Donations & Top Donors */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Donations by Campaign */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Donations</CardTitle>
            <CardDescription>Latest contributions across campaigns</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { donor: 'John Smith', amount: 500, campaign: 'Holiday Fundraiser', time: '2 hours ago' },
                { donor: 'Sarah Johnson', amount: 250, campaign: 'Building Fund', time: '5 hours ago' },
                { donor: 'Michael Brown', amount: 1000, campaign: 'Emergency Relief', time: '8 hours ago' },
                { donor: 'Emily Davis', amount: 150, campaign: 'Holiday Fundraiser', time: '1 day ago' },
                { donor: 'David Wilson', amount: 750, campaign: 'Education Program', time: '1 day ago' }
              ].map((donation, i) => (
                <div key={i} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm"
                      style={{ background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})` }}
                    >
                      {donation.donor.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="font-medium text-[#1A1A1A]">{donation.donor}</p>
                      <p className="text-xs text-[#6B6B6B]">{donation.campaign} • {donation.time}</p>
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
              {[
                { name: 'Michael Brown', amount: 15000, donations: 24, rank: 1 },
                { name: 'Sarah Johnson', amount: 12500, donations: 18, rank: 2 },
                { name: 'John Smith', amount: 10200, donations: 15, rank: 3 },
                { name: 'Emily Davis', amount: 8900, donations: 12, rank: 4 },
                { name: 'David Wilson', amount: 7500, donations: 10, rank: 5 }
              ].map((donor) => (
                <div key={donor.name} className="flex items-center gap-4">
                  <div 
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm"
                    style={{ background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})` }}
                  >
                    {donor.rank}
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

      {/* Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card style={{ background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})` }} className="text-white border-0">
          <CardContent className="pt-6">
            <p className="text-sm opacity-90 mb-1">Average Donation</p>
            <p className="text-3xl font-bold">${stats.avgDonation}</p>
            <p className="text-xs opacity-75 mt-2">Per transaction</p>
          </CardContent>
        </Card>

        <Card style={{ background: `linear-gradient(135deg, ${theme.secondary}, ${theme.tertiary})` }} className="text-white border-0">
          <CardContent className="pt-6">
            <p className="text-sm opacity-90 mb-1">Conversion Rate</p>
            <p className="text-3xl font-bold">{stats.conversionRate}%</p>
            <p className="text-xs opacity-75 mt-2">Form to donation</p>
          </CardContent>
        </Card>

        <Card style={{ background: 'linear-gradient(135deg, #4ADE80, #22c55e)' }} className="text-white border-0">
          <CardContent className="pt-6">
            <p className="text-sm opacity-90 mb-1">Retention Rate</p>
            <p className="text-3xl font-bold">{stats.retentionRate}%</p>
            <p className="text-xs opacity-75 mt-2">Recurring donors</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
