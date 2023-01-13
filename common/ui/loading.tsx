import { CircularProgress, Stack } from "@mui/material"
import React from "react"

export default function Loading() {
  return (
    <Stack mt={4} alignItems="center" justifyContent="center">
      <CircularProgress />
    </Stack>
  )
}

interface Props extends React.ComponentPropsWithoutRef<any> {
  loading?: boolean
}
export function WithLoading({ loading, children }: Props) {
  if (loading) {
    return <Loading />
  }
  return children
}
