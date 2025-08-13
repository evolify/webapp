import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useMemo, useState } from "react"
import { isNumber } from "@/utils"
import { formatDate } from "@/utils/format"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

interface Props {
  from: Date | undefined
}

export function CalcDate({ from }: Props) {
  const [days, setDays] = useState<number>(1)
  const [type, setType] = useState<"add" | "sub">("add")
  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value
    if (isNumber(value)) {
      setDays(Number(value))
    }
  }
  const to = useMemo(() => {
    if (!from) return undefined
    const diff = days * 24 * 60 * 60 * 1000
    const newDate =
      type === "add" ? from.getTime() + diff : from.getTime() - diff
    return formatDate(new Date(newDate))
  }, [from, days, type])
  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>计算日期</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-row gap-2">
          <Label htmlFor="days">天数</Label>
          <Input className="w-48" id="days" value={days} onChange={onChange} />
        </div>
        <div className="mt-4 flex flex-row items-center gap-2">
          <ToggleGroup
            type="single"
            value={type}
            variant="outline"
            onValueChange={value => setType(value as "add" | "sub")}
          >
            <ToggleGroupItem value="add">之后</ToggleGroupItem>
            <ToggleGroupItem value="sub">之前</ToggleGroupItem>
          </ToggleGroup>
          <div>
            <span>{to}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
