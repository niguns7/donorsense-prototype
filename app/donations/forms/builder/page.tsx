'use client'

import { useState } from 'react'
import { motion, AnimatePresence, Reorder } from 'framer-motion'
import { 
  ArrowLeft,
  Share2,
  Eye,
  Save,
  Palette,
  Type,
  DollarSign,
  Mail,
  Phone,
  AlignLeft,
  GripVertical,
  Trash2,
  Settings,
  QrCode,
  Link as LinkIcon,
  Copy,
  Download,
  Globe,
  Code,
  CheckCircle2,
  X,
  ExternalLink
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import QRCode from 'qrcode'
import Image from 'next/image'

// Import icons that aren't in the main import
import { Image as ImageIcon, CreditCard } from 'lucide-react'

interface FormElement {
  id: string
  type: 'text' | 'email' | 'phone' | 'number' | 'textarea' | 'amount' | 'payment' | 'heading' | 'image' | 'divider'
  label: string
  placeholder?: string
  required?: boolean
  options?: string[]
}

interface ThemeConfig {
  primaryColor: string
  secondaryColor: string
  backgroundColor: string
  textColor: string
  fontFamily: string
  buttonStyle: 'rounded' | 'square' | 'pill'
  formWidth: 'narrow' | 'medium' | 'wide'
}

export default function DonationFormBuilderPage() {
  const [showShareDrawer, setShowShareDrawer] = useState(false)
  const [activeTab, setActiveTab] = useState<'build' | 'design' | 'preview'>('build')
  const [qrCodeUrl, setQrCodeUrl] = useState('')
  
  const [formElements, setFormElements] = useState<FormElement[]>([
    { id: '1', type: 'heading', label: 'Support Our Cause', required: false },
    { id: '2', type: 'text', label: 'Full Name', placeholder: 'Enter your name', required: true },
    { id: '3', type: 'email', label: 'Email Address', placeholder: 'your@email.com', required: true },
    { id: '4', type: 'amount', label: 'Donation Amount', placeholder: 'Enter amount', required: true },
    { id: '5', type: 'payment', label: 'Payment Method', required: true }
  ])

  const [theme, setTheme] = useState<ThemeConfig>({
    primaryColor: '#6A5ACD',
    secondaryColor: '#9B87FF',
    backgroundColor: '#FFFFFF',
    textColor: '#1A1A1A',
    fontFamily: 'Inter',
    buttonStyle: 'rounded',
    formWidth: 'medium'
  })

  const [formSettings, setFormSettings] = useState({
    formName: 'General Donation Form',
    subdomain: 'donate',
    thankYouMessage: 'Thank you for your generous donation!',
    redirectUrl: '',
    emailNotifications: true
  })

  const formUrl = `https://${formSettings.subdomain}.donorsense.app/donate`

  const availableElements = [
    { type: 'text', icon: Type, label: 'Text Input' },
    { type: 'email', icon: Mail, label: 'Email' },
    { type: 'phone', icon: Phone, label: 'Phone' },
    { type: 'number', icon: DollarSign, label: 'Number' },
    { type: 'textarea', icon: AlignLeft, label: 'Text Area' },
    { type: 'amount', icon: DollarSign, label: 'Amount Selector' },
    { type: 'payment', icon: CreditCard, label: 'Payment Method' },
    { type: 'heading', icon: Type, label: 'Heading' },
    { type: 'image', icon: ImageIcon, label: 'Image' },
    { type: 'divider', icon: AlignLeft, label: 'Divider' }
  ]

  const generateQRCode = async () => {
    try {
      const qr = await QRCode.toDataURL(formUrl, {
        width: 300,
        margin: 2,
        color: {
          dark: theme.primaryColor,
          light: '#FFFFFF'
        }
      })
      setQrCodeUrl(qr)
    } catch (err) {
      console.error('Error generating QR code:', err)
    }
  }

  const handleShareClick = () => {
    setShowShareDrawer(true)
    generateQRCode()
  }

  const addElement = (type: string) => {
    setFormElements(prev => {
      const newElement: FormElement = {
        id: `element-${prev.length + 1}-${type}`,
        type: type as FormElement['type'],
        label: `New ${type}`,
        placeholder: `Enter ${type}`,
        required: false
      }
      return [...prev, newElement]
    })
  }

  const removeElement = (id: string) => {
    setFormElements(formElements.filter(el => el.id !== id))
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const downloadQRCode = () => {
    const link = document.createElement('a')
    link.download = 'donation-form-qr.png'
    link.href = qrCodeUrl
    link.click()
  }

  const getEmbedCode = () => {
    return `<iframe src="${formUrl}" width="100%" height="800" frameborder="0"></iframe>`
  }

  const getButtonStyleClass = () => {
    switch (theme.buttonStyle) {
      case 'pill':
        return 'rounded-full'
      case 'square':
        return 'rounded-none'
      default:
        return 'rounded-lg'
    }
  }

  const getFormWidthClass = () => {
    switch (theme.formWidth) {
      case 'narrow':
        return 'max-w-md'
      case 'wide':
        return 'max-w-4xl'
      default:
        return 'max-w-2xl'
    }
  }

  const renderFormElement = (element: FormElement) => {
    const inputClass = `w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 transition-all`
    const style = {
      borderColor: `${theme.primaryColor}20`,
      color: theme.textColor
    }

    switch (element.type) {
      case 'heading':
        return (
          <h2 className="text-3xl font-bold mb-2" style={{ color: theme.textColor }}>
            {element.label}
          </h2>
        )
      
      case 'image':
        return (
          <div className="w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center">
            <ImageIcon className="w-12 h-12 text-gray-400" />
          </div>
        )
      
      case 'divider':
        return <hr className="my-6" style={{ borderColor: theme.primaryColor }} />
      
      case 'textarea':
        return (
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: theme.textColor }}>
              {element.label} {element.required && <span className="text-red-500">*</span>}
            </label>
            <textarea
              placeholder={element.placeholder}
              rows={4}
              className={inputClass}
              style={style}
            />
          </div>
        )
      
      case 'amount':
        return (
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: theme.textColor }}>
              {element.label} {element.required && <span className="text-red-500">*</span>}
            </label>
            <div className="grid grid-cols-3 gap-3 mb-3">
              {[25, 50, 100, 250, 500, 1000].map(amount => (
                <button
                  key={amount}
                  type="button"
                  className={`px-4 py-3 border-2 font-semibold transition-all ${getButtonStyleClass()}`}
                  style={{
                    borderColor: theme.primaryColor,
                    color: theme.primaryColor
                  }}
                >
                  ${amount}
                </button>
              ))}
            </div>
            <input
              type="number"
              placeholder="Custom amount"
              className={inputClass}
              style={style}
            />
          </div>
        )
      
      case 'payment':
        return (
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: theme.textColor }}>
              {element.label} {element.required && <span className="text-red-500">*</span>}
            </label>
            <div className="grid grid-cols-2 gap-3">
              {['Credit Card', 'PayPal', 'Bank Transfer', 'Crypto'].map(method => (
                <button
                  key={method}
                  type="button"
                  className={`px-4 py-3 border-2 font-medium transition-all ${getButtonStyleClass()}`}
                  style={{
                    borderColor: theme.primaryColor,
                    color: theme.primaryColor
                  }}
                >
                  {method}
                </button>
              ))}
            </div>
          </div>
        )
      
      default:
        return (
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: theme.textColor }}>
              {element.label} {element.required && <span className="text-red-500">*</span>}
            </label>
            <input
              type={element.type}
              placeholder={element.placeholder}
              className={inputClass}
              style={style}
            />
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/donations">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </Button>
              </Link>
              <div>
                <h1 className="text-xl font-bold text-[#1A1A1A]">{formSettings.formName}</h1>
                <p className="text-sm text-[#6B6B6B]">Donation Form Builder</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="outline" onClick={() => setActiveTab('preview')}>
                <Eye className="w-4 h-4" />
                Preview
              </Button>
              <Button variant="outline" onClick={handleShareClick}>
                <Share2 className="w-4 h-4" />
                Share
              </Button>
              <Button className="bg-[#6A5ACD] hover:bg-[#5A4ABD]">
                <Save className="w-4 h-4" />
                Save Form
              </Button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 mt-4">
            <button
              onClick={() => setActiveTab('build')}
              className={`px-6 py-2 font-medium transition-colors border-b-2 ${
                activeTab === 'build'
                  ? 'border-[#6A5ACD] text-[#6A5ACD]'
                  : 'border-transparent text-[#6B6B6B] hover:text-[#1A1A1A]'
              }`}
            >
              Build
            </button>
            <button
              onClick={() => setActiveTab('design')}
              className={`px-6 py-2 font-medium transition-colors border-b-2 ${
                activeTab === 'design'
                  ? 'border-[#6A5ACD] text-[#6A5ACD]'
                  : 'border-transparent text-[#6B6B6B] hover:text-[#1A1A1A]'
              }`}
            >
              Design
            </button>
            <button
              onClick={() => setActiveTab('preview')}
              className={`px-6 py-2 font-medium transition-colors border-b-2 ${
                activeTab === 'preview'
                  ? 'border-[#6A5ACD] text-[#6A5ACD]'
                  : 'border-transparent text-[#6B6B6B] hover:text-[#1A1A1A]'
              }`}
            >
              Preview
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex h-[calc(100vh-180px)]">
        {/* Build Tab */}
        {activeTab === 'build' && (
          <>
            {/* Left Sidebar - Elements */}
            <div className="w-80 bg-white border-r border-gray-200 overflow-y-auto">
              <div className="p-6">
                <h3 className="font-semibold text-[#1A1A1A] mb-4">Form Elements</h3>
                <div className="space-y-2">
                  {availableElements.map((element) => {
                    const Icon = element.icon
                    return (
                      <motion.button
                        key={element.type}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => addElement(element.type)}
                        className="w-full flex items-center gap-3 p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-left"
                      >
                        <div className="w-8 h-8 rounded bg-[#6A5ACD]/10 flex items-center justify-center">
                          <Icon className="w-4 h-4 text-[#6A5ACD]" />
                        </div>
                        <span className="font-medium text-[#1A1A1A]">{element.label}</span>
                      </motion.button>
                    )
                  })}
                </div>

                <div className="mt-8">
                  <h3 className="font-semibold text-[#1A1A1A] mb-4">Form Settings</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm text-[#6B6B6B] mb-1 block">Form Name</label>
                      <input
                        type="text"
                        value={formSettings.formName}
                        onChange={(e) => setFormSettings({ ...formSettings, formName: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-[#6B6B6B] mb-1 block">Subdomain</label>
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={formSettings.subdomain}
                          onChange={(e) => setFormSettings({ ...formSettings, subdomain: e.target.value })}
                          className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm"
                        />
                        <span className="text-sm text-[#6B6B6B]">.donorsense.app</span>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm text-[#6B6B6B] mb-1 block">Thank You Message</label>
                      <textarea
                        value={formSettings.thankYouMessage}
                        onChange={(e) => setFormSettings({ ...formSettings, thankYouMessage: e.target.value })}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Center - Form Builder */}
            <div className="flex-1 overflow-y-auto p-8 bg-gray-50">
              <div className="max-w-3xl mx-auto">
                <Card className="shadow-lg">
                  <CardContent className="p-8" style={{ backgroundColor: theme.backgroundColor }}>
                    <Reorder.Group
                      axis="y"
                      values={formElements}
                      onReorder={setFormElements}
                      className="space-y-4"
                    >
                      {formElements.map((element) => (
                        <Reorder.Item key={element.id} value={element}>
                          <motion.div
                            className="group relative p-4 bg-white border-2 border-dashed border-gray-300 rounded-lg hover:border-[#6A5ACD] transition-colors"
                          >
                            <div className="flex items-start gap-3">
                              <button className="cursor-move mt-2">
                                <GripVertical className="w-5 h-5 text-gray-400" />
                              </button>
                              
                              <div className="flex-1">
                                {renderFormElement(element)}
                              </div>

                              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                  onClick={() => removeElement(element.id)}
                                  className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                                >
                                  <Trash2 className="w-4 h-4 text-red-500" />
                                </button>
                                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                                  <Settings className="w-4 h-4 text-gray-600" />
                                </button>
                              </div>
                            </div>
                          </motion.div>
                        </Reorder.Item>
                      ))}
                    </Reorder.Group>

                    <button
                      className={`w-full mt-6 py-4 font-semibold text-white transition-all ${getButtonStyleClass()}`}
                      style={{ backgroundColor: theme.primaryColor }}
                    >
                      Submit Donation
                    </button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </>
        )}

        {/* Design Tab */}
        {activeTab === 'design' && (
          <>
            {/* Left Sidebar - Design Controls */}
            <div className="w-80 bg-white border-r border-gray-200 overflow-y-auto">
              <div className="p-6 space-y-6">
                <div>
                  <h3 className="font-semibold text-[#1A1A1A] mb-4 flex items-center gap-2">
                    <Palette className="w-5 h-5 text-[#6A5ACD]" />
                    Colors
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm text-[#6B6B6B] mb-2 block">Primary Color</label>
                      <div className="flex items-center gap-3">
                        <input
                          type="color"
                          value={theme.primaryColor}
                          onChange={(e) => setTheme({ ...theme, primaryColor: e.target.value })}
                          className="w-12 h-12 rounded-lg cursor-pointer"
                        />
                        <input
                          type="text"
                          value={theme.primaryColor}
                          onChange={(e) => setTheme({ ...theme, primaryColor: e.target.value })}
                          className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm font-mono"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-sm text-[#6B6B6B] mb-2 block">Secondary Color</label>
                      <div className="flex items-center gap-3">
                        <input
                          type="color"
                          value={theme.secondaryColor}
                          onChange={(e) => setTheme({ ...theme, secondaryColor: e.target.value })}
                          className="w-12 h-12 rounded-lg cursor-pointer"
                        />
                        <input
                          type="text"
                          value={theme.secondaryColor}
                          onChange={(e) => setTheme({ ...theme, secondaryColor: e.target.value })}
                          className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm font-mono"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-sm text-[#6B6B6B] mb-2 block">Background Color</label>
                      <div className="flex items-center gap-3">
                        <input
                          type="color"
                          value={theme.backgroundColor}
                          onChange={(e) => setTheme({ ...theme, backgroundColor: e.target.value })}
                          className="w-12 h-12 rounded-lg cursor-pointer"
                        />
                        <input
                          type="text"
                          value={theme.backgroundColor}
                          onChange={(e) => setTheme({ ...theme, backgroundColor: e.target.value })}
                          className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm font-mono"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-sm text-[#6B6B6B] mb-2 block">Text Color</label>
                      <div className="flex items-center gap-3">
                        <input
                          type="color"
                          value={theme.textColor}
                          onChange={(e) => setTheme({ ...theme, textColor: e.target.value })}
                          className="w-12 h-12 rounded-lg cursor-pointer"
                        />
                        <input
                          type="text"
                          value={theme.textColor}
                          onChange={(e) => setTheme({ ...theme, textColor: e.target.value })}
                          className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm font-mono"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-[#1A1A1A] mb-4 flex items-center gap-2">
                    <Type className="w-5 h-5 text-[#6A5ACD]" />
                    Typography
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm text-[#6B6B6B] mb-2 block">Font Family</label>
                      <select
                        value={theme.fontFamily}
                        onChange={(e) => setTheme({ ...theme, fontFamily: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                      >
                        <option value="Inter">Inter</option>
                        <option value="Roboto">Roboto</option>
                        <option value="Open Sans">Open Sans</option>
                        <option value="Lato">Lato</option>
                        <option value="Montserrat">Montserrat</option>
                        <option value="Poppins">Poppins</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-[#1A1A1A] mb-4">Button Style</h3>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => setTheme({ ...theme, buttonStyle: 'rounded' })}
                      className={`p-3 border-2 rounded-lg font-medium transition-colors ${
                        theme.buttonStyle === 'rounded'
                          ? 'border-[#6A5ACD] bg-[#6A5ACD]/10 text-[#6A5ACD]'
                          : 'border-gray-200 text-gray-600'
                      }`}
                    >
                      Rounded
                    </button>
                    <button
                      onClick={() => setTheme({ ...theme, buttonStyle: 'square' })}
                      className={`p-3 border-2 rounded-lg font-medium transition-colors ${
                        theme.buttonStyle === 'square'
                          ? 'border-[#6A5ACD] bg-[#6A5ACD]/10 text-[#6A5ACD]'
                          : 'border-gray-200 text-gray-600'
                      }`}
                    >
                      Square
                    </button>
                    <button
                      onClick={() => setTheme({ ...theme, buttonStyle: 'pill' })}
                      className={`p-3 border-2 rounded-lg font-medium transition-colors ${
                        theme.buttonStyle === 'pill'
                          ? 'border-[#6A5ACD] bg-[#6A5ACD]/10 text-[#6A5ACD]'
                          : 'border-gray-200 text-gray-600'
                      }`}
                    >
                      Pill
                    </button>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-[#1A1A1A] mb-4">Form Width</h3>
                  <div className="space-y-2">
                    {['narrow', 'medium', 'wide'].map((width) => (
                      <button
                        key={width}
                        onClick={() => setTheme({ ...theme, formWidth: width as ThemeConfig['formWidth'] })}
                        className={`w-full p-3 border-2 rounded-lg font-medium transition-colors capitalize ${
                          theme.formWidth === width
                            ? 'border-[#6A5ACD] bg-[#6A5ACD]/10 text-[#6A5ACD]'
                            : 'border-gray-200 text-gray-600'
                        }`}
                      >
                        {width}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <h3 className="font-semibold text-[#1A1A1A] mb-3">Preset Themes</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setTheme({
                        primaryColor: '#6A5ACD',
                        secondaryColor: '#9B87FF',
                        backgroundColor: '#FFFFFF',
                        textColor: '#1A1A1A',
                        fontFamily: 'Inter',
                        buttonStyle: 'rounded',
                        formWidth: 'medium'
                      })}
                      className="p-3 rounded-lg border-2 border-gray-200 hover:border-[#6A5ACD] transition-colors"
                    >
                      <div className="flex gap-1 mb-2">
                        <div className="w-6 h-6 rounded bg-[#6A5ACD]"></div>
                        <div className="w-6 h-6 rounded bg-[#9B87FF]"></div>
                      </div>
                      <p className="text-xs font-medium">Default</p>
                    </button>

                    <button
                      onClick={() => setTheme({
                        primaryColor: '#10B981',
                        secondaryColor: '#34D399',
                        backgroundColor: '#FFFFFF',
                        textColor: '#1A1A1A',
                        fontFamily: 'Inter',
                        buttonStyle: 'rounded',
                        formWidth: 'medium'
                      })}
                      className="p-3 rounded-lg border-2 border-gray-200 hover:border-[#10B981] transition-colors"
                    >
                      <div className="flex gap-1 mb-2">
                        <div className="w-6 h-6 rounded bg-[#10B981]"></div>
                        <div className="w-6 h-6 rounded bg-[#34D399]"></div>
                      </div>
                      <p className="text-xs font-medium">Nature</p>
                    </button>

                    <button
                      onClick={() => setTheme({
                        primaryColor: '#3B82F6',
                        secondaryColor: '#60A5FA',
                        backgroundColor: '#FFFFFF',
                        textColor: '#1A1A1A',
                        fontFamily: 'Inter',
                        buttonStyle: 'rounded',
                        formWidth: 'medium'
                      })}
                      className="p-3 rounded-lg border-2 border-gray-200 hover:border-[#3B82F6] transition-colors"
                    >
                      <div className="flex gap-1 mb-2">
                        <div className="w-6 h-6 rounded bg-[#3B82F6]"></div>
                        <div className="w-6 h-6 rounded bg-[#60A5FA]"></div>
                      </div>
                      <p className="text-xs font-medium">Ocean</p>
                    </button>

                    <button
                      onClick={() => setTheme({
                        primaryColor: '#F59E0B',
                        secondaryColor: '#FBBF24',
                        backgroundColor: '#FFFFFF',
                        textColor: '#1A1A1A',
                        fontFamily: 'Inter',
                        buttonStyle: 'rounded',
                        formWidth: 'medium'
                      })}
                      className="p-3 rounded-lg border-2 border-gray-200 hover:border-[#F59E0B] transition-colors"
                    >
                      <div className="flex gap-1 mb-2">
                        <div className="w-6 h-6 rounded bg-[#F59E0B]"></div>
                        <div className="w-6 h-6 rounded bg-[#FBBF24]"></div>
                      </div>
                      <p className="text-xs font-medium">Sunset</p>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Center - Design Preview */}
            <div className="flex-1 overflow-y-auto p-8 bg-gray-50">
              <div className={`mx-auto ${getFormWidthClass()}`}>
                <Card className="shadow-lg">
                  <CardContent className="p-8" style={{ backgroundColor: theme.backgroundColor, fontFamily: theme.fontFamily }}>
                    <div className="space-y-6">
                      {formElements.map((element) => (
                        <div key={element.id}>
                          {renderFormElement(element)}
                        </div>
                      ))}

                      <button
                        className={`w-full py-4 font-semibold text-white transition-all ${getButtonStyleClass()}`}
                        style={{ backgroundColor: theme.primaryColor }}
                      >
                        Submit Donation
                      </button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </>
        )}

        {/* Preview Tab */}
        {activeTab === 'preview' && (
          <div className="flex-1 overflow-y-auto bg-gray-100">
            <div className="min-h-full flex items-center justify-center p-8">
              <div className={`mx-auto ${getFormWidthClass()} w-full`}>
                <Card className="shadow-2xl">
                  <CardContent className="p-8 md:p-12" style={{ backgroundColor: theme.backgroundColor, fontFamily: theme.fontFamily }}>
                    <div className="space-y-6">
                      {formElements.map((element) => (
                        <div key={element.id}>
                          {renderFormElement(element)}
                        </div>
                      ))}

                      <button
                        className={`w-full py-4 font-semibold text-white transition-all hover:opacity-90 ${getButtonStyleClass()}`}
                        style={{ backgroundColor: theme.primaryColor }}
                      >
                        Submit Donation
                      </button>

                      <p className="text-center text-sm" style={{ color: `${theme.textColor}80` }}>
                        Secured by DonorSense • Your donation is safe and secure
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Share Drawer */}
      <AnimatePresence>
        {showShareDrawer && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50"
              onClick={() => setShowShareDrawer(false)}
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-full w-full md:w-[500px] bg-white shadow-2xl z-50 overflow-y-auto"
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-[#1A1A1A]">Share Form</h2>
                    <p className="text-sm text-[#6B6B6B]">Share your donation form with donors</p>
                  </div>
                  <button
                    onClick={() => setShowShareDrawer(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* QR Code */}
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <QrCode className="w-5 h-5 text-[#6A5ACD]" />
                      QR Code
                    </CardTitle>
                    <CardDescription>Scan to open the donation form</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col items-center">
                      {qrCodeUrl ? (
                        <>
                          <div className="p-4 bg-white rounded-lg border-2 border-gray-200 mb-4">
                            <Image src={qrCodeUrl} alt="QR Code" width={256} height={256} />
                          </div>
                          <Button onClick={downloadQRCode} variant="outline" className="w-full">
                            <Download className="w-4 h-4" />
                            Download QR Code
                          </Button>
                        </>
                      ) : (
                        <div className="w-64 h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                          <p className="text-gray-400">Generating QR Code...</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Form URL */}
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Globe className="w-5 h-5 text-[#6A5ACD]" />
                      Public URL
                    </CardTitle>
                    <CardDescription>Direct link to your donation form</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={formUrl}
                        readOnly
                        className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm font-mono"
                      />
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => copyToClipboard(formUrl)}
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                    <Button className="w-full" asChild>
                      <a href={formUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4" />
                        Open Form
                      </a>
                    </Button>
                  </CardContent>
                </Card>

                {/* Subdomain Settings */}
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <LinkIcon className="w-5 h-5 text-[#6A5ACD]" />
                      Custom Subdomain
                    </CardTitle>
                    <CardDescription>Customize your form URL</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={formSettings.subdomain}
                        onChange={(e) => setFormSettings({ ...formSettings, subdomain: e.target.value })}
                        className="flex-1 px-4 py-3 border border-gray-200 rounded-lg"
                        placeholder="your-subdomain"
                      />
                      <span className="text-sm text-[#6B6B6B] whitespace-nowrap">.donorsense.app</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-[#6B6B6B]">
                      <CheckCircle2 className="w-4 h-4 text-[#4ADE80]" />
                      Subdomain is available
                    </div>
                  </CardContent>
                </Card>

                {/* Embed Code */}
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Code className="w-5 h-5 text-[#6A5ACD]" />
                      Embed Code
                    </CardTitle>
                    <CardDescription>Add this form to your website</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="relative">
                      <pre className="p-4 bg-[#1A1A1A] text-gray-300 rounded-lg text-xs overflow-x-auto font-mono">
                        {getEmbedCode()}
                      </pre>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="absolute top-2 right-2"
                        onClick={() => copyToClipboard(getEmbedCode())}
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                    <p className="text-xs text-[#6B6B6B]">
                      Copy and paste this code into your website&apos;s HTML
                    </p>
                  </CardContent>
                </Card>

                {/* Social Sharing */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Share2 className="w-5 h-5 text-[#6A5ACD]" />
                      Share on Social Media
                    </CardTitle>
                    <CardDescription>Spread the word about your cause</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-3">
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(formUrl)}&text=Support our cause!`, '_blank')}
                      >
                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                        </svg>
                        Twitter
                      </Button>

                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(formUrl)}`, '_blank')}
                      >
                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                        </svg>
                        Facebook
                      </Button>

                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(formUrl)}`, '_blank')}
                      >
                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                        LinkedIn
                      </Button>

                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => window.open(`mailto:?subject=Support our cause&body=Check out this donation form: ${formUrl}`, '_blank')}
                      >
                        <Mail className="w-4 h-4 mr-2" />
                        Email
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
