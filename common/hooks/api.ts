import { useEffect, useState } from "react"

export function useData<T>(request: () => Promise<any>) {
  // type T = Awaited<typeof request>

  const [error, setError] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<T>()

  async function run() {
    setLoading(true)
    try {
      const res = await request()
      if (res) {
        setData(res)
      } else {
        setError("no data")
      }
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    run()
  }, [])
  return {
    data,
    error,
    loading,
  }
}
