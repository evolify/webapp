declare module "@mui/material/styles" {
  interface Theme {
    background: {
      wallet: string
    }
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    background?: {
      wallet?: string
    }
  }
}
