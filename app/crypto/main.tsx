"use client"
import { KeyboardArrowRight, Tab } from "@mui/icons-material"
import {
  Card,
  CardActionArea,
  Unstable_Grid2 as Grid,
  Typography,
  CardHeader,
  IconButton,
} from "@mui/material"
import { render } from "common/utils/index"
import Layout from "./layout/index"

const list = [
  {
    name: "Latest List",
    url: "/crypto/latest/index.html",
    desc: "The latest list tokens",
  },
  {
    name: "Wallet Tracker",
    url: "/crypto/track/index.html",
    desc: "Track wallet actions",
  },
  {
    name: "Trade",
    url: "https://trade-bsc.vercel.app",
    desc: "Swap tokens in trade-bsc",
  },
  {
    name: "Ave.ai",
    url: "https://m.ave.ai",
    desc: "Launch ave.ai",
  },
  {
    name: "Pancake Swap",
    url: "https://pancakeswap.finance/swap",
    desc: "Swap tokens in Pancake Swap",
  },
  {
    name: "1inch Swap",
    url: "https://app.1inch.io/",
    desc: "Swap tokens in 1inch Swap",
  },
]

function to(url: string) {
  location.href = url
}

function newTab(url: string) {
  window.open(url)
}

function App() {
  return (
    <Layout title="crypto">
      <Grid container spacing={1}>
        {list.map(t => (
          <Grid xs={12} sm={6} md={4} key={t.name}>
            <Card sx={{ borderRadius: 2 }}>
              <CardActionArea onClick={() => to(t.url)}>
                <CardHeader
                  title={<Typography>{t.name}</Typography>}
                  subheader={
                    <Typography variant="caption">{t.desc}</Typography>
                  }
                  action={
                    <>
                      <IconButton onClick={() => newTab(t.url)}>
                        <Tab color="action" />
                      </IconButton>
                      <IconButton>
                        <KeyboardArrowRight color="action" />
                      </IconButton>
                    </>
                  }
                />
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Layout>
  )
}

render(<App />)
