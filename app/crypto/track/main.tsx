"use client"
import { render } from "common/utils/index"
import { Box, Paper, Stack } from "@mui/material"
import Layout from "../layout"
import TxCard from "./components/txcard"
import { useTxList } from "./api"
import Input from "./components/input"
import { WithLoading } from "common/ui/loading"
import { useState } from "react"

function Main() {
  const [address, setAddress] = useState(
    "0x9C9d7fCE4A7aA8EF00413D3f4752dA25625dDf2D"
  )
  const { data, loading, search } = useTxList(
    "0x9C9d7fCE4A7aA8EF00413D3f4752dA25625dDf2D"
  )
  function onSearch(val: string) {
    setAddress(val)
    search(val)
  }
  return (
    <Layout title="Tracker">
      <WithLoading loading={loading}>
        <Stack pb="50px">
          {data?.map(t => (
            <TxCard address={address} key={t.hash} data={t} />
          ))}
        </Stack>
      </WithLoading>
      <Paper
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          pb: "20px",
        }}
      >
        <Input
          value="0x9C9d7fCE4A7aA8EF00413D3f4752dA25625dDf2D"
          onChange={onSearch}
        />
      </Paper>
    </Layout>
  )
}

render(<Main />)
