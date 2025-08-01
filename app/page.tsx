import { menus } from "./config"
import Link from "next/link"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ArrowUpRight } from "lucide-react"

export default function Home() {
  // 扁平化工具列表，包括子项
  const flattenTools = (items: any[]) => {
    return items.reduce((acc: any[], item) => {
      if (item.children) {
        return [
          ...acc,
          ...item.children.map((child: any) => ({
            ...child,
            parentTitle: item.title,
          })),
        ]
      }
      return [...acc, item]
    }, [])
  }

  const allTools = flattenTools(menus)

  return (
    <div className="min-h-screen flex flex-col">
      {/* 头部区域 */}
      <header className="w-full py-16 bg-gradient-to-r from-primary/10 to-secondary/10 flex items-center justify-center">
        <div className="container px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">工具集</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            一站式解决您的各种工具需求，提高工作效率
          </p>
        </div>
      </header>

      {/* 工具展示区域 */}
      <main className="flex-1 container px-4 py-12">
        <h2 className="text-3xl font-bold mb-8">可用工具</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allTools.map((tool: any) => (
            <Link href={tool.url} key={tool.url}>
              <Card
                key={tool.url}
                className="group h-full relative overflow-hidden transition-all hover:shadow-lg"
              >
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2">
                      {tool.icon && <tool.icon className="h-5 w-5" />}
                      {tool.parentTitle && (
                        <span className="text-sm text-muted-foreground">
                          {tool.parentTitle} /{" "}
                        </span>
                      )}
                    </div>
                    <CardTitle>{tool.title}</CardTitle>
                  </div>
                  <CardDescription>
                    {tool.description ||
                      `使用${tool.title}工具提高您的工作效率`}
                  </CardDescription>
                </CardHeader>
                <ArrowUpRight className="group-hover:opacity-100 opacity-50 w-5 absolute right-2 top-2" />
              </Card>
            </Link>
          ))}
        </div>
      </main>

      {/* 页脚区域 */}
      <footer className="w-full py-6 border-t hidden">
        <div className="container px-4 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} 工具集. 保留所有权利.
          </p>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <Link
              href="/about"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              关于我们
            </Link>
            <Link
              href="/contact"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              联系我们
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
