import { Pari } from "./types"
import { cakeGql } from "./utils"

const tokenQL = `{
  id
  name
  symbol
  decimals
}`

export async function latestCakePairs(count = 20) {
  const data = await cakeGql<{ pairs: Pari[] }>(`{
    pairs(first:${count}, orderBy:timestamp, orderDirection: desc){
      id
      name
      timestamp
      token0${tokenQL}
      token1${tokenQL}
    }
   }`)
  return data.pairs
}
