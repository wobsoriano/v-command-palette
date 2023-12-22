<script setup lang="ts">
import { computed, provide, ref, watch } from 'vue'
import { useMagicKeys } from '@vueuse/core'
import {
  VBtn,
  VCard,
  VCode,
  VDialog,
  VIcon,
  VList,
  VListItem,
  VListSubheader,
  VTextField,
} from 'vuetify/components'
import { nanoid } from 'nanoid'
import type { IFuseOptions } from 'fuse.js'
import { type Command, useSearch, useSortedActions } from './useSearch'
import { useHotkeys } from './useHotkeys'
import type { ExtractProps } from './types'

interface Props {
  commands: Command[]
  noResultText?: string
  textFieldProps?: ExtractProps<typeof VTextField>
  cardProps?: ExtractProps<typeof VCard>
  dialogProps?: ExtractProps<typeof VDialog>
  fuseOptions?: IFuseOptions<Command>
}

defineOptions({
  inheritAttrs: false,
})
const props = withDefaults(defineProps<Props>(), {
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
const matches = useSearch(search, commands, { fuseOptions: props.fuseOptions })
const sortedCommands = useSortedActions(matches)

const keys = useMagicKeys()
watch([keys['Cmd+K'], keys['Ctrl+K']], ([cmd, ctrl]) => {
  if (cmd || ctrl)
    dialog.value = !dialog.value
})

useHotkeys(props.commands, {
  onCommandTriggered() {
    closeDialog()
  },
})

const activeIndex = ref(0)

const activeId = computed(() => matches.value[activeIndex.value]?.id ?? '')

function moveToItem(e: KeyboardEvent) {
  const numberOfItems = matches.value.length

  if (e.key === 'ArrowDown') {
    e.preventDefault()
    if (activeIndex.value < numberOfItems - 1)
      activeIndex.value++
  }

  if (e.key === 'ArrowUp') {
    e.preventDefault()
    if (activeIndex.value > 0)
      activeIndex.value--
  }

  if (e.key === 'Enter' && activeIndex.value >= 0) {
    matches.value[activeIndex.value].command?.()
    closeDialog()
  }
}

const selected = computed(() => [activeId.value])

const inputRef = ref<InstanceType<typeof VTextField> | null>(null)

function handleClick(command: Command) {
  inputRef.value?.focus()
  command.command?.()
  closeDialog()
}

function openDialog() {
  dialog.value = true
}

function closeDialog() {
  dialog.value = false
}

defineExpose({
  open: openDialog,
  close: closeDialog,
})

provide('VCommandPalette', {
  open: openDialog,
  close: closeDialog,
})
</script>

<template>
  <slot />
  <VDialog
    v-model="dialog"
    content-class="overflow-visible align-self-start mt-16"
    max-height="900"
    max-width="600"
    width="100%"
    v-bind="dialogProps"
    @after-leave="activeIndex = 0; search = ''"
  >
    <VCard v-bind="cardProps">
      <VTextField
        ref="inputRef"
        v-model="search"
        role="combobox"
        placeholder="Type a command or search..."
        single-line
        hide-details
        autofocus
        class="flex-grow-0"
        variant="filled"
        v-bind="textFieldProps"
        @keydown="moveToItem"
        @input="activeIndex = 0"
      >
        <template #append-inner>
          <VBtn border variant="text" size="small">
            <span class="text-caption text-disabled">Esc</span>
          </VBtn>
        </template>
      </VTextField>
      <VList slim mandatory :selected="selected" tabindex="-1">
        <VListItem v-if="matches.length === 0 && search.length > 0">
          {{ noResultText }}
        </VListItem>
        <template
          v-for="(value, section) in sortedCommands"
          v-else
          :key="section"
        >
          <VListSubheader role="option">
            {{ section }}
          </VListSubheader>
          <VListItem
            v-for="item in value"
            :key="item.id"
            :ripple="false"
            :value="item.id"
            role="option"
            :title="item.title"
            :subtitle="item.subtitle"
            :lines="item.subtitle ? 'two' : 'one'"
            v-bind="item.listItemProps"
            @click="handleClick(item)"
          >
            <template v-if="item.icon" #prepend>
              <VIcon>
                {{ item.icon }}
              </VIcon>
            </template>
            <template v-if="item.shortcut" #append>
              <VCode
                v-for="s in item.shortcut"
                :key="s"
                tag="kbd"
                class="mx-1"
              >
                {{ s }}
              </VCode>
            </template>
          </VListItem>
        </template>
      </VList>
    </VCard>
  </VDialog>
</template>
