export interface Token {
  id: string
  name: string
  symbol: string
  decimals: number
}
export interface Pari extends Token {
  token0: Token
  token1: Token
  timestamp: number
}
