import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import "../styles/auth.css"

interface LoginProps {
  onLogin: (token: string) => void
}

const Login = ({ onLogin }: LoginProps) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.message || "Login failed")
      onLogin(data.token)
      navigate("/dashboard")
    } catch (error: any) {
      setError(error.message)
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-switch">
        <Link to="/register">Register</Link>
      </div>
      <div className="auth-container">
        <form onSubmit={handleSubmit}>
          <h2>Login</h2>
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          {error && <div className="auth-error">{error}</div>}
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  )
}

export default Login