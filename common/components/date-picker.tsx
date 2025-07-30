"use client"

import * as React from "react"
import { CalendarIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface Props {
  value: Date | undefined
  onChange: (date: Date | undefined) => void
  id?: string
  placeholder?: string
}

function formatDate(date: Date) {
  const year = date.getFullYear()
  const month = date.getMonth()
  const day = date.getDate()
  return `${year}-${month}-${day}`
}

export function DatePicker(props: Props) {
  const { id, value, onChange, placeholder = "请选择日期" } = props
  const [open, setOpen] = React.useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          id={id}
          className="w-48 justify-between font-normal"
        >
          {value ? formatDate(value) : placeholder}
          <CalendarIcon className="size-3.5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto overflow-hidden p-0" align="start">
        <Calendar
          mode="single"
          selected={value}
          captionLayout="dropdown"
          onSelect={date => {
            onChange(date)
            setOpen(false)
          }}
        />
      </PopoverContent>
    </Popover>
  )
}
