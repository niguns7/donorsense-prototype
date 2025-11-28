import fs from 'fs/promises'
import path from 'path'

const DATA_DIR = path.join(process.cwd(), 'data')

/**
 * Read JSON data from a file
 */
export async function readJson<T>(filename: string): Promise<T> {
  try {
    const filePath = path.join(DATA_DIR, filename)
    const data = await fs.readFile(filePath, 'utf-8')
    return JSON.parse(data) as T
  } catch (error) {
    console.error(`Error reading ${filename}:`, error)
    // Return empty array or object depending on context
    return (filename.includes('.json') ? [] : {}) as T
  }
}

/**
 * Write JSON data to a file
 */
export async function writeJson<T>(filename: string, data: T): Promise<void> {
  try {
    const filePath = path.join(DATA_DIR, filename)
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8')
  } catch (error) {
    console.error(`Error writing ${filename}:`, error)
    throw error
  }
}

/**
 * Generate a unique ID
 */
export function generateId(prefix: string = ''): string {
  const timestamp = Date.now()
  const random = Math.random().toString(36).substring(2, 9)
  return `${prefix}${timestamp}-${random}`
}

/**
 * Get organization by ID
 */
export async function getOrganization(orgId: string) {
  const orgs = await readJson<any[]>('organizations.json')
  return orgs.find(org => org.id === orgId)
}

/**
 * Update organization
 */
export async function updateOrganization(orgId: string, updates: any) {
  const orgs = await readJson<any[]>('organizations.json')
  const index = orgs.findIndex(org => org.id === orgId)
  
  if (index !== -1) {
    orgs[index] = { ...orgs[index], ...updates, updatedAt: new Date().toISOString() }
    await writeJson('organizations.json', orgs)
    return orgs[index]
  }
  
  return null
}

/**
 * Get donations for an organization
 */
export async function getDonations(orgId: string) {
  const donations = await readJson<any[]>('donations.json')
  return donations.filter(donation => donation.organizationId === orgId)
}

/**
 * Add donation
 */
export async function addDonation(donation: any) {
  const donations = await readJson<any[]>('donations.json')
  const newDonation = {
    id: generateId('don-'),
    ...donation,
    createdAt: new Date().toISOString()
  }
  donations.push(newDonation)
  await writeJson('donations.json', donations)
  return newDonation
}

/**
 * Get donors for an organization
 */
export async function getDonors(orgId: string) {
  const donors = await readJson<any[]>('donors.json')
  return donors.filter(donor => donor.organizationId === orgId)
}

/**
 * Add or update donor
 */
export async function upsertDonor(donor: any) {
  const donors = await readJson<any[]>('donors.json')
  const existingIndex = donors.findIndex(d => 
    d.email === donor.email && d.organizationId === donor.organizationId
  )
  
  if (existingIndex !== -1) {
    donors[existingIndex] = { ...donors[existingIndex], ...donor, updatedAt: new Date().toISOString() }
    await writeJson('donors.json', donors)
    return donors[existingIndex]
  } else {
    const newDonor = {
      id: generateId('donor-'),
      ...donor,
      createdAt: new Date().toISOString()
    }
    donors.push(newDonor)
    await writeJson('donors.json', donors)
    return newDonor
  }
}
