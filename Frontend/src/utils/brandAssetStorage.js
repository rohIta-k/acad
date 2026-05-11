import { supabase } from './supabaseClient'

const CONFIGURED_BUCKET = import.meta.env.VITE_SUPABASE_BRAND_ASSET_BUCKET?.trim() || 'brand-asset'
const FALLBACK_BUCKETS = Array.from(
    new Set([
        CONFIGURED_BUCKET,
        CONFIGURED_BUCKET === 'brand-asset' ? 'brand-assets' : 'brand-asset',
    ]),
)

function sanitizeFileName(fileName = 'asset') {
    return fileName
        .trim()
        .replace(/\s+/g, '-')
        .replace(/[^a-zA-Z0-9._-]/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '')
        .slice(0, 80) || 'asset'
}

function getFileExtension(fileName = '', fileType = '') {
    const nameParts = fileName.split('.')
    if (nameParts.length > 1) {
        return nameParts.pop().toLowerCase()
    }

    if (fileType === 'image/jpeg') return 'jpg'
    if (fileType === 'image/svg+xml') return 'svg'
    if (fileType === 'image/webp') return 'webp'
    if (fileType === 'image/gif') return 'gif'
    if (fileType === 'image/png') return 'png'

    return 'png'
}

function makeStoragePath({ userId = 'anonymous', brandId = 'draft', kind = 'asset', fileName = 'asset', fileType = '' } = {}) {
    const baseName = fileName.includes('.')
        ? fileName.split('.').slice(0, -1).join('.')
        : fileName

    const safeName = sanitizeFileName(baseName)
    const extension = getFileExtension(fileName, fileType)
    const uniqueId = typeof globalThis.crypto?.randomUUID === 'function'
        ? globalThis.crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(36).slice(2)}`

    return [
        'brands',
        sanitizeFileName(userId),
        sanitizeFileName(brandId),
        sanitizeFileName(kind),
        `${uniqueId}-${safeName}.${extension}`,
    ].join('/')
}

export function getAssetUrl(asset) {
    return asset?.url || asset?.publicUrl || asset?.dataUrl || ''
}

async function uploadBlobToStorage(blob, { fileName, fileType, userId, brandId, kind }) {
    const storagePath = makeStoragePath({
        userId,
        brandId,
        kind,
        fileName,
        fileType,
    })

    let lastError = null

    for (const bucketName of FALLBACK_BUCKETS) {
        const { data, error } = await supabase.storage
            .from(bucketName)
            .upload(storagePath, blob, {
                contentType: fileType || blob.type || 'application/octet-stream',
                upsert: false,
            })

        if (!error && data?.path) {
            const { data: publicData } = supabase.storage
                .from(bucketName)
                .getPublicUrl(data.path)

            return {
                fileName,
                fileType: fileType || blob.type || '',
                url: publicData.publicUrl,
                storagePath: data.path,
                brief: '',
            }
        }

        lastError = error
    }

    throw lastError || new Error('Failed to upload asset to Supabase Storage')
}

export async function uploadBrandImageAsset(file, options = {}) {
    if (!file) {
        throw new Error('No file provided for upload')
    }

    const fileName = file.name || options.fileName || 'asset.png'
    const fileType = file.type || options.fileType || 'image/png'

    return uploadBlobToStorage(file, {
        fileName,
        fileType,
        userId: options.userId,
        brandId: options.brandId,
        kind: options.kind || 'asset',
    })
}

export async function uploadBrandImageAssetFromUrl(sourceUrl, options = {}) {
    if (!sourceUrl) {
        throw new Error('No source URL provided for upload')
    }

    const response = await fetch(sourceUrl)
    if (!response.ok) {
        throw new Error(`Failed to fetch image for storage upload (${response.status})`)
    }

    const blob = await response.blob()
    const inferredFileName = options.fileName || sourceUrl.split('/').pop()?.split('?')[0] || 'generated-image.png'
    const fileType = blob.type || options.fileType || 'image/png'
    const uploadFile = typeof File !== 'undefined'
        ? new File([blob], inferredFileName, { type: fileType })
        : blob

    return uploadBlobToStorage(uploadFile, {
        fileName: inferredFileName,
        fileType,
        userId: options.userId,
        brandId: options.brandId,
        kind: options.kind || 'asset',
    })
}