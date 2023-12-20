<script setup lang="ts">
import { VCommandPalette, createCommand } from '@/.'

const actions = [
  createCommand({
    id: 'home',
    title: 'Home',
    icon: 'mdi-home',
    command() {
      console.log(123)
    },
    section: 'Basics',
    shortcut: ['a', 'b'],
  }),
  createCommand({
    id: 'docs',
    title: 'Docs',
    icon: 'mdi-book',
    command() {
      console.log(123)
    },
    // section: 'Basics',
    shortcut: ['b', 'd'],
  }),
  createCommand({
    id: 'readme',
    title: 'ReadNe',
    icon: 'mdi-book',
    command() {
      console.log(456)
    },
    section: 'Others',
    shortcut: ['h', 'i'],
  }),
  createCommand({
    title: 'Hoe',
    icon: 'mdi-book',
    command() {
      console.log(456)
    },
    section: 'Others',
  }),
]
</script>

<template>
  <v-app>
    <v-main>
      <VCommandPalette :commands="actions" />
    </v-main>
  </v-app>
</template>
