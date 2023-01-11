import { Alert, Slide } from "@mui/material"
import { createRoot, Root } from "react-dom/client"

let root: Root
function ensureRoot() {
  if (root) {
    return root
  }
  let container = document.querySelector(".alert-container")
  if (!container) {
    container = document.createElement("div")
    container.className = "alert-container"
    document.body.appendChild(container)
  }
  root = createRoot(container)
  return root
}

interface Props {
  children: string
  visible: boolean
}
function AlertModal({ children, visible }: Props) {
  return (
    <Slide direction="down" in={visible} mountOnEnter unmountOnExit>
      <Alert
        className="alert"
        sx={{
          position: "fixed",
          top: 20,
          left: 20,
          right: 20,
          zIndex: 900,
        }}
        security="info"
      >
        {children}
      </Alert>
    </Slide>
  )
}

export default function info(msg: string, duration = 2000) {
  const root = ensureRoot()
  root.render(<AlertModal visible={true}>{msg}</AlertModal>)
  setTimeout(() => {
    root.render(<AlertModal visible={false}>{msg}</AlertModal>)
  }, duration)
}
