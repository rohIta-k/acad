import { useCallback, useEffect, useMemo, useState } from 'react'
import { createGeneration, deleteGeneration, fetchUserGenerations } from '../utils/generationApi'

const generationCacheByUserId = new Map()

function isMissingGenerationsTableError(err) {
  const message = (err?.message || '').toLowerCase()
  return message.includes('public.generations') && message.includes('schema cache')
}

export function useGenerationStorage(user) {
  const [generations, setGenerations] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchPrompt, setSearchPrompt] = useState('')
  const [filterFormat, setFilterFormat] = useState('')
  const [filterPlatform, setFilterPlatform] = useState('')
  const [filterBrand, setFilterBrand] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6
  const userId = user?.id || ''

  const reloadGenerations = useCallback(async () => {
    if (!userId) {
      setGenerations([])
      setLoading(false)
      return []
    }

    const cachedGenerations = generationCacheByUserId.get(userId)
    if (cachedGenerations) {
      setGenerations(cachedGenerations)
      setLoading(false)
      setError('')
      return cachedGenerations
    }

    setLoading(true)
    setError('')

    try {
      const data = await fetchUserGenerations(userId)
      setGenerations(data)
      generationCacheByUserId.set(userId, data)
      return data
    } catch (err) {
      if (isMissingGenerationsTableError(err)) {
        setGenerations([])
        setError('Generations table is missing in Supabase. Run Backend/sql/generations_schema.sql in Supabase SQL Editor, then refresh this page.')
        return []
      }

      setError(err?.message || 'Unable to load saved generations')
      return []
    } finally {
      setLoading(false)
    }
  }, [userId])

  const saveGeneration = useCallback(
    async (payload) => {
      if (!userId) {
        throw new Error('Please sign in to save generations')
      }

      const saved = await createGeneration(userId, payload)
      setGenerations((current) => {
        const nextGenerations = [saved, ...current]
        generationCacheByUserId.set(userId, nextGenerations)
        return nextGenerations
      })
      return saved
    },
    [userId],
  )

  const removeGeneration = useCallback(
    async (generationId) => {
      if (!userId) {
        throw new Error('Please sign in to delete generations')
      }

      await deleteGeneration(userId, generationId)
      setGenerations((current) => {
        const nextGenerations = current.filter((item) => item.id !== generationId)
        generationCacheByUserId.set(userId, nextGenerations)
        return nextGenerations
      })
    },
    [userId],
  )

  // Compute filter options and filtered results
  const filterOptions = useMemo(() => {
    const formats = new Set()
    const platforms = new Set()
    const brands = new Set()

    generations.forEach((gen) => {
      if (gen.format) formats.add(gen.format)
      if (gen.platform) platforms.add(gen.platform)
      if (gen.brandName) brands.add(gen.brandName)
    })

    return {
      formats: Array.from(formats).sort(),
      platforms: Array.from(platforms).sort(),
      brands: Array.from(brands).sort(),
    }
  }, [generations])

  const filteredGenerations = useMemo(() => {
    return generations.filter((item) => {
      const matchesFormat = !filterFormat || item.format === filterFormat
      const matchesPlatform = !filterPlatform || item.platform === filterPlatform
      const matchesBrand = !filterBrand || item.brandName === filterBrand
      const matchesSearch = !searchPrompt || item.prompt.toLowerCase().includes(searchPrompt.toLowerCase())

      return matchesFormat && matchesPlatform && matchesBrand && matchesSearch
    })
  }, [generations, filterFormat, filterPlatform, filterBrand, searchPrompt])

  const totalPages = Math.ceil(filteredGenerations.length / itemsPerPage)
  const paginatedGenerations = useMemo(() => {
    const startIdx = (currentPage - 1) * itemsPerPage
    return filteredGenerations.slice(startIdx, startIdx + itemsPerPage)
  }, [filteredGenerations, currentPage])

  const handleSearchChange = useCallback((value) => {
    setSearchPrompt(value)
    setCurrentPage(1)
  }, [])

  const handleFormatChange = useCallback((value) => {
    setFilterFormat(value)
    setCurrentPage(1)
  }, [])

  const handlePlatformChange = useCallback((value) => {
    setFilterPlatform(value)
    setCurrentPage(1)
  }, [])

  const handleBrandChange = useCallback((value) => {
    setFilterBrand(value)
    setCurrentPage(1)
  }, [])

  useEffect(() => {
    let active = true

    ;(async () => {
      if (!active) return
      await reloadGenerations()
    })()

    return () => {
      active = false
    }
  }, [reloadGenerations, userId])

  return {
    generations,
    filteredGenerations,
    paginatedGenerations,
    loading,
    error,
    reloadGenerations,
    saveGeneration,
    removeGeneration,
    searchPrompt,
    handleSearchChange,
    filterFormat,
    handleFormatChange,
    filterPlatform,
    handlePlatformChange,
    filterBrand,
    handleBrandChange,
    filterOptions,
    currentPage,
    setCurrentPage,
    totalPages,
  }
}
