// BCP 47 language codes
export const Languages = [
  { code: "zh", name: "简体中文" },
  { code: "en", name: "英语" },
  { code: "zh-Hant", name: "繁體中文" },
  { code: "en-US", name: "英语（美国）" },
  { code: "en-GB", name: "英语（英国）" },
  { code: "ja", name: "日语" },
  { code: "ko", name: "韩语" },
  { code: "es", name: "西班牙语" },
  { code: "es-ES", name: "西班牙语（西班牙）" },
  { code: "pt", name: "葡萄牙语" },
  { code: "pt-BR", name: "葡萄牙语（巴西）" },
  { code: "fr", name: "法语" },
  { code: "de", name: "德语" },
  { code: "ru", name: "俄语" },
  { code: "ar", name: "阿拉伯语" },
  { code: "hi", name: "印地语" },
  { code: "bn", name: "孟加拉语" },
  { code: "vi", name: "越南语" },
  { code: "id", name: "印尼语" },
  { code: "ms", name: "马来语" },
  { code: "th", name: "泰语" },
  { code: "it", name: "意大利语" },
  { code: "nl", name: "荷兰语" },
  { code: "sv", name: "瑞典语" },
  { code: "nb-NO", name: "挪威语（博克mål）" },
  { code: "da", name: "丹麦语" },
  { code: "fi", name: "芬兰语" },
  { code: "pl", name: "波兰语" },
  { code: "tr", name: "土耳其语" },
  { code: "he", name: "希伯来语" },
  { code: "uk", name: "乌克兰语" },
  { code: "cs", name: "捷克语" },
  { code: "el", name: "希腊语" },
  { code: "hu", name: "匈牙利语" },
  { code: "ro", name: "罗马尼亚语" },
  { code: "sk", name: "斯洛伐克语" },
  { code: "sl", name: "斯洛文尼亚语" },
  { code: "sr", name: "塞尔维亚语" },
  { code: "hr", name: "克罗地亚语" },
  { code: "lt", name: "立陶宛语" },
  { code: "lv", name: "拉脱维亚语" },
  { code: "et", name: "爱沙尼亚语" },
  { code: "fa", name: "波斯语（Farsi）" },
  { code: "ur", name: "乌尔都语" },
]

declare global {
  interface Window {
    Translator: any
    LanguageDetector: any
  }
}

export async function createTranslator(
  sourceLang: string,
  targetLang: string,
  onProgress?: (progress: number) => void
) {
  if (!window.Translator) {
    throw new Error("unsupported")
  }
  const translator = await window.Translator.create({
    sourceLanguage: sourceLang,
    targetLanguage: targetLang,
    monitor(m: any) {
      m.addEventListener("downloadprogress", (e: any) => {
        onProgress?.(e.loaded * 100)
      })
    },
  })
  return translator
}

export async function translate(
  text: string,
  translator: any
) {
  if (!translator) return ""
  const result = await translator.translate(text)
  return result
}

let detector: any = null
export async function detectLanguage(text: string) {
  if(!window.LanguageDetector){
    return
  }
  if(!detector){
    detector = await window.LanguageDetector.create()
  }
  const result = await detector.detect(text)
  return result[0].detectedLanguage
}
