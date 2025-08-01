"use client"
import { Check, Clipboard } from "lucide-react"
import { type ColorFormat, type Color } from "./types"
import { useMemo, useState } from "react"
import { copy } from "@/utils"

interface Props {
  name: string
  color: Color
  format: ColorFormat
}

function getForegroundFromBackground(rgb: string) {
  const [r, g, b] = rgb.split(" ").map(Number)

  function toLinear(number: number): number {
    const base = number / 255
    return base <= 0.04045
      ? base / 12.92
      : Math.pow((base + 0.055) / 1.055, 2.4)
  }

  const luminance =
    0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b)

  return luminance > 0.179 ? "#000" : "#fff"
}

export function Color(props: Props) {
  const { name, color, format } = props

  const [copied, setCopied] = useState(false)

  const fg = useMemo(() => getForegroundFromBackground(color.rgb), [color])
  const iconFg = useMemo(() => (color.scale > 500 ? "white" : "black"), [color])

  function click() {
    copy(color[format])
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
    }, 1500)
  }

  return (
    <button
      key={color.hex}
      className="group relative flex aspect-[3/1] w-full flex-1 cursor-pointer flex-col gap-2 text-(--text) sm:aspect-[2/3] sm:h-auto sm:w-auto [&>svg]:absolute [&>svg]:top-4 [&>svg]:right-4 [&>svg]:z-10 [&>svg]:h-3.5 [&>svg]:w-3.5 [&>svg]:opacity-0 [&>svg]:transition-opacity"
      style={
        {
          "--bg": `${color.rgb}`,
          "--text": fg,
          "--icon-fg": iconFg,
        } as React.CSSProperties
      }
      onClick={click}
    >
      {copied ? (
        <Check className="group-hover:opacity-100 bg-clip-content text-(--icon-fg)" />
      ) : (
        <Clipboard className="group-hover:opacity-100 bg-clip-content text-(--icon-fg)" />
      )}
      <div className="border-ghost after:border-input w-full flex-1 rounded-md bg-(--bg) after:rounded-lg md:rounded-lg" />
      <div className="flex w-full flex-col items-center justify-center gap-1">
        <span className="text-muted-foreground group-hover:text-foreground group-data-[last-copied=true]:text-primary font-mono text-xs tabular-nums transition-colors">
          {name}-{color.scale}
        </span>
      </div>
    </button>
  )
}
