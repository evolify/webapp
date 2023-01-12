import { Stack } from "@mui/material"
import Header from "./module/header"
import Content from "./module/content"

export default function App() {
  return (
    <Stack px={1} pt="46px" pb={3}>
      <Header>Latest</Header>
      <Content />
    </Stack>
  )
}
