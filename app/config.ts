import {
  Calculator,
  Calendar,
  Globe,
  Home,
  Languages,
  Palette,
  Pipette,
} from "lucide-react"

export const menus = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
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
        icon: Palette,
        url: "/color/colors",
      },
      {
        title: "Color Picker",
        icon: Pipette,
        url: "/color/picker",
      },
    ],
  },
  {
    title: "Translate",
    icon: Languages,
    url: "/translate",
    desc: "Translate text with local Model use Translator API",
  },
]
