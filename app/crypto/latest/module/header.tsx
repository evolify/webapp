import { IconButton, Stack, Typography } from "@mui/material"
import { Refresh } from "@mui/icons-material"

interface Props {
  children: React.ReactNode
}

function reload() {
  location.reload()
}

export default function Header({ children }: Props) {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      position="fixed"
      top={0}
      left={0}
      right={0}
      py={0.5}
      px={2}
      bgcolor="background.default"
      color="text.primary"
      zIndex={100}
    >
      <Typography variant="h5">{children}</Typography>
      <IconButton onClick={reload}>
        <Refresh />
      </IconButton>
    </Stack>
  )
}
