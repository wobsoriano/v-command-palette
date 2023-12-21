import { useMagicKeys } from '@vueuse/core'
import { watch } from 'vue'
import type { Command } from './useSearch'

export function useHotkeys(commands: Command[], options?: { onCommand?: () => void }) {
  const keys = useMagicKeys()

  commands.forEach((command) => {
    if (!command.shortcut)
      return

    watch(keys[command.shortcut.join('+')], (v) => {
      if (v) {
        command.command?.()
        options?.onCommand?.()
      }
    })
  })
}
