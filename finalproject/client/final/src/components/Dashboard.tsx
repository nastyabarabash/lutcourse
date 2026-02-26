import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import "../styles/dashboard.css"

interface Document {
  _id: string
  title: string
  content: string
  isPublic: boolean
  shareId: string
}

const Dashboard = () => {
  const [documents, setDocuments] = useState<Document[]>([])
  const navigate = useNavigate()
  const token = localStorage.getItem("token")

  const fetchDocuments = async () => {
    if (!token) return
    try {
      const res = await fetch("http://localhost:5000/api/documents", {
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await res.json()
      setDocuments(data)
    } catch (error) {
      console.error(error)
    }
  }

  const deleteDocument = async (id: string) => {
    if (!token) return
    try {
      await fetch(`http://localhost:5000/api/documents/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      })
      fetchDocuments()
    } catch (error) {
      console.error(error)
    }
  }

  const toggleShare = async (id: string) => {
    if (!token) return
    try {
      const res = await fetch(`http://localhost:5000/api/documents/${id}/share`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await res.json()
      alert(
        data.isPublic
          ? `Shared! Link: ${data.shareLink}`
          : "Document is now private"
      )
      fetchDocuments()
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchDocuments()
  }, [])

  return (
    <div>
      <div className="dashboard-container">
        <h2>My Documents</h2>
        <button onClick={() => navigate("/documents/new")}>New Document</button>
        <ul>
          {documents.map((doc) => (
            <li key={doc._id}>
              <Link to={`/documents/${doc._id}`}>{doc.title}</Link>{" "}
              <button onClick={() => deleteDocument(doc._id)}>Delete</button>{" "}
              <button onClick={() => toggleShare(doc._id)}>
                {doc.isPublic ? "Unshare" : "Share"}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Dashboard