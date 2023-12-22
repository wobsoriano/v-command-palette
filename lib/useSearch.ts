import type { IFuseOptions } from 'fuse.js'
import Fuse from 'fuse.js'
import type { ComputedRef, Ref } from 'vue'
import { computed, onMounted, ref, watch } from 'vue'

export interface Command {
  id?: string
  title: string
  subtitle?: string
  icon?: string
  shortcut?: string[]
  section?: string
  command?: () => void
  listItemProps?: Record<string, unknown>
}

export function createCommand(action: Command) {
  return action
}

interface Options<T> {
  fuseOptions?: IFuseOptions<T>
}

export function useSearch(search: Ref<string>, list: ComputedRef<Command[]>, options?: Options<Command>) {
  const result = ref<Command[]>(list.value)

  onMounted(() => {
    const fuse = new Fuse<Command>(list.value, {
      keys: ['title'],
      ...options?.fuseOptions,
    })

    watch(search, (pattern) => {
      if (!pattern) {
        result.value = list.value
        return
      }

      result.value = fuse.search(pattern).map(i => i.item)
    }, { immediate: false })
  })

  return result
}

export function useSortedActions(commands: Ref<Command[]>) {
  return computed(() => {
    const sections: Record<string, Command[]> = {}

    commands.value.forEach((item) => {
      if (!item.section) {
        if (sections.Uncategorized)
          sections.Uncategorized.push(item)
        else
          sections.Uncategorized = [item]

        return
      }

      if (sections[item.section])
        sections[item.section].push(item)
      else
        sections[item.section] = [item]
    })

    return sections
  })
}
