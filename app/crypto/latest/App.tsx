import { Box, Stack } from "@mui/material"
import { getLatestPairs } from "../api"
import { Pair } from "../types"
import { useData } from "common/hooks/api"
import PairCard from "./components/pair"
import { WithLoading } from "common/ui/loading"

export default function Content() {
  const { data, loading, error } = useData<Pair[]>(getLatestPairs)
  return (
    <WithLoading loading={loading}>
      <Stack>
        {data?.map(t => (
          <Box my={0.5} key={t.id}>
            <PairCard data={t} />
          </Box>
        ))}
      </Stack>
    </WithLoading>
  )
}
