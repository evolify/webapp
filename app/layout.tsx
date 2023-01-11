/* eslint-disable @next/next/no-head-element */
// import "styles/uno.css"
// import "styles/theme.css"
import "./style.scss"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <head></head>
      <body>{children}</body>
    </html>
  )
}
