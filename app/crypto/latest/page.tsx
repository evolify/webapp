"use client"
import React from "react"
import { Stack } from "@mui/material"
import Header from "./module/header"
import Content from "./module/content"

export default function App() {
  return (
    <Stack p={2} pt="46px">
      <Header>Latest</Header>
      <Content />
    </Stack>
  )
}
