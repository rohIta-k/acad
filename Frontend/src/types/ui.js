/**
 * @typedef {'/' | '/setup' | '/create'} AppPath
 */

/**
 * @typedef {{ id: number, label: string }} StepItem
 */

/**
 * @typedef {{ id: string, label: string, icon: import('lucide-react').LucideIcon }} IconOption
 */

export const PATHS = Object.freeze({
  home: '/',
  setup: '/setup',
  create: '/create',
})
