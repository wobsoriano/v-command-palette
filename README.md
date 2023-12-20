# v-command-paletter

A command palette for [Vuetify](https://next.vuetifyjs.com).

Demo: https://vuetify-use-dialog.vercel.app

## Installation

```bash
npm install v-command-palette
```

## Usage

Import the component at the root of your app

```vue
<script setup lang="ts">
import { VCommandPalette, createCommand } from 'v-command-palette'

const actions = [
  createCommand({
    title: 'Home',
    icon: 'mdi-home',
    command() { /** do something */ },
    section: 'Navigation',
    shortcut: ['h'],
  }),
  createCommand({
    title: 'Docs',
    icon: 'mdi-book',
    command() { /** do something */ },
    section: 'Navigation',
    shortcut: ['g', 'd'],
  }),
]
</script>

<template>
  <VApp>
    <VMain>
      <VCommandPalette :commands="actions" />
    </VMain>
  </VApp>
</template>
```

## Props

Global options:

```ts
app.use(VuetifyUseDialog, {
  confirmDialog: {
    // useConfirm options
    title: 'Are you sure?'
  },
  snackbar: {
    // useSnackbar options
    snackbarProps: {
      timeout: 2000,
    }
  }
})
```

Looking for a stackable toast component? Check out [Vuetify Sonner](https://vuetify-sonner.vercel.app).

## License

MIT
