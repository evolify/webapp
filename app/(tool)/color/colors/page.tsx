"use client"
import HeaderRight from "../../components/header-right"
import { colorFormats, colors } from "./colors"
import { Color } from "./color"
import { useState } from "react"
import { ColorFormat } from "./types"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

export default function Page() {
  const [format, setFormat] = useState<ColorFormat>("rgb")

  return (
    <div className="flex flex-col gap-2">
      <HeaderRight>
        <ToggleGroup
          variant="outline"
          type="single"
          value={format}
          onValueChange={value => setFormat(value as ColorFormat)}
        >
          {colorFormats.map(t => (
            <ToggleGroupItem key={t} value={t}>
              {t}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </HeaderRight>

      {Object.entries(colors).map(([name, data]) => (
        <div key={name}>
          <div className="text-lg">{name}</div>
          <div className="mt-1 flex gap-2 overflow-x-scroll">
            {data.map(c => (
              <Color key={c.scale} name={name} color={c} format={format} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
