import { get } from "common/utils/request"
import { useEffect, useState } from "react"
import { BSCSCAN_API, BSCSCAN_APIKEY } from "../config"
import { Transaction } from "./types"

export function useTxList(address: string) {
  const [data, setData] = useState<{ result: Transaction[] }>()
  const [error, setError] = useState<any>()
  const [loading, setLoading] = useState(true)

  async function search(addr = address) {
    setLoading(true)
    try {
      const data = await get(BSCSCAN_API, {
        module: "account",
        action: "txlist",
        sort: "desc",
        apikey: BSCSCAN_APIKEY,
        address,
      })
      setData(data)
    } catch (err) {
      console.error(err)
      setError(err)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    if (address) {
      search(address)
    }
  }, [])
  return {
    data: data?.result,
    error,
    loading,
    search,
  }
}
