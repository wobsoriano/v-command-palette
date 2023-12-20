<script setup lang="ts">
import { VCommandPalette, createCommand } from '@/.'

const actions = [
  createCommand({
    id: 'home',
    title: 'Home',
    icon: 'mdi-home',
    perform() {
      console.log(123)
    },
    section: 'Basics',
    shortcut: ['a', 'b'],
  }),
  createCommand({
    id: 'docs',
    title: 'Docs',
    icon: 'mdi-book',
    perform() {
      console.log(123)
    },
    section: 'Basics',
    shortcut: ['b', 'd'],
  }),
  createCommand({
    id: 'readne',
    title: 'ReadNe',
    icon: 'mdi-book',
    perform() {
      console.log(456)
    },
    section: 'Others',
    shortcut: ['h', 'i'],
  }),
  createCommand({
    id: 'hoe',
    title: 'Hoe',
    icon: 'mdi-book',
    perform() {
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
