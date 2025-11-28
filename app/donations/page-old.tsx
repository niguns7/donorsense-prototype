'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { 
  Plus,
  Upload,
  Key,
  DollarSign,
  FileText,
  CheckCircle2,
  Copy,
  Eye,
  Edit,
  Trash2,
  Download,
  Filter,
  Search,
  TrendingUp,
  Users,
  Calendar,
  BarChart3,
  ExternalLink
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import donationsData from '@/data/donations.json'
import campaignsData from '@/data/campaigns.json'

export default function DonationsPage() {
  const [activeTab, setActiveTab] = useState<'forms' | 'ocr' | 'api'>('forms')
  const [showApiKey, setShowApiKey] = useState(false)
  const [apiKey] = useState('ORG-KEY-ABC123XYZ789-DEMO')
  const [ocrData, setOcrData] = useState<any>(null)

  const handleOCRUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Mock OCR processing
      setTimeout(() => {
        setOcrData({
          donor_name: 'John Doe',
          amount: 150,
          date: '2025-11-28',
          method: 'Cheque',
          checkNumber: '12345'
        })
      }, 1500)
    }
  }

  const copyApiKey = () => {
    navigator.clipboard.writeText(apiKey)
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#1A1A1A] mb-2">Donation Management</h1>
        <p className="text-[#6B6B6B]">Create forms, process offline donations, and manage API access</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('forms')}
          className={`px-4 py-2 font-medium transition-colors border-b-2 ${
            activeTab === 'forms'
              ? 'border-[#6A5ACD] text-[#6A5ACD]'
              : 'border-transparent text-[#6B6B6B] hover:text-[#1A1A1A]'
          }`}
        >
          Donation Forms
        </button>
        <button
          onClick={() => setActiveTab('ocr')}
          className={`px-4 py-2 font-medium transition-colors border-b-2 ${
            activeTab === 'ocr'
              ? 'border-[#6A5ACD] text-[#6A5ACD]'
              : 'border-transparent text-[#6B6B6B] hover:text-[#1A1A1A]'
          }`}
        >
          OCR Upload
        </button>
        <button
          onClick={() => setActiveTab('api')}
          className={`px-4 py-2 font-medium transition-colors border-b-2 ${
            activeTab === 'api'
              ? 'border-[#6A5ACD] text-[#6A5ACD]'
              : 'border-transparent text-[#6B6B6B] hover:text-[#1A1A1A]'
          }`}
        >
          API Access
        </button>
      </div>

      {/* Donation Forms Tab */}
      {activeTab === 'forms' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Create Form Button */}
          <Card className="border-2 border-dashed border-gray-300 hover:border-[#6A5ACD] transition-colors cursor-pointer">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <div className="w-16 h-16 rounded-full bg-[#6A5ACD]/10 flex items-center justify-center mb-4">
                <Plus className="w-8 h-8 text-[#6A5ACD]" />
              </div>
              <h3 className="text-lg font-semibold text-[#1A1A1A] mb-2">Create New Donation Form</h3>
              <p className="text-[#6B6B6B] mb-4 text-center max-w-md">
                Build custom donation forms with one-time and recurring options
              </p>
              <Button>
                <Plus className="w-4 h-4" />
                New Form
              </Button>
            </CardContent>
          </Card>

          {/* Existing Forms */}
          <div className="grid gap-4">
            {[
              { name: 'General Donation', type: 'One-time & Recurring', submissions: 145, status: 'active' },
              { name: 'Emergency Fund', type: 'One-time', submissions: 89, status: 'active' },
              { name: 'Monthly Supporters', type: 'Recurring Only', submissions: 56, status: 'active' }
            ].map((form, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="flex items-center justify-between p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#6A5ACD] to-[#9B87FF] flex items-center justify-center">
                        <FileText className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-[#1A1A1A]">{form.name}</h4>
                        <p className="text-sm text-[#6B6B6B]">{form.type} • {form.submissions} submissions</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1 rounded-full bg-[#4ADE80]/10 text-[#4ADE80] text-sm font-medium">
                        {form.status}
                      </span>
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4" />
                        Preview
                      </Button>
                      <Button size="sm">Edit</Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* OCR Upload Tab */}
      {activeTab === 'ocr' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Upload Receipt/Check</CardTitle>
              <CardDescription>
                Upload an image of a check or receipt and we&apos;ll extract the donation details automatically
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Upload Area */}
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center hover:border-[#6A5ACD] transition-colors cursor-pointer">
                <label className="cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleOCRUpload}
                    className="hidden"
                  />
                  <Upload className="w-12 h-12 text-[#6B6B6B] mx-auto mb-4" />
                  <p className="text-[#1A1A1A] font-medium mb-2">Click to upload or drag and drop</p>
                  <p className="text-sm text-[#6B6B6B]">PNG, JPG or PDF (max. 10MB)</p>
                </label>
              </div>

              {/* OCR Result */}
              {ocrData && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-6 bg-gradient-to-br from-[#4ADE80]/10 to-transparent border-2 border-[#4ADE80]/30 rounded-xl"
                >
                  <div className="flex items-start gap-3 mb-4">
                    <CheckCircle2 className="w-6 h-6 text-[#4ADE80] flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-[#1A1A1A] mb-1">Data Extracted Successfully</h4>
                      <p className="text-sm text-[#6B6B6B]">Review and confirm the details below</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="text-sm text-[#6B6B6B]">Donor Name</label>
                      <input
                        type="text"
                        value={ocrData.donor_name}
                        readOnly
                        className="w-full mt-1 px-3 py-2 bg-white border border-gray-200 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-[#6B6B6B]">Amount</label>
                      <input
                        type="text"
                        value={`$${ocrData.amount}`}
                        readOnly
                        className="w-full mt-1 px-3 py-2 bg-white border border-gray-200 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-[#6B6B6B]">Date</label>
                      <input
                        type="text"
                        value={ocrData.date}
                        readOnly
                        className="w-full mt-1 px-3 py-2 bg-white border border-gray-200 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-[#6B6B6B]">Method</label>
                      <input
                        type="text"
                        value={ocrData.method}
                        readOnly
                        className="w-full mt-1 px-3 py-2 bg-white border border-gray-200 rounded-lg"
                      />
                    </div>
                  </div>

                  <Button className="w-full">
                    <CheckCircle2 className="w-4 h-4" />
                    Confirm & Save Donation
                  </Button>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* API Access Tab */}
      {activeTab === 'api' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <Card>
            <CardHeader>
              <CardTitle>API Key Management</CardTitle>
              <CardDescription>
                Use this API key to integrate donations from external sources
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* API Key Display */}
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-[#1A1A1A]">Your API Key</label>
                  <Button variant="ghost" size="sm" onClick={() => setShowApiKey(!showApiKey)}>
                    {showApiKey ? 'Hide' : 'Show'}
                  </Button>
                </div>
                <div className="flex items-center gap-2">
                  <code className="flex-1 px-4 py-3 bg-white border border-gray-200 rounded-lg font-mono text-sm">
                    {showApiKey ? apiKey : '•'.repeat(40)}
                  </code>
                  <Button variant="outline" size="sm" onClick={copyApiKey}>
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Usage Example */}
              <div>
                <h4 className="font-semibold text-[#1A1A1A] mb-3 flex items-center gap-2">
                  <Key className="w-5 h-5 text-[#6A5ACD]" />
                  Usage Example
                </h4>
                <div className="p-4 bg-[#1A1A1A] rounded-lg overflow-x-auto">
                  <pre className="text-sm text-gray-300 font-mono">
{`POST https://api.donorsense.ai/donations/external
Headers:
  x-api-key: ${showApiKey ? apiKey : 'YOUR_API_KEY'}
  Content-Type: application/json

Body:
{
  "amount": 100.00,
  "donor": {
    "name": "John Doe",
    "email": "john@example.com"
  },
  "source": "website"
}`}
                  </pre>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 bg-gradient-to-br from-[#6A5ACD]/10 to-transparent rounded-xl border border-[#6A5ACD]/20">
                  <DollarSign className="w-8 h-8 text-[#6A5ACD] mb-2" />
                  <p className="text-2xl font-bold text-[#1A1A1A]">$8,450</p>
                  <p className="text-sm text-[#6B6B6B]">Via API this month</p>
                </div>
                <div className="p-4 bg-gradient-to-br from-[#9B87FF]/10 to-transparent rounded-xl border border-[#9B87FF]/20">
                  <CheckCircle2 className="w-8 h-8 text-[#9B87FF] mb-2" />
                  <p className="text-2xl font-bold text-[#1A1A1A]">42</p>
                  <p className="text-sm text-[#6B6B6B]">API donations</p>
                </div>
                <div className="p-4 bg-gradient-to-br from-[#4ADE80]/10 to-transparent rounded-xl border border-[#4ADE80]/20">
                  <Key className="w-8 h-8 text-[#4ADE80] mb-2" />
                  <p className="text-2xl font-bold text-[#1A1A1A]">1</p>
                  <p className="text-sm text-[#6B6B6B]">Active key</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  )
}
