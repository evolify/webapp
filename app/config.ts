import {
  Calculator,
  Calendar,
  CaseSensitive,
  Crop,
  FileJson,
  Globe,
  Home,
  Image,
  Languages,
  Palette,
  Pipette,
  ScanSearch,
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
    title: "JSON",
    icon: FileJson,
    children: [
      {
        title: "Formatter",
        url: "/json/formatter",
        icon: FileJson,
      },
    ],
  },
  {
    title: "Text",
    icon: CaseSensitive,
    children: [
      {
        title: "Base64",
        url: "/text/base64",
        icon: CaseSensitive,
      },
      {
        title: "URL Codec",
        url: "/text/url-codec",
        icon: CaseSensitive,
      },
      {
        title: "Regex Tester",
        url: "/text/regex-tester",
        icon: ScanSearch,
      },
    ],
  },
  {
    title: "Image",
    icon: Image,
    children: [
      {
        title: "WebP Converter",
        url: "/image/to-webp",
        icon: Image,
      },
      {
        title: "SVG Placeholder",
        url: "/image/svg-placeholder",
        icon: Image,
      },
      {
        title: "Optimize",
        url: "/image/optimize",
        icon: Crop,
      },
    ],
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
