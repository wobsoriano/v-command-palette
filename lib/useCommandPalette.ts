import { inject } from 'vue'

export function useCommandPalette() {
  const methods = inject<{
    open: () => void
    close: () => void
  }>('VCommandPalette')

  if (!methods)
    throw new Error('Provider not found.')

  return methods
}
