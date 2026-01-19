import { useEffect, useState } from "react"

export interface Item {
  id: number
  title: string
  body: string
}

interface UseEffectProps {
  visibleCount: number
}

const UseEffect = ({ visibleCount }: UseEffectProps) => {
  const [items, setItems] = useState<Item[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok")
        return res.json()
      })
      .then((data: Item[]) => {
        setItems(data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error}</p>

  return (
    <>
      {items.slice(0, visibleCount).map((item) => (
        <div key={item.id} className="grid-item">
          <h3>{item.title}</h3>
          <p>{item.body}</p>
        </div>
      ))}
    </>
  )
}

export default UseEffect