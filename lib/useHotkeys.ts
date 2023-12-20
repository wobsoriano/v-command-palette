import { useMagicKeys } from '@vueuse/core'
import { watch } from 'vue'
import { Command } from './useSearch'

export function useHotkeys(commands: Command[]) {
  const keys = useMagicKeys()

  commands.forEach((command) => {
    if (!command.shortcut)
      return

    watch(keys[command.shortcut.join('+')], (v) => {
      if (v)
      command.perform()
    })
  })
}
