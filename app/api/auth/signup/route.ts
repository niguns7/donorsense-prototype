import { NextRequest, NextResponse } from 'next/server'
import { readJson, writeJson, generateId } from '@/lib/db'
import type { Organization } from '@/lib/types'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    const organizations = await readJson<Organization[]>('organizations.json')
    
    // Check if user already exists
    const existingOrg = organizations.find(org => org.email === email)
    if (existingOrg) {
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 409 }
      )
    }

    // Create new organization
    const newOrg: Organization = {
      id: generateId('org-'),
      name: '',
      email,
      password, // In a real app, this would be hashed
      theme: {
        primary: '#6A5ACD',
        secondary: '#9B87FF',
        tertiary: '#C7BFFF'
      },
      isActive: false,
      createdAt: new Date().toISOString()
    }

    organizations.push(newOrg)
    await writeJson('organizations.json', organizations)

    // Return user data (without password)
    const { password: _, ...userWithoutPassword } = newOrg

    return NextResponse.json({
      success: true,
      user: userWithoutPassword
    })
  } catch (error) {
    console.error('Signup error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
