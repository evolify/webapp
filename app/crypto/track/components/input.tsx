import Paper from "@mui/material/Paper"
import InputBase from "@mui/material/InputBase"
import IconButton from "@mui/material/IconButton"
import MenuIcon from "@mui/icons-material/Menu"
import SearchIcon from "@mui/icons-material/Search"
import { useState } from "react"
import { Box } from "@mui/material"

interface Props {
  value: string
  onChange: (val: string) => void
}

export default function Input({ value, onChange }: Props) {
  const [addr, setAddr] = useState(value)
  return (
    <Box
      component="form"
      sx={{ p: "2px 4px", display: "flex", alignItems: "center" }}
    >
      <IconButton sx={{ p: "10px" }} aria-label="menu">
        <MenuIcon />
      </IconButton>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Input address to track"
        inputProps={{ "aria-label": "search google maps" }}
        value={value}
        onChange={e => setAddr(e.target.value.trim())}
      />
      <IconButton
        type="button"
        sx={{ p: "10px" }}
        aria-label="search"
        onClick={() => onChange(addr)}
      >
        <SearchIcon />
      </IconButton>
    </Box>
  )
}
