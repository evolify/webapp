import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Languages } from "../utils"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useMemo } from "react"

interface Props {
  value: string
  onChange: (value: string) => void
}

const commonLangs = Languages.slice(0, 3)
const otherLangs = Languages.slice(3)

export default function LangSelect({ value, onChange }: Props) {
  const isOther = useMemo(()=>otherLangs.some(t => t.code === value), [value])
  return (
    <div className="flex gap-2 mb-[-1]">
      {commonLangs.map(lang => {
        const isActive = value === lang.code
        return (
          <Button
            key={lang.code}
            variant={isActive ? "ghost" : "ghost"}
            className={cn("opacity-70 rounded-none", isActive && "opacity-100 border-b-white border-b-1")}
            onClick={() => onChange(lang.code)}
          >
            {lang.name}
          </Button>
        )
      })}

      <Select value={value} onValueChange={onChange}>
        <SelectTrigger
          className={cn("border-none bg-transparent! opacity-70", isOther && "opacity-100 rounded-none border-solid border-transparent border-b-1 border-b-white")}
          iconClassName="opacity-100"
        >
          {!isOther && "更多"}
          <SelectValue placeholder="Select a language" />
        </SelectTrigger>
        <SelectContent>
          {otherLangs.map(lang => (
            <SelectItem key={lang.code} value={lang.code}>
              {lang.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
