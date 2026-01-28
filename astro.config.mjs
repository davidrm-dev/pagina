import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'

export default defineConfig({
  site: undefined,
  srcDir: 'src',
  integrations: [tailwind()],
})
