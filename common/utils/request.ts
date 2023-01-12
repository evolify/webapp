export async function post(url: string, data: object) {
  const res = await fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: new Headers({
      "Content-Type": "application/json",
    }),
  })
  return res.json()
}

export async function gql<T>(node: string, query: string): Promise<T> {
  const data = await post(node, { query })
  return data
}
