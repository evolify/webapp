"use client"
import Colors from "./colors"
import Palette from "./palette"
import Inspect from "./inspect"
import History from "./history"
import HeaderRight from "../../components/header-right"
import { useStore } from "./store"

export default function ColorPalette() {
  const current = useStore(state => state.current)
  return (
    <div className="flex flex-col gap-4">

      <HeaderRight>
        {
          current && (
            <div className="w-18 h-8 rounded-md" style={{backgroundColor: current}}></div>
          )
        }
      </HeaderRight>
      <div className="flex gap-4 h-120">
        <Palette />
        <Colors />
      </div>
      <Inspect />
      <History />
    </div>
  )
}
