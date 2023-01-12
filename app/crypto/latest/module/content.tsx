import { Box, CircularProgress, Stack } from "@mui/material"
import { latestCakePairs } from "../../api"
import { Pari } from "../../types"
import { useData } from "common/hooks/api"
import PairCard from "../components/pair"

export default function Content() {
  const { data, loading, error } = useData<Pari[]>(latestCakePairs())
  if (!data) {
    return (
      <Stack mt={4} alignItems="center" justifyContent="center">
        <CircularProgress />
      </Stack>
    )
  }
  return (
    <Stack>
      {data.map(t => (
        <Box my={0.5} key={t.id}>
          <PairCard data={t} />
        </Box>
      ))}
    </Stack>
  )
}
