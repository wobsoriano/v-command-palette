<script setup lang="ts">
import { computed, ref, watch } from 'vue'
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
import { useSortedActions, useSearch, type Command } from './useSearch'
import { watchEffect } from 'vue';

const dialog = ref(true)
const search = ref('')

const props = defineProps<{
  commands: Command[]
}>()

const matches = useSearch(search, props.commands)
const sortedCommands = useSortedActions(matches)

const activeIndex = ref(0)

const activeId = computed(() => matches.value[activeIndex.value]?.id ?? '')

function moveToItem(e: KeyboardEvent) {
  const numberOfItems = matches.value.length;

  if (e.key === 'ArrowDown') {
    if (activeIndex.value < numberOfItems - 1) {
      activeIndex.value++;
      e.preventDefault();
    }
  }

  if (e.key === 'ArrowUp') {
    if (activeIndex.value > 0) {
      activeIndex.value--;
      e.preventDefault();
    }
  }

  if (e.key === 'Enter' && activeIndex.value >= 0) {
    e.preventDefault();
    matches.value[activeIndex.value].perform();
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

const inputRef = ref()
</script>

<template>
  <VDialog v-model="dialog" max-width="600px" content-class="v-command-palette">
    <VCard max-height="450px">
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
        />
      </VListItem>
      <VDivider />
      <VList slim mandatory :selected="selected" tabindex="-1">
        <VListItem v-if="matches.length == 0 && search.length > 0">
          Nothing found
        </VListItem>
        <template v-else v-for="(value, section) in sortedCommands" :key="section">
          <VListSubheader role="option">
            {{ section }}
          </VListSubheader>
          <VListItem :ripple="false" :value="item.id" v-for="item in value" :key="item.id" role="option" :title="item.title" @click="() => { item.perform(); inputRef?.focus(); }">
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
