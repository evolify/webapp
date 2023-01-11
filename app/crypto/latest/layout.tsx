"use client"
import {
  createTheme,
  CssBaseline,
  ThemeProvider,
  useMediaQuery,
} from "@mui/material"
import React from "react"
import "./style.scss"

export default function Layout({
  children,
}: React.ComponentPropsWithoutRef<any>) {
  const darkMode = useMediaQuery("(prefers-color-scheme: dark)")
  function color(light: string, dark: string) {
    return darkMode ? dark : light
  }
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? "dark" : "light",
          background: {
            default: color("#f7f7f7", "#000"),
          },
        },
      }),
    [darkMode]
  )
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  )
}
