import { Calculator, Calendar, Globe } from "lucide-react"

export const menus = [
  {
    title: "Favicon",
    url: "/favicon",
    icon: Globe,
  },
  {
    title: "Calendar",
    icon: Calendar,
    children: [
      {
        title: "Calculator",
        url: "/calendar/calculator",
        icon: Calculator,
      },
    ],
  },
  {
    title: "Color",
    icon: Calculator,
    children: [
      {
        title: "Tailwind Colors",
        icon: Calculator,
        url: "/color/colors",
      },
      {
        title: "Color Picker",
        icon: Calculator,
        url: "/color/picker",
      },
    ],
  },
]
