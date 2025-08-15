"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { CornerDownRight, Download, Loader } from "lucide-react"
import { ImagePicker } from "@/components/image-picker"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select"
import { SelectValue } from "@radix-ui/react-select"

const qualityOptions = Array.from({ length: 9 }, (_, i) => (i + 1) * 10)

function formatBytes(bytes: number, decimals = 2) {
  if (bytes === 0) return "0 Bytes"
  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i]
}

export default function WebpConverterPage() {
  const [originalFile, setOriginalFile] = useState<File | null>(null)
  const [originalSize, setOriginalSize] = useState(0)
  const [webpUrl, setWebpUrl] = useState<string | null>(null)
  const [webpSize, setWebpSize] = useState(0)
  const [quality, setQuality] = useState(70)
  const [isLoading, setIsLoading] = useState(false)

  const handleImageChange = (file: File) => {
    setOriginalFile(file)
    setOriginalSize(file.size)
    setWebpUrl(null)
    setWebpSize(0)
  }

  const handleConvert = () => {
    if (!originalFile) {
      toast.error("Please select a file first.")
      return
    }
    setIsLoading(true)

    const reader = new FileReader()
    reader.onload = event => {
      const img = new Image()
      img.onload = () => {
        const canvas = document.createElement("canvas")
        canvas.width = img.width
        canvas.height = img.height
        const ctx = canvas.getContext("2d")
        if (ctx) {
          ctx.drawImage(img, 0, 0)
          const webpDataUrl = canvas.toDataURL("image/webp", quality / 100)
          setWebpUrl(webpDataUrl)

          // Calculate WebP size
          const base64 = webpDataUrl.split(",")[1]
          const byteLength = atob(base64).length
          setWebpSize(byteLength)

          toast.success("Conversion successful!")
        } else {
          toast.error("Could not get canvas context.")
        }
        setIsLoading(false)
      }
      img.onerror = () => {
        toast.error("Failed to load image.")
        setIsLoading(false)
      }
      img.src = event.target?.result as string
    }
    reader.onerror = () => {
      toast.error("Failed to read file.")
      setIsLoading(false)
    }
    reader.readAsDataURL(originalFile)
  }

  const compressionRatio =
    originalSize > 0 && webpSize > 0
      ? ((originalSize - webpSize) / originalSize) * 100
      : 0

  return (
    <div>
      <div className="flex gap-4">
        {/* Left Column */}
        <Card className="flex flex-col gap-0 p-0 w-0 flex-1">
          <ImagePicker
            onChange={handleImageChange}
            className="h-100 border-none"
          />

          <Separator />

          <div className="flex items-center p-2 gap-2">
            {originalSize > 0 && (
              <p className="text-center text-sm text-muted-foreground">
                Original Size: <strong>{formatBytes(originalSize)}</strong>
              </p>
            )}

            <Select value={quality.toString()} onValueChange={value => setQuality(Number(value))}>
              <SelectTrigger className="ml-auto">
                <SelectValue placeholder="Select a quality" />
              </SelectTrigger>
              <SelectContent>
                {qualityOptions.map(option => (
                  <SelectItem key={option} value={option.toString()}>
                    {option} %
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              onClick={handleConvert}
              disabled={!originalFile || isLoading}
              variant="outline"
            >
              {isLoading ? (
                <>
                  <Loader className="mr-2 h-4 w-4 animate-spin" /> Converting...
                </>
              ) : (
                <>
                  <CornerDownRight />
                  Convert
                </>
              )}
            </Button>
          </div>
        </Card>

        {/* Right Column */}
        <Card className="flex flex-col gap-0 p-0 w-0 flex-1">
          <div className="flex items-center justify-center h-100 bg-muted/40">
            {webpUrl ? (
              <img
                src={webpUrl}
                alt="WebP Preview"
                className="object-contain max-w-full max-h-full"
              />
            ) : (
              <p className="text-muted-foreground">WebP Preview</p>
            )}
          </div>

          <Separator />

          <div className="flex items-center p-2">
            {webpSize > 0 && (
              <p className="text-center text-sm text-muted-foreground">
                WebP Size: <strong>{formatBytes(webpSize)}</strong>
                <span className="text-green-600">
                  (-{compressionRatio.toFixed(2)}%)
                </span>
              </p>
            )}

            {webpUrl && (
              <a
                href={webpUrl}
                download={`${
                  originalFile?.name.split(".")[0] || "converted"
                }.webp`}
                className="ml-auto"
              >
                <Button variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
              </a>
            )}
          </div>
        </Card>
      </div>

      <div className="flex gap-4"></div>
    </div>
  )
}
