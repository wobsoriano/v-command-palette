import Fuse from 'fuse.js'
import { Ref, computed, onMounted, ref, watch } from 'vue'

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

export function useSearch(search: Ref<string>, list: Command[]) {
  const result = ref<Command[]>(list)

  onMounted(() => {
    const fuse = new Fuse<Command>(list, {
      keys: ['title']
    })

    watch(search, (pattern) => {
      if (!pattern) {
        result.value = list
        return
      }

      result.value = fuse.search(pattern).map((i) => i.item)
    }, { immediate: false })
  })

  return result
}

export function useSortedActions(commands: Ref<Command[]>) {
  return computed(() => {
    const sections: Record<string, Command[]> = {}

    commands.value.forEach((item) => {
      if (sections[item.section])
        sections[item.section].push(item)
      else
        sections[item.section] = [item]
    })

    return sections
  })
}
