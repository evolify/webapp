import { ArbPair, Pair } from "./types"
import { arbPairsGql, cakeGql, pairsGql } from "./utils"

const tokenQL = `{
  id
  name
  symbol
  decimals
}`

export async function latestCakePairs(count = 20) {
  const data = await pairsGql<{ pairs: Pair[] }>(`{
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

export async function getLatestPairs(count = 30) {
  const { pairs } = await pairsGql<{ pairs: Pair[] }>(`{
    pairs(first:${count}, orderBy:timestamp, orderDirection: desc){
      id
    }
  }`)
  const ids = `[${pairs.map(t => `"${t.id}"`).join(",")}]`
  const data = await cakeGql<{ pairs: Pair[] }>(`{
    pairs(where: {id_in: ${ids}}){
      id
      name
      timestamp
      totalTransactions
      volumeToken0
      volumeToken1
      volumeUSD
      reserve0
      reserve1
      totalSupply
      reserveBNB
      reserveUSD
      trackedReserveBNB
      token0Price
      token1Price
      untrackedVolumeUSD
      token0${tokenQL}
      token1${tokenQL}
    }
  }`)
  return data.pairs
}

export async function getLatestArbPairs(count = 30) {
  const { pairs } = await arbPairsGql<{ pairs: ArbPair[] }>(`{
    pairs(first:${count}, orderBy:timestamp, orderDirection: desc){
      id
      reserve0
      reserve1
      reserveETH
      reserveUSD
      volumeUSD
      txCount
      timestamp
      token0${tokenQL}
      token1${tokenQL}
    }
  }`)
  return pairs
}

// where: {from_in:["${address}"]}
export async function getSwaps(address: string) {
  const data = await cakeGql(`{
    swaps(first: 20, where: {from_in:["${address}"]}){
      id
      sender
      from
      to
      amountUSD
      timestamp
      token0{
        id
        symbol
      }
      token1{
        id
        symbol
      }
      transaction{
        id
      }
    }
  }`)
  console.log(data)
}
