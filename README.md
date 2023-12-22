# v-command-palette

A command palette for [Vuetify](https://next.vuetifyjs.com).

https://github.com/wobsoriano/v-command-palette/assets/13049130/cdb5e8c6-c373-4a2d-ad49-f5d1420d690c

## Installation

```bash
npm install v-command-palette
```

## Usage

Import the component at the root of your app

```vue
<script setup>
import { VCommandPalette, createCommand } from 'v-command-palette'

const commands = [
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
      <VCommandPalette :commands="commands" />
    </VMain>
  </VApp>
</template>
```

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| commands | `array` | `[]` | The list of commands to display. See the [`Command`](https://github.com/wobsoriano/v-command-palette/blob/e1ed365d227caeb6c1fa6222ebbb98f80cc8fff8/lib/useSearch.ts#L6) interface. |
| textFieldProps | `object` | `{}` | [VTextField props](https://vuetifyjs.com/en/api/v-text-field/#props) |
| dialogProps | `object` | `{}` | [VDIalog props](https://vuetifyjs.com/en/api/v-dialog/#props) |
| cardProps | `object` | `{}` | [VCard props](https://vuetifyjs.com/en/api/v-card/#props) |
| fuseOptions | `object` | `{}` | [Fuse.js options](https://www.fusejs.io/api/options.html) |

## Composables

- `useCommandPalette` - Programmaticaly open or close the dialog.

## License

MIT
