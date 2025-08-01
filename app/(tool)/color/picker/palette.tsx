import { Card } from "@/components/ui/card"

export default function Palette() {
  return (
    <Card className="p-1">
      <div
        className="h-full aspect-square rounded-full cursor-pointer"
        style={{
          background:
            "conic-gradient(red, yellow, lime, cyan, blue, magenta, red)",
        }}
      ></div>
    </Card>
  )
}
