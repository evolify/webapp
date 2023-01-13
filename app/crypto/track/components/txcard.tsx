import { CopyAllOutlined, Sensors } from "@mui/icons-material"
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  Divider,
  IconButton,
  Link,
  Stack,
  Typography,
} from "@mui/material"
import dayjs from "dayjs"
import { Transaction } from "../types"
import { to as nav, viewAddress } from "../../utils"
import { copy } from "common/utils/index"

interface Props {
  data: Transaction
  address: string
}

export default function TxCard({ data, address }: Props) {
  const { from, to, functionName, hash } = data
  const isReceive = to.toLowerCase() === address.toLowerCase()
  console.log(isReceive)
  const method = functionName.replace(/\(.*$/g, "") || "Transfer"
  const details = `https://bscscan.com/tx/${hash}`
  return (
    <Card sx={{ my: 0.5, borderRadius: 3 }} variant="outlined">
      <CardHeader
        sx={{ px: 2, py: 1 }}
        title={
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="body1">{method}</Typography>
            {isReceive ? (
              <Chip
                label="IN"
                size="small"
                color="info"
                sx={{ borderRadius: 2, bgcolor: "#03A9F470" }}
              />
            ) : (
              <Chip
                label="OUT"
                size="small"
                color="warning"
                sx={{ borderRadius: 2, bgcolor: "#ed6c0270" }}
              />
            )}
          </Stack>
        }
      />
      <CardContent sx={{ px: 2, py: 0.5 }}>
        <Box>
          <Typography variant="caption">
            count: {+data.value / 10e17} BNB
          </Typography>
        </Box>
        <Box>
          <Typography variant="caption">
            from:
            <Link onClick={() => viewAddress(from)}>{from}</Link>
          </Typography>
        </Box>
        <Box>
          <Typography variant="caption">
            to:
            <Link onClick={() => viewAddress(to)}>{to}</Link>
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions sx={{ px: 2, py: 0.5 }}>
        <IconButton onClick={() => nav(details)}>
          <Sensors />
        </IconButton>
        <IconButton onClick={() => copy(details)}>
          <CopyAllOutlined />
        </IconButton>
        <Typography variant="caption" sx={{ ml: "auto" }}>
          {dayjs(Number(data.timeStamp) * 1000).format("HH:mm:ss MM-DD")}
        </Typography>
      </CardActions>
    </Card>
  )
}
