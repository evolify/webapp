import { gql } from "utils/request"

export function uniswapGql(query: string) {
  return gql(
    "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2",
    query
  )
}

export async function cakeGql<T>(query: string): Promise<T> {
  const { data } = await gql(
    "https://api.thegraph.com/subgraphs/name/pancakeswap/pairs",
    query
  )
  return data
}

export function getUrl(token: string) {
  return {
    ave: `https://m.ave.ai/token/${token}-bsc`,
    bscscan: `https://bscscan.com/token/${token}`,
  }
}

export function to(url: string) {
  window.open(url)
}
