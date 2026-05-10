import { supabase } from './supabaseClient'

function normalizeGenerationData(data = {}) {
  return {
    id: data.id || '',
    userId: data.userId || '',
    brandId: data.brandId || '',
    brandName: data.brandName || '',
    prompt: data.prompt || '',
    format: data.format || 'video',
    platform: data.platform || '',
    duration: Number.isFinite(data.duration) ? data.duration : null,
    include: Array.isArray(data.include) ? data.include : [],
    outputUrl: data.outputUrl || '',
    videoUrl: data.videoUrl || '',
    imageUrl: data.imageUrl || '',
    title: data.title || '',
    summary: data.summary || '',
    rawResponse: data.rawResponse && typeof data.rawResponse === 'object' ? data.rawResponse : {},
    createdAt: data.createdAt || '',
    updatedAt: data.updatedAt || '',
  }
}

function mapGenerationToRow(userId, generationData = {}) {
  const normalized = normalizeGenerationData(generationData)

  return {
    user_id: userId,
    brand_id: normalized.brandId || null,
    brand_name: normalized.brandName,
    prompt: normalized.prompt,
    format: normalized.format,
    platform: normalized.platform,
    duration: normalized.duration,
    include: normalized.include,
    output_url: normalized.outputUrl,
    video_url: normalized.videoUrl,
    image_url: normalized.imageUrl,
    title: normalized.title,
    summary: normalized.summary,
    raw_response: normalized.rawResponse,
  }
}

function mapRowToGeneration(row) {
  return normalizeGenerationData({
    id: row.id,
    userId: row.user_id,
    brandId: row.brand_id,
    brandName: row.brand_name,
    prompt: row.prompt,
    format: row.format,
    platform: row.platform,
    duration: row.duration,
    include: row.include,
    outputUrl: row.output_url,
    videoUrl: row.video_url,
    imageUrl: row.image_url,
    title: row.title,
    summary: row.summary,
    rawResponse: row.raw_response,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  })
}

export async function createGeneration(userId, generationData) {
  const payload = {
    ...mapGenerationToRow(userId, generationData),
    updated_at: new Date().toISOString(),
  }

  const { data, error } = await supabase
    .from('generations')
    .insert(payload)
    .select('*')
    .single()

  if (error) throw error

  return mapRowToGeneration(data)
}

export async function fetchUserGenerations(userId) {
  const { data, error } = await supabase
    .from('generations')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (error) throw error

  return (data || []).map(mapRowToGeneration)
}

export async function deleteGeneration(userId, generationId) {
  const { error } = await supabase
    .from('generations')
    .delete()
    .eq('id', generationId)
    .eq('user_id', userId)

  if (error) throw error

  return true
}
