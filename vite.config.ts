import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import { VitePWA } from "vite-plugin-pwa"
import { resolve } from "path"

function getInput(...dirs: string[]) {
  const input = {
    main: "app/index.html",
  }
  dirs.forEach(t => {
    input[t] = `app/${t}/index.html`
  })
  return input
}

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      common: resolve("common/"),
    },
  },
  publicDir: resolve("public"),
  root: "app/",
  server: {
    port: 3000,
  },
  build: {
    outDir: resolve("dist"),
    rollupOptions: {
      input: getInput("crypto", "crypto/latest", "crypto/track", "crypto/arb"),
    },
  },
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: {
        enabled: true,
      },
      manifest: {
        name: "Crypto",
        short_name: "crypto",
        description: "My Crypto Webapp",
        theme_color: "#000000",
        start_url: "crypto/index.html",
        icons: [
          {
            src: "/icon.png",
            size: "120x120",
            type: "image/png",
          },
        ],
      },
    }),
  ],
})
