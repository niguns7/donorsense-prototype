'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Upload, Building2, CheckCircle2, ArrowRight, ArrowLeft, Palette } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuthStore } from '@/lib/store'
import { useTheme } from '@/lib/theme-context'

export default function OnboardingPage() {
  const router = useRouter()
  const { user, updateUser } = useAuthStore()
  const { updateTheme } = useTheme()
  const [currentStep, setCurrentStep] = useState(1)
  const [loading, setLoading] = useState(false)

  // Step 1: Theme
  const [logo, setLogo] = useState('')
  const [primaryColor, setPrimaryColor] = useState('#6A5ACD')
  const [secondaryColor, setSecondaryColor] = useState('#9B87FF')
  const [tertiaryColor, setTertiaryColor] = useState('#C7BFFF')

  // Step 2: Business Info
  const [orgName, setOrgName] = useState('')
  const [ein, setEin] = useState('')
  const [country, setCountry] = useState('United States')
  const [state, setState] = useState('')
  const [contactEmail, setContactEmail] = useState(user?.email || '')
  const [description, setDescription] = useState('')

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setLogo(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleComplete = async () => {
    setLoading(true)

    try {
      const res = await fetch('/api/organizations', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          organizationId: user?.organizationId,
          name: orgName,
          ein,
          country,
          state,
          description,
          logo,
          theme: {
            primary: primaryColor,
            secondary: secondaryColor,
            tertiary: tertiaryColor
          },
          isActive: true
        })
      })

      if (res.ok) {
        updateUser({ name: orgName })
        // Update theme immediately
        updateTheme({
          primary: primaryColor,
          secondary: secondaryColor,
          tertiary: tertiaryColor
        })
        router.push('/dashboard')
      }
    } catch (error) {
      console.error('Onboarding error:', error)
    } finally {
      setLoading(false)
    }
  }

  const steps = [
    { number: 1, title: 'Theme', icon: Palette },
    { number: 2, title: 'Business Info', icon: Building2 },
    { number: 3, title: 'Ready', icon: CheckCircle2 }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F7F7FB] via-white to-[#C7BFFF]/10 p-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#6A5ACD] to-[#9B87FF] flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-[#1A1A1A]">
              DonorSense<span className="text-[#6A5ACD]">.AI</span>
            </span>
          </div>
          <h1 className="text-3xl font-bold text-[#1A1A1A] mb-2">Welcome to DonorSense</h1>
          <p className="text-[#6B6B6B]">Let&apos;s set up your organization in 3 simple steps</p>
        </div>

        {/* Progress Indicator */}
        <div className="flex items-center justify-center mb-12 gap-4">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center">
              <div className="flex flex-col items-center gap-2">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                    currentStep >= step.number
                      ? 'bg-gradient-to-br from-[#6A5ACD] to-[#9B87FF] text-white shadow-lg'
                      : 'bg-gray-100 text-gray-400'
                  }`}
                >
                  <step.icon className="w-6 h-6" />
                </div>
                <span className={`text-sm font-medium ${currentStep >= step.number ? 'text-[#6A5ACD]' : 'text-gray-400'}`}>
                  {step.title}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div className={`w-20 h-0.5 mx-4 ${currentStep > step.number ? 'bg-[#6A5ACD]' : 'bg-gray-200'}`} />
              )}
            </div>
          ))}
        </div>

        {/* Step Content */}
        <Card className="relative overflow-hidden">
          <AnimatePresence mode="wait">
            {/* Step 1: Theme */}
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <CardHeader>
                  <CardTitle>Upload Theme</CardTitle>
                  <CardDescription>Customize the look and feel of your organization</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Logo Upload */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[#1A1A1A]">Organization Logo</label>
                    <div className="flex items-center gap-4">
                      {logo ? (
                        <div className="w-24 h-24 rounded-xl border-2 border-gray-200 overflow-hidden">
                          <img src={logo} alt="Logo" className="w-full h-full object-cover" />
                        </div>
                      ) : (
                        <div className="w-24 h-24 rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50">
                          <Upload className="w-8 h-8 text-gray-400" />
                        </div>
                      )}
                      <label className="cursor-pointer">
                        <input type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
                        <span className="inline-block px-4 py-2 bg-[#F7F7FB] border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors">
                          Choose File
                        </span>
                      </label>
                    </div>
                  </div>

                  {/* Color Pickers */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-[#1A1A1A]">Primary Color</label>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={primaryColor}
                          onChange={(e) => setPrimaryColor(e.target.value)}
                          className="w-12 h-12 rounded-lg border-2 border-gray-200 cursor-pointer"
                        />
                        <input
                          type="text"
                          value={primaryColor}
                          onChange={(e) => setPrimaryColor(e.target.value)}
                          className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6A5ACD]"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-[#1A1A1A]">Secondary Color</label>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={secondaryColor}
                          onChange={(e) => setSecondaryColor(e.target.value)}
                          className="w-12 h-12 rounded-lg border-2 border-gray-200 cursor-pointer"
                        />
                        <input
                          type="text"
                          value={secondaryColor}
                          onChange={(e) => setSecondaryColor(e.target.value)}
                          className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6A5ACD]"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-[#1A1A1A]">Tertiary Color</label>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={tertiaryColor}
                          onChange={(e) => setTertiaryColor(e.target.value)}
                          className="w-12 h-12 rounded-lg border-2 border-gray-200 cursor-pointer"
                        />
                        <input
                          type="text"
                          value={tertiaryColor}
                          onChange={(e) => setTertiaryColor(e.target.value)}
                          className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6A5ACD]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Preview */}
                  <div className="p-6 rounded-xl border-2 border-gray-200 bg-gradient-to-br from-gray-50 to-white">
                    <p className="text-sm font-medium text-[#6B6B6B] mb-3">Color Preview</p>
                    <div className="flex gap-3">
                      <div className="w-20 h-20 rounded-xl shadow-md" style={{ backgroundColor: primaryColor }} />
                      <div className="w-20 h-20 rounded-xl shadow-md" style={{ backgroundColor: secondaryColor }} />
                      <div className="w-20 h-20 rounded-xl shadow-md" style={{ backgroundColor: tertiaryColor }} />
                    </div>
                  </div>
                </CardContent>
              </motion.div>
            )}

            {/* Step 2: Business Info */}
            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <CardHeader>
                  <CardTitle>Business Information</CardTitle>
                  <CardDescription>Tell us about your organization</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-[#1A1A1A]">Organization Name *</label>
                      <input
                        type="text"
                        value={orgName}
                        onChange={(e) => setOrgName(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6A5ACD]"
                        placeholder="e.g., Hope Foundation"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-[#1A1A1A]">EIN</label>
                      <input
                        type="text"
                        value={ein}
                        onChange={(e) => setEin(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6A5ACD]"
                        placeholder="12-3456789"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-[#1A1A1A]">Country</label>
                      <select
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6A5ACD]"
                      >
                        <option>United States</option>
                        <option>Canada</option>
                        <option>United Kingdom</option>
                        <option>Australia</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-[#1A1A1A]">State/Province</label>
                      <input
                        type="text"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6A5ACD]"
                        placeholder="e.g., California"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[#1A1A1A]">Contact Email</label>
                    <input
                      type="email"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6A5ACD]"
                      placeholder="contact@organization.org"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[#1A1A1A]">Short Description</label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6A5ACD]"
                      placeholder="Tell us about your organization's mission..."
                    />
                  </div>
                </CardContent>
              </motion.div>
            )}

            {/* Step 3: Ready */}
            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <CardHeader>
                  <CardTitle>You&apos;re All Set!</CardTitle>
                  <CardDescription>Your organization is ready to start accepting donations</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-center py-8">
                    <div className="w-20 h-20 bg-gradient-to-br from-[#4ADE80] to-[#4ADE80]/70 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle2 className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-[#1A1A1A] mb-2">Welcome, {orgName}!</h3>
                    <p className="text-[#6B6B6B] max-w-md mx-auto">
                      Your account is configured and ready. You can now start managing donations, engaging with donors,
                      and launching campaigns.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-gradient-to-br from-[#C7BFFF]/10 to-transparent rounded-xl border border-[#C7BFFF]/30">
                      <CheckCircle2 className="w-6 h-6 text-[#4ADE80] mb-2" />
                      <p className="text-sm font-medium text-[#1A1A1A]">Theme Configured</p>
                    </div>
                    <div className="p-4 bg-gradient-to-br from-[#C7BFFF]/10 to-transparent rounded-xl border border-[#C7BFFF]/30">
                      <CheckCircle2 className="w-6 h-6 text-[#4ADE80] mb-2" />
                      <p className="text-sm font-medium text-[#1A1A1A]">Organization Set Up</p>
                    </div>
                    <div className="p-4 bg-gradient-to-br from-[#C7BFFF]/10 to-transparent rounded-xl border border-[#C7BFFF]/30">
                      <CheckCircle2 className="w-6 h-6 text-[#4ADE80] mb-2" />
                      <p className="text-sm font-medium text-[#1A1A1A]">Ready to Launch</p>
                    </div>
                  </div>
                </CardContent>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation */}
          <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={handleBack}
              disabled={currentStep === 1}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>

            {currentStep < 3 ? (
              <Button onClick={handleNext} disabled={currentStep === 2 && !orgName} className="gap-2">
                Next
                <ArrowRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button onClick={handleComplete} disabled={loading} className="gap-2">
                {loading ? 'Setting up...' : 'Go to Dashboard'}
                <ArrowRight className="w-4 h-4" />
              </Button>
            )}
          </div>
        </Card>
      </div>
    </div>
  )
}
