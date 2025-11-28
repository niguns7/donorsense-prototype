'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Upload,
  CheckCircle2,
  FileText,
  Calendar,
  DollarSign,
  User,
  CreditCard,
  Hash,
  Save,
  Eye,
  Trash2,
  Download,
  ArrowLeft
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface OcrScan {
  id: string
  fileName: string
  uploadDate: string
  status: 'processing' | 'completed' | 'error'
  extractedData?: {
    donor_name: string
    amount: number
    date: string
    method: string
    checkNumber?: string
    notes?: string
  }
  addedToDonation: boolean
  donationId?: string
  imageUrl?: string
}

export default function OcrPage() {
  const [isUploading, setIsUploading] = useState(false)
  const [currentScan, setCurrentScan] = useState<OcrScan | null>(null)
  const [scans, setScans] = useState<OcrScan[]>([
    {
      id: 'OCR-001',
      fileName: 'check_12345.jpg',
      uploadDate: '2025-11-28T10:30:00Z',
      status: 'completed',
      extractedData: {
        donor_name: 'John Doe',
        amount: 150,
        date: '2025-11-28',
        method: 'Cheque',
        checkNumber: '12345',
        notes: 'For Education Fund'
      },
      addedToDonation: true,
      donationId: 'DON-003',
      imageUrl: '/placeholder-check.jpg'
    },
    {
      id: 'OCR-002',
      fileName: 'receipt_abc789.jpg',
      uploadDate: '2025-11-27T15:20:00Z',
      status: 'completed',
      extractedData: {
        donor_name: 'Jane Smith',
        amount: 500,
        date: '2025-11-27',
        method: 'Cash',
        notes: 'Community event donation'
      },
      addedToDonation: false,
      imageUrl: '/placeholder-receipt.jpg'
    },
    {
      id: 'OCR-003',
      fileName: 'check_67890.jpg',
      uploadDate: '2025-11-26T09:15:00Z',
      status: 'completed',
      extractedData: {
        donor_name: 'Robert Johnson',
        amount: 750,
        date: '2025-11-26',
        method: 'Cheque',
        checkNumber: '67890'
      },
      addedToDonation: true,
      donationId: 'DON-007',
      imageUrl: '/placeholder-check.jpg'
    }
  ])
  const [selectedCampaign, setSelectedCampaign] = useState('')

  const handleOCRUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setIsUploading(true)
      
      // Mock OCR processing
      const mockScan: OcrScan = {
        id: `OCR-${String(scans.length + 1).padStart(3, '0')}`,
        fileName: file.name,
        uploadDate: new Date().toISOString(),
        status: 'processing',
        addedToDonation: false
      }
      
      setCurrentScan(mockScan)
      
      setTimeout(() => {
        const completedScan: OcrScan = {
          ...mockScan,
          status: 'completed',
          extractedData: {
            donor_name: 'Michael Brown',
            amount: 300,
            date: new Date().toISOString().split('T')[0],
            method: 'Cheque',
            checkNumber: Math.floor(Math.random() * 90000 + 10000).toString(),
            notes: ''
          }
        }
        setCurrentScan(completedScan)
        setScans(prev => [completedScan, ...prev])
        setIsUploading(false)
      }, 2000)
    }
  }

  const handleSaveToDonation = (scanId: string) => {
    if (!selectedCampaign) {
      alert('Please select a campaign first')
      return
    }
    
    setScans(prev => prev.map(scan => {
      if (scan.id === scanId) {
        return {
          ...scan,
          addedToDonation: true,
          donationId: `DON-${String(Math.floor(Math.random() * 900 + 100))}`
        }
      }
      return scan
    }))
    
    setCurrentScan(null)
    alert('Donation added successfully!')
  }

  const handleDelete = (scanId: string) => {
    if (confirm('Are you sure you want to delete this scan?')) {
      setScans(prev => prev.filter(scan => scan.id !== scanId))
    }
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Link href="/donations">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4" />
              Back to Donations
            </Button>
          </Link>
        </div>
        <h1 className="text-3xl font-bold text-[#1A1A1A] mb-2">OCR Receipt Scanner</h1>
        <p className="text-[#6B6B6B]">Upload receipts and checks to automatically extract donation details</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Upload Section */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Upload Receipt/Check</CardTitle>
              <CardDescription>
                Scan checks, receipts, or donation documents
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Upload Area */}
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-[#6A5ACD] transition-colors cursor-pointer">
                <label className="cursor-pointer">
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    onChange={handleOCRUpload}
                    className="hidden"
                    disabled={isUploading}
                  />
                  <Upload className="w-12 h-12 text-[#6B6B6B] mx-auto mb-3" />
                  <p className="text-[#1A1A1A] font-medium mb-1">
                    {isUploading ? 'Processing...' : 'Click to upload'}
                  </p>
                  <p className="text-sm text-[#6B6B6B]">PNG, JPG or PDF (max. 10MB)</p>
                </label>
              </div>

              {/* Processing Status */}
              {isUploading && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-4 bg-blue-50 border border-blue-200 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                    <div>
                      <p className="font-medium text-[#1A1A1A]">Processing scan...</p>
                      <p className="text-sm text-[#6B6B6B]">Extracting data from image</p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Current Scan Result */}
              <AnimatePresence>
                {currentScan && currentScan.status === 'completed' && currentScan.extractedData && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-4"
                  >
                    <div className="p-4 bg-gradient-to-br from-[#4ADE80]/10 to-transparent border-2 border-[#4ADE80]/30 rounded-xl">
                      <div className="flex items-center gap-2 mb-3">
                        <CheckCircle2 className="w-5 h-5 text-[#4ADE80]" />
                        <h4 className="font-semibold text-[#1A1A1A]">Data Extracted</h4>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <label className="text-xs text-[#6B6B6B] font-medium">Donor Name</label>
                          <input
                            type="text"
                            value={currentScan.extractedData.donor_name}
                            onChange={(e) => setCurrentScan({
                              ...currentScan,
                              extractedData: { ...currentScan.extractedData!, donor_name: e.target.value }
                            })}
                            className="w-full mt-1 px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="text-xs text-[#6B6B6B] font-medium">Amount</label>
                            <input
                              type="number"
                              value={currentScan.extractedData.amount}
                              onChange={(e) => setCurrentScan({
                                ...currentScan,
                                extractedData: { ...currentScan.extractedData!, amount: parseFloat(e.target.value) }
                              })}
                              className="w-full mt-1 px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm"
                            />
                          </div>
                          <div>
                            <label className="text-xs text-[#6B6B6B] font-medium">Date</label>
                            <input
                              type="date"
                              value={currentScan.extractedData.date}
                              onChange={(e) => setCurrentScan({
                                ...currentScan,
                                extractedData: { ...currentScan.extractedData!, date: e.target.value }
                              })}
                              className="w-full mt-1 px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="text-xs text-[#6B6B6B] font-medium">Payment Method</label>
                          <select
                            value={currentScan.extractedData.method}
                            onChange={(e) => setCurrentScan({
                              ...currentScan,
                              extractedData: { ...currentScan.extractedData!, method: e.target.value }
                            })}
                            className="w-full mt-1 px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm"
                          >
                            <option value="Cheque">Cheque</option>
                            <option value="Cash">Cash</option>
                            <option value="Money Order">Money Order</option>
                          </select>
                        </div>

                        {currentScan.extractedData.checkNumber && (
                          <div>
                            <label className="text-xs text-[#6B6B6B] font-medium">Check Number</label>
                            <input
                              type="text"
                              value={currentScan.extractedData.checkNumber}
                              onChange={(e) => setCurrentScan({
                                ...currentScan,
                                extractedData: { ...currentScan.extractedData!, checkNumber: e.target.value }
                              })}
                              className="w-full mt-1 px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm"
                            />
                          </div>
                        )}

                        <div>
                          <label className="text-xs text-[#6B6B6B] font-medium">Campaign</label>
                          <select
                            value={selectedCampaign}
                            onChange={(e) => setSelectedCampaign(e.target.value)}
                            className="w-full mt-1 px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm"
                          >
                            <option value="">Select Campaign</option>
                            <option value="CAMP-001">Education for All</option>
                            <option value="CAMP-002">Clean Water Initiative</option>
                            <option value="CAMP-003">Healthcare Fund</option>
                            <option value="CAMP-004">Emergency Relief</option>
                          </select>
                        </div>

                        <div>
                          <label className="text-xs text-[#6B6B6B] font-medium">Notes (Optional)</label>
                          <textarea
                            value={currentScan.extractedData.notes || ''}
                            onChange={(e) => setCurrentScan({
                              ...currentScan,
                              extractedData: { ...currentScan.extractedData!, notes: e.target.value }
                            })}
                            rows={2}
                            className="w-full mt-1 px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm"
                            placeholder="Add any additional notes..."
                          />
                        </div>
                      </div>
                    </div>

                    <Button 
                      className="w-full" 
                      onClick={() => handleSaveToDonation(currentScan.id)}
                    >
                      <Save className="w-4 h-4" />
                      Save as Donation
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        </div>

        {/* Scan History */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Scan History</CardTitle>
              <CardDescription>
                All uploaded receipts and checks with their extracted data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {scans.map((scan, index) => (
                  <motion.div
                    key={scan.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`p-4 border rounded-xl hover:shadow-md transition-all ${
                      scan.addedToDonation 
                        ? 'border-[#4ADE80]/30 bg-[#4ADE80]/5' 
                        : 'border-gray-200 bg-white'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-start gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          scan.addedToDonation 
                            ? 'bg-[#4ADE80]/20' 
                            : 'bg-[#6A5ACD]/10'
                        }`}>
                          <FileText className={`w-5 h-5 ${
                            scan.addedToDonation 
                              ? 'text-[#4ADE80]' 
                              : 'text-[#6A5ACD]'
                          }`} />
                        </div>
                        <div>
                          <h4 className="font-semibold text-[#1A1A1A]">{scan.fileName}</h4>
                          <p className="text-sm text-[#6B6B6B]">
                            {new Date(scan.uploadDate).toLocaleString()}
                          </p>
                          {scan.addedToDonation && (
                            <span className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 bg-[#4ADE80] text-white rounded text-xs font-medium">
                              <CheckCircle2 className="w-3 h-3" />
                              Added to Donations
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Download className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleDelete(scan.id)}
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </Button>
                      </div>
                    </div>

                    {scan.extractedData && (
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3 pt-3 border-t border-gray-100">
                        <div>
                          <div className="flex items-center gap-1 text-xs text-[#6B6B6B] mb-1">
                            <User className="w-3 h-3" />
                            Donor
                          </div>
                          <p className="text-sm font-medium text-[#1A1A1A]">{scan.extractedData.donor_name}</p>
                        </div>
                        <div>
                          <div className="flex items-center gap-1 text-xs text-[#6B6B6B] mb-1">
                            <DollarSign className="w-3 h-3" />
                            Amount
                          </div>
                          <p className="text-sm font-medium text-[#1A1A1A]">${scan.extractedData.amount}</p>
                        </div>
                        <div>
                          <div className="flex items-center gap-1 text-xs text-[#6B6B6B] mb-1">
                            <Calendar className="w-3 h-3" />
                            Date
                          </div>
                          <p className="text-sm font-medium text-[#1A1A1A]">
                            {new Date(scan.extractedData.date).toLocaleDateString()}
                          </p>
                        </div>
                        <div>
                          <div className="flex items-center gap-1 text-xs text-[#6B6B6B] mb-1">
                            <CreditCard className="w-3 h-3" />
                            Method
                          </div>
                          <p className="text-sm font-medium text-[#1A1A1A]">{scan.extractedData.method}</p>
                        </div>
                        {scan.extractedData.checkNumber && (
                          <div>
                            <div className="flex items-center gap-1 text-xs text-[#6B6B6B] mb-1">
                              <Hash className="w-3 h-3" />
                              Check #
                            </div>
                            <p className="text-sm font-medium text-[#1A1A1A]">{scan.extractedData.checkNumber}</p>
                          </div>
                        )}
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
