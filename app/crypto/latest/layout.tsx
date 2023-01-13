import {
  createTheme,
  CssBaseline,
  ThemeProvider,
  useMediaQuery,
} from "@mui/material"
import { useMemo } from "react"
import "./style.scss"

export default function Layout({
  children,
}: React.ComponentPropsWithoutRef<any>) {
  const darkMode = useMediaQuery("(prefers-color-scheme: dark)")
  function color(light: string, dark: string) {
    return darkMode ? dark : light
  }
  const theme = useMemo(
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

  console.log(theme)
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  )
}
