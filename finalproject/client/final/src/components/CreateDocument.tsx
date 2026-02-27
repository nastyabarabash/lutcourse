import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "../styles/dashboard.css"

const CreateDocument = () => {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const navigate = useNavigate()
  const token = localStorage.getItem("token")
  const isDirty = title.trim() !== "" || content.trim() !== ""

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

  const handleCancel = () => {
    if (isDirty) {
      const confirmCancel = window.confirm(
        "You have unsaved changes. Are you sure you want to cancel?"
      )
  
      if (!confirmCancel) return
    }
  
    navigate("/dashboard")
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
      <div style={buttonRowStyle}>
        <button type="submit" style={buttonStyle}>
          Create
        </button>

        <button
          type="button"
          onClick={handleCancel}
          style={buttonStyle}
        >
          Cancel
        </button>
      </div>
    </form>
  )
}

const buttonRowStyle: React.CSSProperties = {
  display: "flex",
  gap: "1rem",
  marginTop: "1.5rem",
}

const buttonStyle: React.CSSProperties = {
  flex: 1,
  padding: "0.75rem",
  borderRadius: "6px",
  fontWeight: "bold",
  cursor: "pointer",
  fontSize: "1rem",
  backgroundColor: "#4f46e5",
  border: "1px solid #4f46e5",
  color: "white",
}

export default CreateDocument