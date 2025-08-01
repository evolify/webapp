import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Pipette } from "lucide-react"
import { pickColor } from "./store"

export default function Palette() {
  return (
    <Card className="p-1 relative">
      <div
        className="h-full aspect-square rounded-full cursor-pointer"
        style={{
          background:
            "conic-gradient(red, yellow, lime, cyan, blue, magenta, red)",
        }}
      ></div>
      <Button
        variant="ghost"
        className="absolute top-2 right-2"
        onClick={pickColor}
      >
        <Pipette />
      </Button>
    </Card>
  )
}
