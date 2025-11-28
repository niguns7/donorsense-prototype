import { NextRequest, NextResponse } from 'next/server'
import { updateOrganization } from '@/lib/db'

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json()
    const { organizationId, ...updates } = body

    if (!organizationId) {
      return NextResponse.json(
        { error: 'Organization ID is required' },
        { status: 400 }
      )
    }

    const updatedOrg = await updateOrganization(organizationId, updates)

    if (!updatedOrg) {
      return NextResponse.json(
        { error: 'Organization not found' },
        { status: 404 }
      )
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _pwd, ...orgWithoutPassword } = updatedOrg

    return NextResponse.json({
      success: true,
      organization: orgWithoutPassword
    })
  } catch (error) {
    console.error('Update organization error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
