import { useEffect, useCallback } from 'react'

const STORAGE_KEY = 'create_page_state'

export function useCreatePagePersistence({
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
  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
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
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave))
    } catch (error) {
      console.warn('Failed to save create page state:', error)
    }
  }, [prompt, selectedFormat, selectedPlatform, duration, included, generationResult, hasGenerated])

  // Clear localStorage on unmount (tab close)
  useEffect(() => {
    return () => {
      // Optionally clear on unmount - comment out if you want persistence even after leaving page
      // localStorage.removeItem(STORAGE_KEY)
    }
  }, [])

  const clearPersistence = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch (error) {
      console.warn('Failed to clear create page state:', error)
    }
  }, [])

  return { clearPersistence }
}
