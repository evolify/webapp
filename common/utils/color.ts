declare class EyeDropper {
  open(): Promise<{ sRGBHex: string }>
}
declare global {
  interface Window {
    EyeDropper?: {
      new (): EyeDropper
    }
  }
}


export async function pickColor() {
  if (!window.EyeDropper) {
    console.warn("Your browser does not support the EyeDropper API")
    return null
  }
  const eyeDropper = new EyeDropper()
  try {
    const result = await eyeDropper.open()
    return result.sRGBHex
  } catch (e) {
    console.error(e)
    return null
  }
}
