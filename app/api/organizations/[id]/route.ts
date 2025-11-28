import { NextRequest, NextResponse } from 'next/server'
import { getOrganization } from '@/lib/db'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    
    if (!id) {
      return NextResponse.json(
        { error: 'Organization ID is required' },
        { status: 400 }
      )
    }

    const org = await getOrganization(id)

    if (!org) {
      return NextResponse.json(
        { error: 'Organization not found' },
        { status: 404 }
      )
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _pwd, ...orgWithoutPassword } = org

    return NextResponse.json({
      success: true,
      organization: orgWithoutPassword
    })
  } catch (error) {
    console.error('Get organization error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
