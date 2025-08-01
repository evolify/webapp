export interface Color {
  scale: number
  hex: string
  rgb: string
  hsl: string
  oklch: string
}

export type ColorFormat = "hex" | "rgb" | "hsl" | "oklch"
