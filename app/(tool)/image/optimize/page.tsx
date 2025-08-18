"use client"

import { useState, useRef, useMemo } from "react"
import { ImagePicker } from "@/components/image-picker"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import ReactCrop, {
  type Crop,
  PixelCrop,
  centerCrop,
  makeAspectCrop,
} from "react-image-crop"
import "react-image-crop/dist/ReactCrop.css"
import { Download, Loader, Scissors, Percent, CropIcon } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { cn } from "@/lib/utils"

function formatBytes(bytes: number, decimals = 2) {
  if (bytes === 0) return "0 Bytes"
  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i]
}

const qualityOptions = Array.from({ length: 9 }, (_, i) => (i + 1) * 10)

export default function CropperPage() {
  const [file, setFile] = useState<File | null>(null)
  const [sourceUrl, setSourceUrl] = useState("")
  const imgRef = useRef<HTMLImageElement | null>(null)
  const [crop, setCrop] = useState<Crop>()
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>()
  const [outputUrl, setOutputUrl] = useState("")
  const [outputSize, setOutputSize] = useState(0)
  const [outputFormat, setOutputFormat] = useState("webp")
  const [quality, setQuality] = useState(70)
  const [isLoading, setIsLoading] = useState(false)
  const [isCropping, setIsCropping] = useState(false)
  const [sourceWidth, setSourceWidth] = useState(0)
  const [sourceHeight, setSourceHeight] = useState(0)

  function updateSourceUrl(url: string) {
    if (sourceUrl) {
      URL.revokeObjectURL(sourceUrl)
    }
    setSourceUrl(url)
  }

  const onSelect = (file: File) => {
    setFile(file)
    setCrop(undefined)
    setCompletedCrop(undefined)
    setOutputUrl("")
    setOutputSize(0)
    setIsCropping(false)
    updateSourceUrl(URL.createObjectURL(file))
  }

  function onLoad(e: React.SyntheticEvent<HTMLImageElement, Event>) {
    const img = e.target as HTMLImageElement
    setSourceWidth(img.naturalWidth)
    setSourceHeight(img.naturalHeight)
  }

  const toggleCropping = () => {
    const shouldEnable = !isCropping
    setIsCropping(shouldEnable)
    const sourceImage = imgRef.current
    if (shouldEnable && sourceImage) {
      const { width, height } = sourceImage
      const initialCrop = centerCrop(
        makeAspectCrop({ unit: "%", width: 90 }, 1, width, height),
        width,
        height
      )
      setCrop(initialCrop)
    } else {
      setCrop(undefined)
      setCompletedCrop(undefined)
    }
  }

  function onProcess() {
    if (!imgRef.current) {
      toast.error("Please select an image first.")
      return
    }
    if (isCropping && !completedCrop) {
      toast.error("Please select a crop area first.")
      return
    }
    setIsLoading(true)
    const useCrop = isCropping && completedCrop

    const image = imgRef.current
    const canvas = document.createElement("canvas")
    const { naturalWidth, naturalHeight } = image

    const scaleX = image.naturalWidth / image.width
    const scaleY = image.naturalHeight / image.height

    canvas.width = useCrop ? completedCrop.width : naturalWidth
    canvas.height = useCrop ? completedCrop.height : naturalHeight

    const ctx = canvas.getContext("2d")

    if (!ctx) {
      toast.error("Could not get canvas context.")
      setIsLoading(false)
      return
    }

    if (useCrop) {
      ctx.drawImage(
        image,
        completedCrop.x * scaleX,
        completedCrop.y * scaleY,
        completedCrop.width * scaleX,
        completedCrop.height * scaleY,
        0,
        0,
        completedCrop.width,
        completedCrop.height
      )
    } else {
      ctx.drawImage(
        image,
        0,
        0,
        naturalWidth,
        naturalHeight,
        0,
        0,
        naturalWidth,
        naturalHeight
      )
    }

    canvas.toBlob(
      blob => {
        if (blob) {
          setOutputUrl(URL.createObjectURL(blob))
          setOutputSize(blob.size)
          toast.success("Image processed successfully!")
        } else {
          toast.error("Failed to create blob from canvas.")
        }
        setIsLoading(false)
      },
      `image/${outputFormat}`,
      quality
    )
  }

  const compressionRatio = useMemo(() => {
    if ((file?.size || 0) > 0 && outputSize > 0) {
      return (((file?.size || 0) - outputSize) / (file?.size || 0)) * 100
    }
    return 0
  }, [file, outputSize])

  return (
    <div>
      <div className="flex items-center">
        <Button
          onClick={toggleCropping}
          variant={isCropping ? "secondary" : "outline"}
          className=""
        >
          <CropIcon className="mr-2 h-4 w-4" />
          {isCropping ? "Disable Crop" : "Enable Crop"}
        </Button>

        {isCropping && (
          <>
            <div className="flex gap-2">
              <Label>Width</Label>
              <Input
                type="number"
                value={Math.round(completedCrop?.width || 0)}
                className="w-24"
                onChange={e =>
                  completedCrop &&
                  setCrop({
                    ...crop!,
                    width:
                      (Number(e.target.value) / (imgRef.current?.width || 1)) *
                      100,
                  })
                }
              />
            </div>
            <div className="flex  gap-2">
              <Label>Height</Label>
              <Input
                type="number"
                className="w-24"
                value={Math.round(completedCrop?.height || 0)}
                onChange={e =>
                  completedCrop &&
                  setCrop({
                    ...crop!,
                    height:
                      (Number(e.target.value) / (imgRef.current?.height || 1)) *
                      100,
                  })
                }
              />
            </div>
          </>
        )}

        <div className="ml-auto">Format</div>
        <ToggleGroup
          type="single"
          value={outputFormat}
          onValueChange={setOutputFormat}
          variant="outline"
          className="ml-2"
        >
          <ToggleGroupItem value="webp">WebP</ToggleGroupItem>
          <ToggleGroupItem value="png">PNG</ToggleGroupItem>
          <ToggleGroupItem value="jpeg">JPEG</ToggleGroupItem>
        </ToggleGroup>

        <div className="ml-4">Quality</div>
        <Select
          value={quality.toString()}
          onValueChange={value => setQuality(Number(value))}
        >
          <SelectTrigger className="w-24 ml-2">
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
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-4">
        {/* Left Card */}
        <Card className="flex flex-col p-0 gap-0">
          <div className="relative">
            <ImagePicker className="h-150 border-none" onChange={onSelect} />
            {sourceUrl && (
              <ReactCrop
                crop={crop}
                onChange={(_, percentCrop) => setCrop(percentCrop)}
                onComplete={c => setCompletedCrop(c)}
                className={cn(
                  "absolute! top-0 left-0 w-full h-full bg-card",
                  !isCropping && "z-[-1]"
                )}
              >
                <img
                  ref={imgRef}
                  src={sourceUrl}
                  alt="Source"
                  className="h-150 mx-auto"
                  onLoad={onLoad}
                />
              </ReactCrop>
            )}
          </div>
          <div className="p-2 border-t flex items-center gap-4">
            {file && (
              <span className="text-center text-sm text-muted-foreground">
                Original Size: <strong>{formatBytes(file?.size)}</strong>
              </span>
            )}
            {sourceWidth && sourceHeight && (
              <span className="text-center text-sm text-muted-foreground">
                <strong>
                  {sourceWidth} x {sourceHeight}
                </strong>
              </span>
            )}
            <Button
              onClick={onProcess}
              disabled={isLoading}
              variant="outline"
              className="ml-auto"
            >
              {isLoading ? (
                <>
                  <Loader className="mr-2 h-4 w-4 animate-spin" /> Processing...
                </>
              ) : (
                <>
                  <Scissors className="mr-2 h-4 w-4" /> Process Image
                </>
              )}
            </Button>
          </div>
        </Card>

        {/* Right Card */}
        <Card className="flex flex-col p-0 gap-0">
          <div className="h-150 flex flex-col justify-center items-center">
            {outputUrl ? (
              <img
                src={outputUrl}
                alt="Output Preview"
                className="object-contain max-w-full h-150 mx-auto my-auto"
              />
            ) : (
              <p className="text-muted-foreground">Processed Image Preview</p>
            )}
          </div>
          <div className="p-2 border-t flex items-center gap-4">
            {outputSize > 0 && (
              <div className="text-center text-sm text-muted-foreground">
                <span>
                  Output Size: <strong>{formatBytes(outputSize)}</strong>
                </span>
                <span className="text-green-600">
                  (-{compressionRatio.toFixed(2)}%)
                </span>
              </div>
            )}
            {outputUrl && (
              <a
                href={outputUrl}
                download={`processed_${
                  file?.name.split(".")[0] || "image"
                }.${outputFormat}`}
                className="ml-auto"
              >
                <Button variant="outline" className="w-full">
                  <Download className="mr-2 h-4 w-4" /> Download
                </Button>
              </a>
            )}
          </div>
        </Card>
      </div>
    </div>
  )
}
