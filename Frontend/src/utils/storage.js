import { createDefaultBrandData, createEmptyAsset, defaultPalette, toneOptions } from '../data/brandData'

export const BRAND_STORAGE_KEY = 'brandforge.setup'

function normalizeAsset(asset) {
  return {
    fileName: asset?.fileName || '',
    fileType: asset?.fileType || '',
    dataUrl: asset?.dataUrl || '',
  }
}

export function normalizeBrandSetup(data = {}) {
  const defaults = createDefaultBrandData()

  return {
    ...defaults,
    ...data,
    brandName: typeof data.brandName === 'string' ? data.brandName : defaults.brandName,
    tagline: typeof data.tagline === 'string' ? data.tagline : defaults.tagline,
    tone: toneOptions.includes(data.tone) ? data.tone : defaults.tone,
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

export function loadBrandSetup() {
  try {
    const raw = window.localStorage.getItem(BRAND_STORAGE_KEY)
    if (!raw) return createDefaultBrandData()
    return normalizeBrandSetup(JSON.parse(raw))
  } catch {
    return createDefaultBrandData()
  }
}

export function saveBrandSetup(data) {
  const normalized = normalizeBrandSetup(data)
  window.localStorage.setItem(BRAND_STORAGE_KEY, JSON.stringify(normalized))
  return normalized
}

export function clearBrandSetup() {
  window.localStorage.removeItem(BRAND_STORAGE_KEY)
}

export function createClearedBrandSetup() {
  return {
    ...createDefaultBrandData(),
    logo: createEmptyAsset(),
    mascot: createEmptyAsset(),
  }
}
