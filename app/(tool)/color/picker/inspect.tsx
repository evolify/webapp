"use client"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Pipette } from "lucide-react"
import { useState } from "react"
import { pickColor } from "./store"

export default function Inspect() {
  const [bg, setBg] = useState("#222")
  const [fg, setFg] = useState("#eee")
  const [border, setBorder] = useState("#444")

  async function pickBg() {
    const color = await pickColor()
    if (color) {
      setBg(color)
    }
  }

  async function pickFg() {
    const color = await pickColor()
    if (color) {
      setFg(color)
    }
  }

  async function pickBorder() {
    const color = await pickColor()
    if (color) {
      setBorder(color)
    }
  }

  return (
    <Card className="p-4 gap-4">
      <div className="text-xl">Inspect Color</div>
      <div
        className="flex flex-col rounded-2xl p-5 gap-2"
        style={{
          background: bg,
          color: fg,
          border: `1px solid ${border}`,
        }}
      >
        <h1 className="text-2xl">Title</h1>
        <h2 className="text-xl">Subtitle</h2>
        <p>Click Background button to pick color for background</p>
        <p>Click Fackground button to pick color for fackground</p>
        <p>Click Border button to pick color for border</p>
      </div>
      <div className="flex gap-2">
        <Button className="w-0 flex-1" variant="outline" onClick={pickBg}>
          Background {bg}
          <Pipette />
        </Button>
        <Button className="w-0 flex-1" variant="outline" onClick={pickFg}>
          Foreground {fg}
          <Pipette />
        </Button>
        <Button className="w-0 flex-1" variant="outline" onClick={pickBorder}>
          Border {border}
          <Pipette />
        </Button>
      </div>
    </Card>
  )
}
