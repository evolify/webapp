"use client"
import { useEffect, useState } from "react"
import { createPortal } from "react-dom"

export default function HeaderRight({children}: React.PropsWithChildren) {
  const [container, setContainer] = useState<Element | null>()

  useEffect(()=> {
    setContainer(document.querySelector("#header-right"))
  }, [])

  if(!container) {
    return null
  }

  return createPortal(
    children,
    container
  )
}
