import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

interface Document {
  _id: string
  title: string
  createdAt: string
  updatedAt: string
}

type SortField = "title" | "createdAt" | "updatedAt"
type SortOrder = "asc" | "desc"

const ITEMS_PER_PAGE = 5

const Dashboard = () => {
  const [documents, setDocuments] = useState<Document[]>([])
  const [sortField, setSortField] = useState<SortField>("createdAt")
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc")
  const [currentPage, setCurrentPage] = useState(1)

  const navigate = useNavigate()

  useEffect(() => {
    fetchDocuments()
  }, [])

  const fetchDocuments = async () => {
    const token = localStorage.getItem("token")

    const res = await fetch("http://localhost:5000/api/documents", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    const data = await res.json()
    setDocuments(data)
  }

  const handleDelete = async (id: string) => {
    const token = localStorage.getItem("token")

    await fetch(`http://localhost:5000/api/documents/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    setDocuments((prev) => prev.filter((doc) => doc._id !== id))
  }

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortOrder("asc")
    }
  }

  const sortedDocuments = [...documents].sort((a, b) => {
    let valueA = a[sortField]
    let valueB = b[sortField]

    if (sortField !== "title") {
      valueA = new Date(valueA).getTime() as any
      valueB = new Date(valueB).getTime() as any
    }

    if (valueA < valueB) return sortOrder === "asc" ? -1 : 1
    if (valueA > valueB) return sortOrder === "asc" ? 1 : -1
    return 0
  })

  const totalPages = Math.ceil(sortedDocuments.length / ITEMS_PER_PAGE)

  const paginatedDocuments = sortedDocuments.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  return (
    <div style={{ padding: "2rem" }}>
      <div style={{ 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center",
        marginBottom: "1.5rem"
      }}>
        <h2>Your Documents</h2>

        <button
          onClick={() => navigate("/documents/new")}
          style={{
            padding: "0.6rem 1.2rem",
            border: "1px solid #4f46e5",
            borderRadius: "4px",
            background: "#4f46e5",
            color: "white",
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >
          + New Document
        </button>
      </div>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th onClick={() => handleSort("title")} style={thStyle}>Name</th>
            <th onClick={() => handleSort("createdAt")} style={thStyle}>Created</th>
            <th onClick={() => handleSort("updatedAt")} style={thStyle}>Modified</th>
            <th style={thStyle}></th>
          </tr>
        </thead>
        <tbody>
          {paginatedDocuments.map((doc) => (
            <tr key={doc._id}>
              <td style={tdStyle} onClick={() => navigate(`/documents/${doc._id}`)}>
                {doc.title}
              </td>
              <td style={tdStyle}>
                {new Date(doc.createdAt).toLocaleDateString()}
              </td>
              <td style={tdStyle}>
                {new Date(doc.updatedAt).toLocaleDateString()}
              </td>
              <td style={tdStyle}>
                <span
                  style={{ cursor: "pointer", color: "red" }}
                  onClick={() => handleDelete(doc._id)}
                >
                  🗑
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {totalPages > 1 && (
        <div style={{ marginTop: "1rem" }}>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              style={{
                marginRight: "0.5rem",
                padding: "0.4rem 0.8rem",
                border: "1px solid #4f46e5",
                background: currentPage === i + 1 ? "#4f46e5" : "white",
                color: currentPage === i + 1 ? "white" : "#4f46e5",
                cursor: "pointer",
              }}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

const thStyle: React.CSSProperties = {
  borderBottom: "1px solid #ccc",
  padding: "0.75rem",
  cursor: "pointer",
  textAlign: "left",
}

const tdStyle: React.CSSProperties = {
  padding: "0.75rem",
  borderBottom: "1px solid #eee",
}

export default Dashboard