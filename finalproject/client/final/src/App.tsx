import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import Register from "./components/Register"
import Login from "./components/Login"
import Dashboard from "./components/Dashboard"
import CreateDocument from "./components/CreateDocument"
import EditDocument from "./components/EditDocument"
import PublicDocument from "./components/PublicDocument"

function App() {
  return (
    <BrowserRouter>
      <nav style={{ padding: "1rem", borderBottom: "1px solid #ccc" }}>
        <Link to="/register" style={{ marginRight: "1rem" }}>Register</Link>
        <Link to="/login">Login</Link>
      </nav>

      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/documents/new" element={<CreateDocument />} />
        <Route path="/documents/:id" element={<EditDocument />} />
        <Route path="/public/:shareId" element={<PublicDocument />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App