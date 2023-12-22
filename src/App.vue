<script setup lang="ts">
import Main from './components/Main.vue'
import CommandPalette from './components/CommandPalette.vue'
</script>

<template>
  <v-app>
    <v-main>
      <CommandPalette>
        <Main />
      </CommandPalette>
    </v-main>
  </v-app>
</template>
