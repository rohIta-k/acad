const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'

async function readJsonResponse(response) {
  const data = await response.json().catch(() => ({}))

  if (!response.ok) {
    throw new Error(data.error || `Request failed with status ${response.status}`)
  }

  return data
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
        duration: payload.duration || 5,
        brandData: payload.brandData,
      }),
    },
  )

  return readJsonResponse(response)
}
