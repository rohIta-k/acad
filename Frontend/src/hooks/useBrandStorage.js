import { useCallback, useEffect, useState } from 'react'
import { loadBrandSetup, saveBrandSetup } from '../utils/storage'

export function useBrandStorage() {
  const [brandData, setBrandData] = useState(() => {
    if (typeof window === 'undefined') {
      return loadBrandSetup()
    }

    return loadBrandSetup()
  })

  const reloadBrandData = useCallback(() => {
    const next = loadBrandSetup()
    setBrandData(next)
    return next
  }, [])

  const persistBrandData = useCallback((nextData) => {
    const saved = saveBrandSetup(nextData)
    setBrandData(saved)
    return saved
  }, [])

  useEffect(() => {
    const handleStorage = (event) => {
      if (event.key === 'brandforge.setup') {
        reloadBrandData()
      }
    }

    window.addEventListener('storage', handleStorage)
    return () => window.removeEventListener('storage', handleStorage)
  }, [reloadBrandData])

  return {
    brandData,
    persistBrandData,
    reloadBrandData,
  }
}
