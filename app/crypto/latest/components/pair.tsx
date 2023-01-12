import { CopyAllOutlined, Sensors, ShowChart } from "@mui/icons-material"
import {
  Card,
  CardContent,
  CardHeader,
  CardActions,
  Typography,
  IconButton as _IconButton,
  IconButtonProps,
  Divider,
  Box,
} from "@mui/material"
import { Pari, Token } from "../../types"
import { getUrl, to } from "../../utils"
import dayjs from "dayjs"
import { copy } from "common/utils"

function IconButton(props: IconButtonProps) {
  return <_IconButton size="small" {...props} />
}

interface Props {
  data: Pari
}

function formatTokens(token0: Token, token1: Token) {
  if (["WBNB", "USDT", "BUSD"].some(t => t === token1.symbol)) {
    return [token1, token0]
  }
  return [token0, token1]
}

export default function PairCard({ data }: Props) {
  const { id, name, timestamp, token0, token1 } = data
  const [base, token] = formatTokens(token0, token1)
  const urls = getUrl(token.id)
  return (
    <Card variant="outlined" sx={{ borderRadius: 3 }}>
      <CardHeader
        sx={{ px: 2, py: 1 }}
        title={
          <Typography>
            {token.symbol} / {base.symbol}
          </Typography>
        }
      />
      <CardContent sx={{ px: 2, py: 0.5 }}>
        <Box>
          <Typography whiteSpace="nowrap" variant="caption">
            {token.id}
          </Typography>
        </Box>
        {/* <Box>
          <Typography whiteSpace="nowrap" variant="caption">
            pair: {id}
          </Typography>
        </Box> */}
      </CardContent>
      <Divider />
      <CardActions sx={{ px: 2, py: 0.5 }}>
        <IconButton onClick={() => to(urls.ave)}>
          <ShowChart />
        </IconButton>
        <IconButton onClick={() => to(urls.bscscan)}>
          <Sensors />
        </IconButton>
        <IconButton onClick={() => copy(token.id)}>
          <CopyAllOutlined />
        </IconButton>
        <Box ml="auto">
          <Typography variant="caption">
            {dayjs(timestamp * 1000).format("HH:mm:ss YYYY-MM-DD")}
          </Typography>
        </Box>
      </CardActions>
    </Card>
  )
}
