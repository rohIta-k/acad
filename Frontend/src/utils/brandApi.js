import { createDefaultBrandData, defaultPalette } from '../data/brandData'
import { supabase } from './supabaseClient'

function normalizeAsset(asset) {
  return {
    fileName: asset?.fileName || '',
    fileType: asset?.fileType || '',
    dataUrl: asset?.dataUrl || '',
  }
}

export function normalizeBrandData(data = {}) {
  const defaults = createDefaultBrandData()

  return {
    ...defaults,
    ...data,
    brandName: typeof data.brandName === 'string' ? data.brandName : defaults.brandName,
    tagline: typeof data.tagline === 'string' ? data.tagline : defaults.tagline,
    tone: typeof data.tone === 'string' ? data.tone : defaults.tone,
    palette:
      Array.isArray(data.palette) && data.palette.length > 0
        ? data.palette.slice(0, 5)
        : defaultPalette,
    audience: Array.isArray(data.audience) ? data.audience : defaults.audience,
    logo: normalizeAsset(data.logo),
    mascot: normalizeAsset(data.mascot),
    references: Array.isArray(data.references)
      ? data.references.map(normalizeAsset).filter((item) => item.dataUrl)
      : defaults.references,
    completedSetup: Boolean(data.completedSetup),
    updatedAt: typeof data.updatedAt === 'string' ? data.updatedAt : '',
  }
}

function mapBrandToRow(brandData, userId) {
  const normalized = normalizeBrandData(brandData)

  return {
    user_id: userId,
    brand_name: normalized.brandName,
    tagline: normalized.tagline,
    tone: normalized.tone,
    palette: normalized.palette,
    audience: normalized.audience,
    logo: normalized.logo,
    mascot: normalized.mascot,
    brand_references: normalized.references,
    completed_setup: Boolean(normalized.completedSetup),
  }
}

function mapRowToBrand(row) {
  const normalized = normalizeBrandData({
    id: row.id,
    brandName: row.brand_name,
    tagline: row.tagline,
    tone: row.tone,
    palette: row.palette,
    audience: row.audience,
    logo: row.logo,
    mascot: row.mascot,
    references: row.brand_references,
    completedSetup: row.completed_setup,
    updatedAt: row.updated_at || '',
  })

  return {
    ...normalized,
    id: row.id,
    userId: row.user_id,
    createdAt: row.created_at || '',
  }
}

export async function getCurrentUser() {
  const { data, error } = await supabase.auth.getUser()

  if (error) throw error

  return data?.user ?? null
}

export async function fetchUserBrands(userId) {
  const { data, error } = await supabase
    .from('brands')
    .select('*')
    .eq('user_id', userId)
    .order('updated_at', { ascending: false })

  if (error) throw error

  return (data || []).map(mapRowToBrand)
}

export async function createUserBrand(userId, brandData) {
  const payload = {
    ...mapBrandToRow(brandData, userId),
    updated_at: new Date().toISOString(),
  }

  const { data, error } = await supabase
    .from('brands')
    .insert(payload)
    .select('*')
    .single()

  if (error) throw error

  return mapRowToBrand(data)
}

export async function updateUserBrand(userId, brandId, brandData) {
  const payload = {
    ...mapBrandToRow(brandData, userId),
    updated_at: new Date().toISOString(),
  }

  const { data, error } = await supabase
    .from('brands')
    .update(payload)
    .eq('id', brandId)
    .eq('user_id', userId)
    .select('*')
    .single()

  if (error) throw error

  return mapRowToBrand(data)
}
