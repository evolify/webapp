export const isDev = process.env.NODE_ENV !== "production"

export async function copy(text: string) {
  try {
    await navigator.clipboard.writeText(text)
  } catch (err) {
    console.error(err)
  }
}

export function getQuery<T>(key: string, defaultValue?: T) {
  const urlParams = new URLSearchParams(window.location.search)
  return (urlParams.get(key) as T) || defaultValue
}

export function isNumber(value: string) {
  return !isNaN(Number(value))
}

export function startViewTransition(fn: () => void) {
  if (Boolean(document.startViewTransition)) {
    document.startViewTransition(fn)
  } else {
    fn()
  }
}

export function debounce(fn: (...args: any[]) => void, delay = 300) {
  let timer: NodeJS.Timeout
  let isFirst = true
  return (...args: any[]) => {
    if (isFirst) {
      isFirst = false
      fn(...args)
    } else {
      clearTimeout(timer)
      timer = setTimeout(() => fn(...args), delay)
    }
  }
}
