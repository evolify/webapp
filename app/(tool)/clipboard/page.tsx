"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { ClipboardCard } from "./components/clipboard-card"
import type { ClipboardItem } from "./types"
import { toast } from "sonner"
import HeaderRight from "../components/header-right"
import { startViewTransition } from "@/utils"

const LOCAL_STORAGE_KEY = "clipboard-history"

export default function ClipboardPage() {
  const [items, setItems] = useState<ClipboardItem[]>([])

  const add = useCallback((type: "text" | "image", content: string) => {
    startViewTransition(()=> {
      setItems(prev =>
        prev.concat({
        timestamp: Date.now(),
        type,
          content,
        })
      )
    })
  }, [])

  useEffect(() => {
    try {
      const savedItems = localStorage.getItem(LOCAL_STORAGE_KEY)
      if (savedItems) {
        setItems(JSON.parse(savedItems))
      }
    } catch (error) {
      console.error("Failed to load items from localStorage", error)
      toast.error("无法从本地存储加载历史记录。")
    }
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items))
    } catch (error) {
      console.error("Failed to save items to localStorage", error)
      toast.error("无法将历史记录保存到本地存储。")
    }
  }, [items])

  const onPaste = useCallback(async () => {
    try {
      const clipboardItems = await navigator.clipboard.read()
      let done = false

      for (const clipboardItem of clipboardItems) {
        if (
          clipboardItem.types.includes("image/png") ||
          clipboardItem.types.includes("image/jpeg")
        ) {
          const imageType = clipboardItem.types.find(t =>
            t.startsWith("image/")
          )!
          const blob = await clipboardItem.getType(imageType)
          const reader = new FileReader()
          reader.onloadend = () => {
            const base64data = reader.result as string
            add("image", base64data)
            toast.success("图片已粘贴")
            done = true
          }
          reader.readAsDataURL(blob)
          return // Handle one item at a time for simplicity
        } else if (clipboardItem.types.includes("text/plain")) {
          const text = await (await clipboardItem.getType("text/plain")).text()
          add("text", text)
          toast.success("文本已粘贴")
          done = true
          return // Handle one item at a time
        }
      }
      if (!done) {
        toast.info("剪贴板中没有支持的内容（文本或图片）。")
      }
    } catch (err) {
      console.error("Failed to read clipboard contents: ", err)
      toast.error("读取剪贴板失败。请检查浏览器权限。")
    }
  }, [])

  const onDelete = useCallback((timestamp: number) => {
    startViewTransition(()=> {
      setItems(prev => prev.filter(item => item.timestamp !== timestamp))
    })
    toast.success("项目已删除")
  }, [])

  const onCopy = useCallback(async (item: ClipboardItem) => {
    try {
      if (item.type === "text") {
        await navigator.clipboard.writeText(item.content)
        toast.success("文本已复制到剪贴板")
      } else if (item.type === "image") {
        const response = await fetch(item.content)
        const blob = await response.blob()
        await navigator.clipboard.write([
          new ClipboardItem({ [blob.type]: blob }),
        ])
        toast.success("图片已复制到剪贴板")
      }
    } catch (err) {
      console.error("Failed to copy: ", err)
      toast.error("复制失败")
    }
  }, [])

  const onClearAll = useCallback(() => {
    setItems([])
    toast.success("所有项目已清除")
  }, [])

  const onChange = useCallback((timestamp: number, content: string) => {
    startViewTransition(()=> {
      setItems(prev => prev.map(item => item.timestamp === timestamp ? { ...item, content } : item))
    })
  }, [])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "v") {
        event.preventDefault()
        onPaste()
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [onPaste])

  return (
    <div className="container mx-auto">
      <HeaderRight>
        <Button variant="outline" onClick={onPaste}>
          粘贴 ⌘+V
        </Button>
        <Button
          variant="outline"
          className="ml-4 text-red-700"
          onClick={onClearAll}
        >
          清空
        </Button>
      </HeaderRight>
      <div className="grid auto-rows-[200px] [grid-template-columns:repeat(auto-fill,minmax(268px,1fr))] gap-4">
        {items.map(item => (
          <ClipboardCard
            key={item.timestamp}
            item={item}
            onDelete={onDelete}
            onCopy={onCopy}
            onChange={val => onChange(item.timestamp, val)}
          />
        ))}
      </div>
      {items.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <p>这里空空如也。</p>
          <p>点击“从剪贴板粘贴”或使用 Command/Ctrl + V 添加内容。</p>
        </div>
      )}
    </div>
  )
}
