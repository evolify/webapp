interface Base {
  id: string
  name: string
}
export interface Token extends Base {
  symbol: string
  decimals: number
  totalTransactions: number
  tradeVolume: number
  tradeVolumeUSD: number
  untrackedVolumeUSD: number
  totalLiquidity: number
  derivedBNB: number
  derivedUSD: number
}
export interface Pair extends Base {
  token0: Token
  token1: Token
  timestamp: number
  totalSupply: number
  reserveBNB: number
  reserveUSD: number
  volumeUSD: number
  totalTransactions: number
}

export interface ArbPair extends Base {
  token0: Token
  token1: Token
  timestamp: number
  totalSupply: number
  reserveETH: number
  reserveUSD: number
  volumeUSD: number
  txCount: number
}
