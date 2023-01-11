// import "uno.css"

import type { AppProps } from "next/app"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="app">
      <h1 className="text-yellow">app</h1>
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
