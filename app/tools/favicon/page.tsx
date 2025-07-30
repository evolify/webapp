"use client"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CopyIcon } from "lucide-react"
import { useMemo, useRef, useState } from "react"

function getHost(url: string) {
  if (/^https?:\/\//i.test(url)) {
    return new URL(url).host
  } else {
    return new URL("https://" + url).host
  }
}

export default function Favicon() {
  const [favicon, setFavicon] = useState<string>("")
  const [s2, setS2] = useState<string>("")
  const ref = useRef<HTMLInputElement>(null)

  function getFavicon() {
    const url = ref.current?.value
    if (!url) return
    try {
      const host = getHost(url)
      setFavicon(`https://favicon.im/${host}`)
      setS2(`https://www.google.com/s2/favicons?domain=${host}`)
    } catch (err) {
      console.error(err)
    }
  }

  function copy(url: string) {
    navigator.clipboard.writeText(url)
  }

  const list = useMemo(
    () =>
      favicon && s2
        ? [
            {
              title: "favicon.im",
              url: favicon,
            },
            {
              title: "Google",
              url: s2,
            },
          ]
        : [],
    [favicon, s2]
  )

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row items-center gap-2">
        <Label htmlFor="url" className="shrink-0">
          网站首页
        </Label>
        <Input id="url" ref={ref} />
        <Button variant="outline" onClick={getFavicon}>
          查看
        </Button>
      </div>

      {list.map(item => (
        <Card key={item.title} className="flex flex-row items-center gap-2 p-4">
          <div className="flex flex-col gap-2 flex-1">
            <div className="text-md font-bold text-gray-300">{item.title}</div>
            <div className="flex flex-row items-center gap-2 group h-8">
              <span>{favicon}</span>
              <Button
                variant="outline"
                size="sm"
                className="hidden group-hover:flex"
                onClick={() => copy(item.url)}
              >
                <CopyIcon />
              </Button>
            </div>
          </div>
          <img src={item.url} alt="favicon" className="w-16 h-16" />
        </Card>
      ))}
    </div>
  )
}
