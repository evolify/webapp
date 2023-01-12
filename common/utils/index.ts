import { info } from "common/ui/alert"
import { createRoot } from "react-dom/client"

export function copy(str: string) {
  const input = document.createElement("input")
  input.value = str
  input.style.position = "fixed"
  input.style.bottom = "-100px"
  document.body.appendChild(input)
  input.select()
  document.execCommand("copy")
  document.body.removeChild(input)
  info("Copy to clipboard")
}

export function render(children: React.ReactNode) {
  const container = document.querySelector("#app")
  const root = createRoot(container!)
  root.render(children)
}
