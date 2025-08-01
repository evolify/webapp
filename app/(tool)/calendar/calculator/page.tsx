"use client"
import { DatePicker } from "@/components/date-picker"
import { Label } from "@/components/ui/label"
import React from "react"
import { CalcDays } from "./modules/calc-days"
import { CalcDate } from "./modules/calc-date"

const initialDate = new Date()
initialDate.setHours(0, 0, 0, 0)

export default function Calculator() {
  const [date, setDate] = React.useState<Date | undefined>(initialDate)
  return (
    <div>
      <div className="flex flex-row gap-2">
        <Label htmlFor="date">当前日期</Label>
        <DatePicker id="date" value={date} onChange={setDate} />
      </div>

      <CalcDays from={date} />

      <CalcDate from={date} />
    </div>
  )
}
