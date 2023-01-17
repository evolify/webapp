import { gql } from "common/utils/request"

export function uniswapGql(query: string) {
  return gql(
    "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2",
    query
  )
}

/**
 * https://thegraph.com/hosted-service/subgraph/pancakeswap/pairs
 * @param query 
 * @returns 
 */
export async function pairsGql<T>(query: string): Promise<T> {
  const { data } = await gql<{ data: T }>(
    "https://api.thegraph.com/subgraphs/name/pancakeswap/pairs",
    query
  )
  return data
}

/**
 * https://docs.nodereal.io/reference/pancakeswap-graphql-api
 * @param query 
 * @returns 
 */
export async function cakeGql<T>(query: string): Promise<T> {
  const { data } = await gql<{ data: T }>(
    "https://open-platform.nodereal.io/98463b7025034e8b865fa2556c6960cc/pancakeswap/graphql/",
    query
  )
  return data
}

export function getUrl(token: string) {
  return {
    ave: `https://m.ave.ai/token/${token}-bsc`,
    bscscan: `https://bscscan.com/token/${token}`,
    code: `https://bscscan.deth.net/token/${token}`,
  }
}

export function to(url: string) {
  window.open(url)
}

export function viewAddress(address: string) {
  window.open(`https://bscscan.com/address/${address}`)
}

export function formatNumber(num: string | number) {
  const input = +num
  if (input > 1e9) {
    return (input / 1e9).toFixed(4) + " B"
  }
  if (input > 1e6) {
    return (input / 1e6).toFixed(4) + " M"
  }
  if (input > 1) {
    return input.toFixed(4)
  }
  if (input > 1e-4) {
    return input.toFixed(5)
  }
  if (input === 0) {
    return 0
  }
  let zeroCount = 0
  const float = String(num).split(".")[1]
  const str = float.replace(/^0*/g, val => {
    zeroCount = val.length
    return ""
  })
  return `0.0${zeroCount}${str.slice(0, 4)}`
}
