import {
  CopyAllOutlined,
  Height,
  Sensors,
  ShowChart,
} from "@mui/icons-material"
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
  Stack,
  Chip,
  Avatar,
} from "@mui/material"
import { Pair, Token } from "../../types"
import { formatNumber, getUrl, to } from "../../utils"
import dayjs from "dayjs"
import { copy } from "common/utils"

function IconButton(props: IconButtonProps) {
  return <_IconButton size="small" {...props} />
}

interface Props {
  data: Pair
}

function formatTokens(token0: Token, token1: Token) {
  if (["WBNB", "USDT", "BUSD"].some(t => t === token1.symbol)) {
    return [token1, token0]
  }
  return [token0, token1]
}

function mainColor(highlight = false) {
  const _color = "#03A9F4"
  if (highlight) {
    return {
      bgColor: _color + "20",
      borderColor: _color + "30",
    }
  }
  return {
    bgColor: "",
    borderColor: "",
  }
}

export default function PairCard({ data }: Props) {
  const { id, name, timestamp, token0, token1, reserveUSD } = data
  const [base, token] = formatTokens(token0, token1)
  const urls = getUrl(token.id)
  const { bgColor, borderColor } = mainColor(reserveUSD > 0)
  return (
    <Card
      variant="outlined"
      sx={{
        borderRadius: 3,
        bgcolor: bgColor,
        borderColor: borderColor,
      }}
    >
      <CardHeader
        sx={{ px: 2, py: 1 }}
        title={
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="body1" whiteSpace="nowrap">
              {token.symbol} / {base.symbol}
            </Typography>
            <Typography variant="caption">
              {dayjs(timestamp * 1000).format("HH:mm:ss MM-DD")}
            </Typography>
          </Stack>
        }
      />
      <CardContent sx={{ px: 2, py: 0.5 }}>
        <Stack direction="row" alignItems="center">
          <Typography whiteSpace="nowrap" variant="caption">
            txCount: {data.totalTransactions}
          </Typography>
          <Typography ml={2} whiteSpace="nowrap" variant="caption">
            24H value: {formatNumber(data.volumeUSD)}
          </Typography>
        </Stack>
        <Box>
          <Typography whiteSpace="nowrap" variant="caption">
            ca: {token.id}
          </Typography>
        </Box>
        <Box>
          <Typography whiteSpace="nowrap" variant="caption">
            pair: {id}
          </Typography>
        </Box>
      </CardContent>
      <Divider sx={{ borderColor: borderColor }} />
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
        <Stack
          direction="row"
          alignItems="center"
          ml="auto"
          sx={{
            borderRadius: 1,
            border: "1px solid #7773",
          }}
        >
          <Typography
            sx={{ mx: 1, my: 0.5 }}
            variant="caption"
            whiteSpace="nowrap"
          >
            {formatNumber(data.reserveUSD)} U
          </Typography>
          <Divider
            orientation="vertical"
            sx={{ borderColor: "#7773" }}
            flexItem
          />
          <Typography
            sx={{ mx: 1, my: 0.5 }}
            variant="caption"
            whiteSpace="nowrap"
          >
            {formatNumber(data.reserveBNB)} B
          </Typography>
        </Stack>
      </CardActions>
    </Card>
  )
}
