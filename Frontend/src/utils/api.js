const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL?.trim() ||
  'http://localhost:5000'

async function readJsonResponse(response) {
  const data = await response.json().catch(() => ({}))

  if (!response.ok) {
    throw new Error(data.error || `Request failed with status ${response.status}`)
  }

  return data
}

function buildMascotBrandData(brandData = {}) {
  return {
    brandName: typeof brandData.brandName === 'string' ? brandData.brandName.trim() : '',
    tagline: typeof brandData.tagline === 'string' ? brandData.tagline.trim() : '',
    tone: typeof brandData.tone === 'string' ? brandData.tone.trim() : '',
    audience: Array.isArray(brandData.audience) ? brandData.audience.slice(0, 6) : [],
    palette: Array.isArray(brandData.palette) ? brandData.palette.slice(0, 5) : [],
    mascotBrief: typeof brandData.mascot?.brief === 'string' ? brandData.mascot.brief.trim() : '',
    hasLogo: Boolean(brandData.logo?.dataUrl),
    hasMascot: Boolean(brandData.mascot?.dataUrl),
    referencesCount: Array.isArray(brandData.references) ? brandData.references.length : 0,
  }
}

export async function generateRunwayVideo(payload) {
  const response = await fetch(
    `${API_BASE_URL}/api/groq/generatefull`,
    {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        idea: payload.idea,
        format: payload.format,
        platform: payload.platform,
        include: payload.include,
        duration: payload.duration ?? 10,
        brandData: payload.brandData,
      }),
    },
  )

  return readJsonResponse(response)
}

export async function generateRunwayMascot(payload) {
  const brandData = buildMascotBrandData(payload.brandData)

  const response = await fetch(
    `${API_BASE_URL}/api/runway/generate-mascot`,
    {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        brandData,
        ratio: payload.ratio || '1080:1080',
      }),
    },
  )

  return readJsonResponse(response)
}
