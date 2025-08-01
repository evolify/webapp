import Store from "@evolify/tiny/store"
import { copy as copyText, startViewTransition } from "@/utils"
import { pickColor as _pickColor } from "@/utils/color"

const COLOR_HISTORY_KEY = "color-history"

function readHistory(): string[] {
  if (typeof window === "undefined") {
    return []
  }
  return JSON.parse(window.localStorage.getItem(COLOR_HISTORY_KEY) || "[]")
}

function saveHistory(history: string[]) {
  window.localStorage.setItem(COLOR_HISTORY_KEY, JSON.stringify(history))
}

const initStore = {
  history: [] as string[],
  current: "",
}

const store = new Store(initStore)

export function initHistory() {
  store.update({ history: readHistory() })
}

export function copy(color: string, addToHistory = true) {
  copyText(color)
  startViewTransition(() => {
    store.update({ current: color })
    if (addToHistory) {
      addHistory(color)
    }
  })
}

export function addHistory(color: string) {
  store.update(state => {
    const history = [color].concat(state.history).slice(0, 24)
    saveHistory(history)
    return {
      history,
    }
  })
}

export function clearHistory() {
  store.update({ history: [] })
}

export const useStore = store.use

export async function pickColor() {
  const color = await _pickColor()
  if (color) {
    copy(color)
  }
  return color
}
