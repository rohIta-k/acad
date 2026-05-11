import { useEffect, useCallback } from 'react'

const getStorageKey = (userId) => `create_page_state_${userId}`

export function useCreatePagePersistence({
  user,
  prompt,
  selectedFormat,
  selectedPlatform,
  duration,
  included,
  generationResult,
  hasGenerated,
  setPrompt,
  setSelectedFormat,
  setSelectedPlatform,
  setDuration,
  setIncluded,
  setGenerationResult,
  setHasGenerated,
}) {
  const userId = user?.id
  const storageKey = userId ? getStorageKey(userId) : null

  // Load from localStorage on mount
  useEffect(() => {
    if (!userId) return

    try {
      const saved = localStorage.getItem(storageKey)
      if (saved) {
        const {
          savedPrompt,
          savedFormat,
          savedPlatform,
          savedDuration,
          savedIncluded,
          savedGenerationResult,
          savedHasGenerated,
        } = JSON.parse(saved)

        if (savedPrompt) setPrompt(savedPrompt)
        if (savedFormat) setSelectedFormat(savedFormat)
        if (savedPlatform) setSelectedPlatform(savedPlatform)
        if (savedDuration !== undefined) setDuration(savedDuration)
        if (savedIncluded) setIncluded(savedIncluded)
        if (savedGenerationResult) {
          setGenerationResult(savedGenerationResult)
          setHasGenerated(true)
        }
      }
    } catch (error) {
      console.warn('Failed to restore create page state:', error)
    }
  }, [])

  // Save to localStorage whenever state changes
  useEffect(() => {
    if (!userId || !storageKey) return

    try {
      const stateToSave = {
        savedPrompt: prompt,
        savedFormat: selectedFormat,
        savedPlatform: selectedPlatform,
        savedDuration: duration,
        savedIncluded: included,
        savedGenerationResult: generationResult,
        savedHasGenerated: hasGenerated,
      }
      localStorage.setItem(storageKey, JSON.stringify(stateToSave))
    } catch (error) {
      console.warn('Failed to save create page state:', error)
    }
  }, [userId, storageKey, prompt, selectedFormat, selectedPlatform, duration, included, generationResult, hasGenerated])

  // Clear localStorage when user logs out
  useEffect(() => {
    return () => {
      // Clear user's session storage when component unmounts (user logs out)
      if (storageKey) {
        try {
          localStorage.removeItem(storageKey)
        } catch (error) {
          console.warn('Failed to clear create page state on logout:', error)
        }
      }
    }
  }, [storageKey])

  const clearPersistence = useCallback(() => {
    if (!storageKey) return
    try {
      localStorage.removeItem(storageKey)
    } catch (error) {
      console.warn('Failed to clear create page state:', error)
    }
  }, [storageKey])

  return { clearPersistence }
}
