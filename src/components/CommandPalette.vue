<script setup lang="ts">
import { useTheme } from 'vuetify'
import { VCommandPalette, createCommand } from '@/.'

const theme = useTheme()

const commands = [
  createCommand({
    id: 'home',
    title: 'Home',
    subtitle: 'Subtitles can make your commands more descriptive.',
    icon: 'mdi-home',
    command() {
      // eslint-disable-next-line no-console
      console.log(123)
    },
    section: 'Navigation',
    shortcut: ['a', 'b'],
  }),
  createCommand({
    id: 'docs',
    title: 'Docs',
    command() {
      window.open('https://github.com/wobsoriano/v-command-palette', '_blank')
    },
    section: 'Navigation',
    shortcut: ['g', 'd'],
  }),
  createCommand({
    id: 'x',
    title: 'Twitter',
    command() {
      window.open('https://x.com/wobsoriano', '_blank')
    },
    section: 'Navigation',
    shortcut: ['g', 't'],
  }),
  createCommand({
    id: 'github',
    title: 'GitHub',
    command() {
      window.open('https://github.com/wobsoriano/v-command-palette', '_blank')
    },
    section: 'Navigation',
    shortcut: ['g', 'h'],
  }),
  createCommand({
    id: 'theme',
    title: 'Change theme...',
    command() {
      theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
    },
    section: 'Preferences',
  }),
]
</script>

<template>
  <VCommandPalette :commands="commands">
    <slot />
  </VCommandPalette>
</template>
