<script setup lang="ts">
import Logo from '../assets/logo.svg'
import { useCommandPalette } from '@/.'

const { open } = useCommandPalette()

function getShortcut() {
  const isMacLike = /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform)

  if (isMacLike)
    return '⌘+K'

  return 'Ctrl+K'
}
</script>

<template>
  <v-container class="fill-height">
    <v-responsive class="align-center text-center fill-height">
      <v-img height="300" :src="Logo" />

      <div class="text-body-2 font-weight-light mb-n1">
        A cmd+k component for Vuetify
      </div>

      <h1 class="text-h2 font-weight-bold">
        v-command-palette
      </h1>

      <div class="py-14" />

      <v-row class="d-flex align-center justify-center">
        <v-col cols="auto">
          <v-btn
            color="primary"
            size="x-large"
            variant="flat"
            @click="open"
          >
            Try it out (<kbd>{{ getShortcut() }}</kbd>)
          </v-btn>
        </v-col>

        <v-col cols="auto">
          <v-btn
            href="https://github.com/wobsoriano/v-command-palette"
            size="x-large"
            rel="noopener noreferrer"
            target="_blank"
            variant="text"
          >
            GitHub
          </v-btn>
        </v-col>
      </v-row>
    </v-responsive>
  </v-container>
</template>
