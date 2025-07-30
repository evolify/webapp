import { DatePicker } from "@/components/date-picker"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { useMemo, useState } from "react"

interface Props {
  from: Date | undefined
}

function diffInDays(from: Date, to: Date) {
  return Math.floor((to.getTime() - from.getTime()) / (1000 * 60 * 60 * 24))
}

function diffInMonths(to: Date, from: Date) {
  const fromYear = from.getFullYear()
  const fromMonth = from.getMonth()
  const fromDay = from.getDate()
  const toYear = to.getFullYear()
  const toMonth = to.getMonth()
  const toDay = to.getDate()
  let months = (toYear - fromYear) * 12 + (toMonth - fromMonth)
  let days = toDay - fromDay
  if (toDay < fromDay) {
    months--
    days = 30 + days
  }
  return [months, days]
}

export function CalcDays({ from }: Props) {
  const [to, setTo] = useState<Date | undefined>(undefined)

  const days = useMemo(() => {
    if (!from || !to) return 0
    return diffInDays(from, to)
  }, [from, to])

  const monthDiff = useMemo(() => {
    if (!from || !to) return [0, 0]
    return diffInMonths(to, from)
  }, [from, to])

  const weekDiff = useMemo(() => {
    if (!days) return [0, 0]
    const weeks = Math.floor(days / 7)
    const restDays = days % 7
    return [weeks, restDays]
  }, [days])

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>计算天数</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-row gap-2">
          <Label htmlFor="date">当前日期</Label>
          <DatePicker id="date" value={to} onChange={setTo} />
        </div>
        <div className="flex flex-row gap-2 mt-4">
          <span>相差：</span>
          <span>{days} 天</span>
          {weekDiff[0] > 0 && (
            <>
              <span> = </span>
              <span>
                {weekDiff[0]} 周 {weekDiff[1]} 天
              </span>
            </>
          )}
          {monthDiff[0] > 0 && (
            <>
              <span> = </span>
              <span>
                {monthDiff[0]} 月 {monthDiff[1]} 天
              </span>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
