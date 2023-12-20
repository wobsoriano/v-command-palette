<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useMagicKeys } from '@vueuse/core'
import {
  VCard,
  VCode,
  VDialog,
  VDivider,
  VIcon,
  VList,
  VListItem,
  VListSubheader,
  VTextField,
} from 'vuetify/components'
import { nanoid } from 'nanoid'
import { type Command, useSearch, useSortedActions } from './useSearch'
import { useHotkeys } from './useHotkeys'

const props = withDefaults(defineProps<{
  commands: Command[]
  noResultText?: string
  textFieldProps?: Record<string, unknown>
  cardProps?: Record<string, unknown>
  dialogProps?: Record<string, unknown>
}>(), {
  noResultText: 'No results found.',
})
const dialog = ref(false)
const search = ref('')

const commands = computed(() => props.commands.map((command) => {
  return {
    ...command,
    id: command.id || nanoid(5),
  }
}))
const matches = useSearch(search, commands)
const sortedCommands = useSortedActions(matches)

const keys = useMagicKeys()
watch([keys['Cmd+K'], keys['Ctrl+K']], ([cmd, ctrl]) => {
  if (cmd || ctrl)
    dialog.value = !dialog.value
})

useHotkeys(props.commands)

const activeIndex = ref(0)

const activeId = computed(() => matches.value[activeIndex.value]?.id ?? '')

function moveToItem(e: KeyboardEvent) {
  const numberOfItems = matches.value.length

  if (e.key === 'ArrowDown') {
    if (activeIndex.value < numberOfItems - 1) {
      e.preventDefault()
      activeIndex.value++
    }
  }

  if (e.key === 'ArrowUp') {
    if (activeIndex.value > 0) {
      e.preventDefault()
      activeIndex.value--
    }
  }

  if (e.key === 'Enter' && activeIndex.value >= 0) {
    e.preventDefault()
    matches.value[activeIndex.value].command?.()
  }
}

watch(search, () => {
  activeIndex.value = 0
})

watch(dialog, (value) => {
  if (!value) {
    activeIndex.value = 0
    search.value = ''
  }
})

const selected = computed(() => [activeId.value])

const inputRef = ref<InstanceType<typeof VTextField> | null>(null)
</script>

<template>
  <VDialog v-bind="dialogProps" v-model="dialog" max-width="600px" content-class="v-command-palette">
    <VCard v-bind="cardProps" max-height="450px">
      <VListItem class="px-0">
        <VTextField
          ref="inputRef"
          v-model="search"
          role="combobox"
          placeholder="Type a command or search..."
          variant="solo"
          single-line
          hide-details
          autofocus
          @keydown="moveToItem"
          v-bind="textFieldProps"
        />
      </VListItem>
      <VDivider />
      <VList slim mandatory :selected="selected" tabindex="-1">
        <VListItem v-if="matches.length === 0 && search.length > 0">
          {{ noResultText }}
        </VListItem>
        <template v-for="(value, section) in sortedCommands" v-else :key="section">
          <VListSubheader role="option">
            {{ section }}
          </VListSubheader>
          <VListItem v-for="item in value" :key="item.id" :ripple="false" :value="item.id" role="option" :title="item.title" @click="() => { inputRef?.focus(); item.command?.(); }">
            <template v-if="item.icon" #prepend>
              <VIcon>
                {{ item.icon }}
              </VIcon>
            </template>
            <template v-if="item.shortcut" #append>
              <VCode v-for="s in item.shortcut" :key="s" tag="kbd" class="mx-1">
                {{ s }}
              </VCode>
            </template>
          </VListItem>
        </template>
      </VList>
    </VCard>
  </VDialog>
</template>

<style scoped>
:deep(.v-command-palette) {
  position: absolute;
  top: 20%;
}
</style>
