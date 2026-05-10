import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { createDefaultBrandData } from '../data/brandData'
import {
  createUserBrand,
  fetchUserBrands,
  getCurrentUser,
  updateUserBrand,
} from '../utils/brandApi'
import { supabase } from '../utils/supabaseClient'

function isMissingBrandsTableError(err) {
  const message = (err?.message || '').toLowerCase()
  return message.includes('public.brands') && message.includes('schema cache')
}

export function useBrandStorage() {
  const [user, setUser] = useState(null)
  const [brands, setBrands] = useState([])
  const [activeBrandId, setActiveBrandIdState] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const schemaMissingRef = useRef(false)

  const persistActiveBrandId = useCallback((brandId) => {
    setActiveBrandIdState(brandId || '')
  }, [])

  const syncBrands = useCallback(
    (nextBrands) => {
      setBrands(nextBrands)

      if (nextBrands.length === 0) {
        persistActiveBrandId('')
        return nextBrands
      }

      const currentBrand = nextBrands.find((item) => item.id === activeBrandId)
      if (currentBrand) {
        return nextBrands
      }

      persistActiveBrandId(nextBrands[0].id)
      return nextBrands
    },
    [activeBrandId, persistActiveBrandId],
  )

  const reloadBrandData = useCallback(
    async (forcedUser = null, options = {}) => {
      const { showLoading = true } = options

      if (schemaMissingRef.current) {
        setLoading(false)
        return []
      }

      let nextUser = forcedUser

      if (!nextUser) {
        nextUser = await getCurrentUser()
      }

      if (!nextUser) {
        setBrands([])
        persistActiveBrandId('')
        setLoading(false)
        return []
      }

      if (showLoading) {
        setLoading(true)
      }
      setError('')

      try {
        const nextBrands = await fetchUserBrands(nextUser.id)
        return syncBrands(nextBrands)
      } catch (err) {
        if (isMissingBrandsTableError(err)) {
          schemaMissingRef.current = true
          setBrands([])
          persistActiveBrandId('')
          setError('Brands table is missing in Supabase. Run Backend/sql/brands_schema.sql in Supabase SQL Editor, then refresh this page.')
          return []
        }

        setError(err?.message || 'Failed to load your brands')
        return []
      } finally {
        setLoading(false)
      }
    },
    [persistActiveBrandId, syncBrands],
  )

  const setActiveBrand = useCallback(
    (brandId) => {
      if (!brandId) {
        persistActiveBrandId('')
        return
      }

      const exists = brands.some((item) => item.id === brandId)
      if (exists) {
        persistActiveBrandId(brandId)
      }
    },
    [brands, persistActiveBrandId],
  )

  const persistBrandData = useCallback(
    async (nextData, brandId = null) => {
      if (!user) {
        throw new Error('Please sign in to save your brand')
      }

      setError('')

      const selectedBrandId = brandId || activeBrandId

      try {
        let savedBrand

        if (selectedBrandId) {
          savedBrand = await updateUserBrand(user.id, selectedBrandId, nextData)
          const nextBrands = brands.map((item) =>
            item.id === selectedBrandId ? savedBrand : item,
          )
          syncBrands(nextBrands)
        } else {
          savedBrand = await createUserBrand(user.id, nextData)
          syncBrands([savedBrand, ...brands])
        }

        persistActiveBrandId(savedBrand.id)
        return savedBrand
      } catch (err) {
        const message = err?.message || 'Failed to save your brand'
        setError(message)
        throw new Error(message, { cause: err })
      }
    },
    [activeBrandId, brands, persistActiveBrandId, syncBrands, user],
  )

  useEffect(() => {
    let mounted = true

    ;(async () => {
      try {
        const nextUser = await getCurrentUser()
        if (!mounted) return

        setUser(nextUser)

        if (!nextUser) {
          setLoading(false)
          return
        }

        await reloadBrandData(nextUser, { showLoading: true })
      } catch (err) {
        if (!mounted) return
        setError(err?.message || 'Unable to get signed-in user')
        setLoading(false)
      }
    })()

    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      const nextUser = session?.user ?? null
      setUser(nextUser)

      if (!nextUser) {
        schemaMissingRef.current = false
        setBrands([])
        persistActiveBrandId('')
        setLoading(false)
        return
      }

      if (event === 'SIGNED_IN' || event === 'USER_UPDATED') {
        reloadBrandData(nextUser, { showLoading: false })
      }
    })

    return () => {
      mounted = false
      if (listener?.subscription) listener.subscription.unsubscribe()
    }
  }, [persistActiveBrandId, reloadBrandData])

  const brandData = useMemo(() => {
    if (!activeBrandId) {
      return createDefaultBrandData()
    }

    return brands.find((item) => item.id === activeBrandId) || createDefaultBrandData()
  }, [activeBrandId, brands])

  return {
    user,
    brands,
    activeBrandId,
    brandData,
    setActiveBrand,
    persistBrandData,
    reloadBrandData,
    loading,
    error,
  }
}
