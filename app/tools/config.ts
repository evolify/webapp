import { Calculator, Calendar, Globe } from "lucide-react"

export const items = [
  {
    title: "Favicon",
    url: "/tools/favicon",
    icon: Globe,
  },
  {
    title: "日历",
    url: "#",
    icon: Calendar,
    children: [
      {
        title: "计算器",
        url: "/tools/calendar/calculator",
        icon: Calculator,
      },
    ],
  },
]
