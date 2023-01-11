// unocss.config.ts
import { defineConfig, presetIcons, presetUno } from "unocss"

export default defineConfig({
  presets: [
    presetUno(),
    presetIcons({
      cdn: "https://esm.sh/",
    }),
  ],
})
