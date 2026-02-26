import { useState } from "react"
import { BrowserRouter, Routes, Route, Link, Navigate, useLocation } from "react-router-dom"
import Register from "./components/Register"
import Login from "./components/Login"
import Dashboard from "./components/Dashboard"
import CreateDocument from "./components/CreateDocument"
import EditDocument from "./components/EditDocument"
import PublicDocument from "./components/PublicDocument"

function AppWrapper() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  )
}

function App() {
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"))
  const location = useLocation()

  const handleLogin = (newToken: string) => {
    localStorage.setItem("token", newToken)
    setToken(newToken)
  }

  const handleLogout = () => {
    localStorage.removeItem("token")
    setToken(null)
  }

  const hideNavbar = location.pathname === "/login" || location.pathname === "/register"

  return (
    <>
      {!hideNavbar && (
        <nav style={{ 
          padding: "1rem",
          borderBottom: "1px solid #ccc",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}>
          <div>
            {!token && (
              <>
                <Link 
                  to="/register" 
                  style={navButtonStyle}
                >
                  Register
                </Link>
                <Link 
                  to="/login" 
                  style={{ ...navButtonStyle, marginLeft: "1rem" }}
                >
                  Login
                </Link>
              </>
            )}
          </div>

          {token && (
            <button 
              onClick={handleLogout}
              style={navButtonStyle}
            >
              Logout
            </button>
          )}
        </nav>
      )}

      <Routes>
        <Route path="/register" element={<Register onLogin={handleLogin} />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/dashboard" element={token ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/documents/new" element={token ? <CreateDocument /> : <Navigate to="/login" />} />
        <Route path="/documents/:id" element={token ? <EditDocument /> : <Navigate to="/login" />} />
        <Route path="/public/:shareId" element={<PublicDocument />} />
      </Routes>
    </>
  )
}

const navButtonStyle: React.CSSProperties = {
  padding: "0.5rem 1rem",
  border: "1px solid #4f46e5",
  borderRadius: "4px",
  textDecoration: "none",
  background: "white",
  color: "#4f46e5",
  fontWeight: "bold",
  cursor: "pointer"
}

export default AppWrapper