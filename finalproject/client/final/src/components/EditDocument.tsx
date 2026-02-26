import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import "../styles/dashboard.css"

// interface Document {
//   _id: string
//   title: string
//   content: string
// }

const EditDocument = () => {
  const { id } = useParams<{ id: string }>()
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const navigate = useNavigate()
  const token = localStorage.getItem("token")

  useEffect(() => {
    const fetchDocument = async () => {
      if (!token || !id) return
      try {
        const res = await fetch(`http://localhost:5000/api/documents/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        const data = await res.json()
        setTitle(data.title)
        setContent(data.content)
      } catch (error) {
        console.error(error)
      }
    }
    fetchDocument()
  }, [id, token])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!token || !id) return

    try {
      const res = await fetch(`http://localhost:5000/api/documents/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, content }),
      })
      if (!res.ok) throw new Error("Failed to update document")
      navigate("/dashboard")
    } catch (error: any) {
      alert(error.message)
    }
  }

  return (
    <form className="document-form" onSubmit={handleSubmit}>
      <h2>Edit Document</h2>
      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button type="submit">Save</button>
    </form>
  )
}

export default EditDocument