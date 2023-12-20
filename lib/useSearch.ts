import Fuse, { FuseResult } from 'fuse.js'
import { ComputedRef, MaybeRef, computed, onMounted, ref, unref, watch } from 'vue'

export interface Command {
  id?: string
  title: string
  icon?: string
  shortcut?: string[]
  section: string
  perform: () => void
}

export function createCommand(action: Command) {
  return action
}

export function useSearch(search: MaybeRef<string>, list: MaybeRef<Command[]>) {
  const result = ref<Command[]>(unref(list))

  onMounted(() => {
    const fuse = new Fuse<Command>(unref(list), {
      keys: ['title']
    })

    watch(() => unref(search), (pattern) => {
      if (!pattern) {
        result.value = unref(list)
        return
      }

      result.value = fuse.search(pattern).map((i) => i.item)
    }, { immediate: false })
  })

  return result
}

export function useSortedActions(commands: MaybeRef<Command[]>) {
  return computed(() => {
    const sections: Record<string, Command[]> = {}

    unref(commands).forEach((item) => {
      if (sections[item.section])
        sections[item.section].push(item)
      else
        sections[item.section] = [item]
    })

    return sections
  })
}
