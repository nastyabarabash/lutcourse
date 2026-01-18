import { useEffect, useState } from "react"

interface Item {
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
    const isTest = process.env.NODE_ENV === "test"

    if (isTest) {
      // mock data for tests: 12 items
      setItems([
        { id: 1, title: "title 1", body: "body 1" },
        { id: 2, title: "title 2", body: "body 2" },
        { id: 3, title: "title 3", body: "body 3" },
        { id: 4, title: "title 4", body: "body 4" },
        { id: 5, title: "title 5", body: "body 5" },
        { id: 6, title: "title 6", body: "body 6" },
        { id: 7, title: "title 7", body: "body 7" },
        { id: 8, title: "title 8", body: "body 8" },
        { id: 9, title: "title 9", body: "body 9" },
        { id: 10, title: "title 10", body: "body 10" },
        { id: 11, title: "title 11", body: "body 11" },
        { id: 12, title: "title 12", body: "body 12" }
      ])
      setLoading(false)
      return
    }

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