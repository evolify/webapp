"use client"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { usePathname } from "next/navigation"
import { items } from "./config"
import { AppSidebarItem } from "@/components/app-sidebar"
import { Fragment, useMemo } from "react"

function findBreadcrumb(pathname: string, items: AppSidebarItem[]) {
  const res: AppSidebarItem[] = []
  for (const item of items) {
    if (item.url === pathname) {
      res.push(item)
      break
    }
    if (item.children) {
      const child = findBreadcrumb(pathname, item.children)
      if (child.length > 0) {
        res.push(item)
        res.push(...child)
      }
    }
  }
  return res
}

export default function Header() {
  const pathname = usePathname()
  const list = useMemo(() => findBreadcrumb(pathname, items), [pathname])

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {list.map((item, index) =>
          index !== list.length - 1 ? (
            <Fragment key={item.url}>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href={item.url}>{item.title}</BreadcrumbLink>{" "}
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
            </Fragment>
          ) : (
            <BreadcrumbItem key={item.url}>
              <BreadcrumbPage>{item.title}</BreadcrumbPage>
            </BreadcrumbItem>
          )
        )}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
