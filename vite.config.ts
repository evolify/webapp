import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import { VitePWA } from "vite-plugin-pwa"
import { resolve } from "path"

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      common: resolve("common/"),
    },
  },
  root: "app/",
  server: {
    port: 3000,
  },
  build: {
    outDir: resolve("dist"),
    rollupOptions: {
      input: {
        main: "app/index.html",
        crypto: "app/crypto/index.html",
        "crypto/latest": "app/crypto/latest/index.html",
      },
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
        name: "webapp",
        short_name: "app",
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
