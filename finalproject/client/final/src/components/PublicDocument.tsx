import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import "../styles/dashboard.css"

interface Document {
  title: string
  content: string
  createdAt: string
}

const PublicDocument = () => {
  const { shareId } = useParams<{ shareId: string }>()
  const [doc, setDoc] = useState<Document | null>(null)

  useEffect(() => {
    const fetchDocument = async () => {
      if (!shareId) return
      try {
        const res = await fetch(
          `http://localhost:5000/api/documents/public/${shareId}`
        )
        const data = await res.json()
        setDoc(data)
      } catch (error) {
        console.error(error)
      }
    }
    fetchDocument()
  }, [shareId])

  if (!doc) return <p>Loading...</p>

  return (
    <div>
      <h2>{doc.title}</h2>
      <p>{doc.content}</p>
      <small>Created at: {new Date(doc.createdAt).toLocaleString()}</small>
    </div>
  )
}

export default PublicDocument