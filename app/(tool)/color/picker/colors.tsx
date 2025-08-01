import { Card } from "@/components/ui/card"
import { colors } from "../colors/colors"
import { Color } from "../colors/types"
import { copy } from "./store"

type IColor = Color & { name: string }

const list = Object.entries(colors).reduce(
  (acc, [key, value]) =>
    acc.concat(value.map(color => ({ ...color, name: key }))),
  [] as IColor[]
)

export default function Colors() {
  function click(c: IColor) {
    copy(c.hex)
  }

  return (
    <Card className="p-1 flex-1 self-stretch">
      <div className="h-full grid grid-cols-11 gap-1 overflow-auto">
        {list.map(t => (
          <div
            key={t.name + t.scale}
            className="aspect-square cursor-pointer"
            onClick={() => click(t)}
            style={{ background: t.rgb }}
          ></div>
        ))}
      </div>
    </Card>
  )
}
