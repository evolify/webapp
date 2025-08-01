import type { Metadata } from "next"
import { Toaster } from "sonner"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import ToolLayout from "./(tool)/layout"
import { use } from "react"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Webapp",
  description: "Webapp",
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Toaster position="top-center" theme="dark" />
      </body>
    </html>
  )
}
