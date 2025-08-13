"use client"

import { Card } from "@/components/ui/card"
import LangSelect from "./components/lang-select"
import { useCallback, useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { AlertCircleIcon, ArrowLeftRight, Clipboard, Copy } from "lucide-react"
import { createTranslator, detectLanguage, Languages, translate } from "./utils"
import { debounce, copy as _copy } from "@/utils"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { toast } from "sonner"

let translator: Promise<any> | null = null

async function getTranslator() {
  return await translator
}

export default function TranslatePage() {
  const [text, setText] = useState<string>("")
  const [result, setResult] = useState<string>("")
  const [sourceLang, setSourceLang] = useState("en")
  const [targetLang, setTargetLang] = useState("zh")
  const [progress, setProgress] = useState(-1)
  const [error, setError] = useState<string>("")
  const [timing, setTiming] = useState<number>(0)

  function swap() {
    const temp = sourceLang
    setSourceLang(targetLang)
    setTargetLang(temp)
    setText(result)
  }

  const onTextChange = useCallback(
    debounce(async val => {
      // 自动检测语言
      const lang = await detectLanguage(val)
      if (lang && lang !== sourceLang && Languages.some(l => l.code === lang)) {
        setSourceLang(lang)
        if (targetLang === lang) {
          const target = Languages.find(l => l.code !== lang)
          if (target) {
            setTargetLang(target.code)
          }
        }
      } else {
        doTranslate(val)
      }
    }, 500),
    [translator]
  )

  const doTranslate = useCallback(
    debounce(async (text: string) => {
      setResult("")
      if (text && translator) {
        const start = performance.now()
        const res = await translate(text, await getTranslator())
        setResult(res)
        setTiming(performance.now() - start)
      }
    }, 300),
    []
  )

  function updateTranslator(sourceLang: string, targetLang: string) {
    setError("")
    setProgress(-1)
    translator = createTranslator(sourceLang, targetLang, setProgress)
    translator
      .then(() => {
        setError("")
        setProgress(-1)
      })
      .catch(err => {
        console.error(err)
        setError((err as Error).message)
      })
    doTranslate(text)
  }

  // text 变化时，触发自动检测语言、翻译
  useEffect(() => {
    if (text) {
      onTextChange(text)
    }
  }, [text])

  // target、source 变化时，更新 translator
  useEffect(() => {
    updateTranslator(sourceLang, targetLang)
  }, [sourceLang, targetLang])

  // source 变化时，避免target 和 source 相同
  useEffect(() => {
    if (sourceLang === targetLang) {
      const target = Languages.find(l => l.code !== sourceLang)
      if (target) {
        setTargetLang(target.code)
      }
    }
  }, [sourceLang])

  function paste() {
    navigator.clipboard.readText().then(text => {
      setText(text)
    })
  }

  function copy() {
    if (!result) return
    _copy(result)
    toast.success("Copied to clipboard")
  }

  function renderContent() {
    if (error) {
      return (
        <Alert variant="destructive">
          <AlertCircleIcon />
          <AlertTitle>
            {error == "unsupported" ? "Unsupported" : "Load Model Failed"}
          </AlertTitle>
          <AlertDescription>
            {error === "unsupported"
              ? "Your browser does not support Translator API, please use latest Chrome."
              : error}
          </AlertDescription>
        </Alert>
      )
    }
    if (progress > 0 && progress < 100) {
      return (
        <div className="flex flex-col gap-2 items-center justify-center h-full">
          <div className="text-white text-sm">
            Model Downloading {progress.toFixed(2)}%
          </div>
          <Progress value={progress} />
        </div>
      )
    }
    return (
      <textarea
        rows={10}
        value={text}
        onChange={e => setText(e.target.value)}
        className="border-accent focus:outline-none h-full"
      />
    )
  }

  return (
    <div>
      <div className="flex gap-2 relative min-h-100">
        <Card className="flex-1 p-0 gap-0 focus-within:border-blue-900">
          <div className="flex items-center gap-2">
            <LangSelect value={sourceLang} onChange={setSourceLang} />
            <Button onClick={paste} variant="ghost" size="icon" className="ml-auto opacity-60 hover:opacity-100">
              <Clipboard />
            </Button>
          </div>
          <Separator className="" />
          <div className="p-2 flex-1 flex flex-col">{renderContent()}</div>
        </Card>

        <Button
          onClick={swap}
          variant="secondary"
          className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 z-20"
        >
          <ArrowLeftRight />
        </Button>

        <Card className="flex-1 p-0 gap-0">
          <div className="flex items-center gap-2">
            <LangSelect value={targetLang} onChange={setTargetLang} />
            <Button variant="ghost" size="icon" className="ml-auto opacity-60 hover:opacity-100">
              <Copy />
            </Button>
          </div>
          <Separator />
          <div onClick={copy} className="p-2 cursor-pointer h-full">{result}</div>
          {result && (
            <div className="text-sm text-gray-500 ml-2 mb-1">Translate cost:{timing.toFixed(2)}ms</div>
          )}
        </Card>
      </div>
    </div>
  )
}
