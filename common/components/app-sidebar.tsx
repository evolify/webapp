import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
} from "@/components/ui/sidebar"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ChevronRight } from "lucide-react"

export interface AppSidebarItem {
  title: string
  url?: string
  icon: React.ElementType
  collapsed?: boolean
  children?: AppSidebarItem[]
}

interface Props {
  items: AppSidebarItem[]
}

function Menu(props: { items: AppSidebarItem[]; subMenu?: boolean }) {
  const { items, subMenu } = props

  const MenuComponent = subMenu ? SidebarMenuSub : SidebarMenu

  return (
    <MenuComponent>
      {items.map(item => (
        <MenuItem key={item.title} {...item} />
      ))}
    </MenuComponent>
  )
}
function MenuItem(props: AppSidebarItem) {
  const { title, url, icon: Icon, children, collapsed } = props

  if (children) {
    return (
      <Collapsible
        key={title}
        asChild
        defaultOpen={!collapsed}
        className="group/collapsible"
      >
        <SidebarMenuItem>
          <CollapsibleTrigger asChild>
            <SidebarMenuButton tooltip={title}>
              {Icon && <Icon />}
              <span>{title}</span>
              <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
            </SidebarMenuButton>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <Menu items={children} subMenu />
          </CollapsibleContent>
        </SidebarMenuItem>
      </Collapsible>
    )
  }

  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild>
        <a href={url}>
          {Icon && <Icon />} {title}
        </a>
      </SidebarMenuButton>
    </SidebarMenuItem>
  )
}

export default function AppSidebar(props: Props) {
  const { items } = props

  return (
    <Sidebar variant="inset" collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <Menu items={items} />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
