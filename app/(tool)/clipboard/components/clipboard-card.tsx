import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { ClipboardItem } from "../types"
import { Copy, Download, Maximize, Minimize, Trash2 } from "lucide-react"
import dayjs from "dayjs"
import { useCallback, useState } from "react"
import { cn } from "@/lib/utils"
import { startViewTransition } from "@/utils"

interface ClipboardCardProps {
  item: ClipboardItem
  onDelete: (timestamp: number) => void
  onCopy: (item: ClipboardItem) => void
  onChange?: (content: string) => void
}

export default function ClipboardCard({
  item,
  onDelete,
  onCopy,
  onChange,
}: ClipboardCardProps) {
  const [preview, setPreview] = useState(false)

  function togglePreview() {
    startViewTransition(() => {
      setPreview(prev => !prev)
    })
  }

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    onChange && onChange(e.target.value)
  }

  // ⌘ + v in textarea will not trigger paste event
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "v") {
        e.stopPropagation()
      }
    },
    [onCopy, item]
  )

  function download() {
    const a = document.createElement("a")
    a.href = item.content
    a.download = `${item.timestamp}.png`
    a.click()
  }

  return (
    <Card
      style={{ viewTransitionName: `card-${item.timestamp}` }}
      className={cn(
        "group relative p-0 gap-0 overflow-hidden focus-within:border-orange-400",
        preview && "row-span-3 col-span-3 row-start-1 col-start-1"
      )}
    >
      <CardContent className="p-0 h-0 flex-1">
        {item.type === "text" ? (
          <textarea
            value={item.content}
            className="h-full w-full p-2 resize-none border-none outline-none whitespace-pre"
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
        ) : (
          <img
            src={item.content}
            alt="Pasted image"
            className={cn(
              "h-full w-full rounded-md object-cover",
              preview && "object-contain"
            )}
          />
        )}
      </CardContent>
      <CardFooter className="flex items-center p-0 border-t-1 opacity-70 hover:opacity-100">
        <span className="text-xs mr-auto mx-2 whitespace-nowrap">
          {dayjs(item.timestamp).format("YYYY-MM-DD HH:mm")}
        </span>
        {item.type === "image" && (
          <Button variant="ghost" size="icon" onClick={download}>
            <Download className="h-4 w-4" />
          </Button>
        )}
        <Button variant="ghost" size="icon" onClick={() => onCopy(item)}>
          <Copy className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onDelete(item.timestamp)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={togglePreview}>
          {preview ? <Minimize /> : <Maximize />}
        </Button>
      </CardFooter>
    </Card>
  )
}
