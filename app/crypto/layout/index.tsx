import {
  createTheme,
  CssBaseline,
  ThemeProvider,
  useMediaQuery,
  Stack,
} from "@mui/material"
import Header from "./header"
import React, { useMemo } from "react"
import "./style.scss"

interface Props extends React.ComponentProps<any> {
  title: string
}

export default function Layout({ children, title }: Props) {
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
      <Stack px={1} pt="46px" pb={3}>
        <Header>{title}</Header>
        {children}
      </Stack>
    </ThemeProvider>
  )
}
