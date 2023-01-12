import { useEffect, useState } from "react"

export function useData<T>(request: Promise<any>) {
  // type T = Awaited<typeof request>

  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<T>()

  async function run() {
    setLoading(true)
    request.then(setData).catch(err => {
      console.error(err)
      setError(err)
    })
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
