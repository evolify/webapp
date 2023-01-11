/* eslint-disable @next/next/no-head-element */
import ThemeToggle from "@/ui/theme_toggle"
import "./style.css"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="p-4 flex">
      <nav className="w-40 fixed inset-y-0 inset-x-0 bg-light-8">123</nav>
      <section className="flex-grow ml-40 page-content">
        <header className="text-black border-light-9 border font-bold rounded-xl p-4 flex items-center flex-row justify-between">
          {/* <div className="i-carbon-logo-github"></div> */}
          page header
          <ThemeToggle />
        </header>
        <article className="flex-1">{children}</article>
        <footer>page footer</footer>
      </section>
    </div>
  )
}
