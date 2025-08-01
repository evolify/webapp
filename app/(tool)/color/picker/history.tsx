"use client"
import { Card } from "@/components/ui/card"
import { clearHistory, copy, initHistory, useStore } from "./store"
import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { BrushCleaning } from "lucide-react"

export default function History() {
  const data = useStore(state => state.history)

  function click(color: string) {
    copy(color, false)
  }

  useEffect(()=> {
    initHistory()
  },[])

  return (
    <Card
      className="p-4 gap-4"
      style={{ viewTransitionName: "view-transition-history" }}
    >
      <div className="flex items-center justify-between">
        <h2>History</h2>
        <Button variant="ghost" onClick={clearHistory}>
          <BrushCleaning />
        </Button>
      </div>
      <div className="grid grid-cols-4 gap-2 md:grid-cols-6 lg:grid-cols-8">
        {data.map((item, index) => (
          <div
            key={index}
            className="h-16 flex flex-col justify-end rounded-md cursor-pointer"
            style={{ backgroundColor: item }}
            onClick={() => click(item)}
          >
            <span className="text-sm text-center text-white bg-black/50">
              {item}
            </span>
          </div>
        ))}
      </div>
    </Card>
  )
}
