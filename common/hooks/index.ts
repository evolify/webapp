import { useEffect, useState } from "react"

// hook, 把状态设置为 true/ false 后，过一段时间后自动重置
export function useAutoToggle(delay = 1000, defaultValue = false) {
  const [state, setState] = useState<Boolean>(defaultValue)

  useEffect(() => {
    const timer = setTimeout(() => {
      setState(!state)
    }, delay)

    return () => {
      clearTimeout(timer)
    }
  }, [state, delay])

  function toggle(val?: Boolean) {
    setState(val ?? !state)
  }

  return [state, toggle] as const
}
