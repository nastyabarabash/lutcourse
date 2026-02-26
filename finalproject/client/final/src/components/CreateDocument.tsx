import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "../styles/dashboard.css"

const CreateDocument = () => {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const navigate = useNavigate()
  const token = localStorage.getItem("token")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!token) return

    try {
      const res = await fetch("http://localhost:5000/api/documents", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, content }),
      })

      if (!res.ok) throw new Error("Failed to create document")
      navigate("/dashboard")
    } catch (error: any) {
      alert(error.message)
    }
  }

  return (
    <form className="document-form" onSubmit={handleSubmit}>
      <h2>New Document</h2>
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
      <button type="submit">Create</button>
    </form>
  )
}

export default CreateDocument