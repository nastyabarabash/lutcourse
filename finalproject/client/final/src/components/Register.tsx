import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import "../styles/auth.css"

interface RegisterProps {
  onLogin: (token: string) => void
}

const Register = ({ onLogin }: RegisterProps) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.message || "Registration failed")
      alert("User created! Logging in...")
      onLogin(data.token)
      navigate("/dashboard")
    } catch (error: any) {
      alert(error.message)
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-switch">
        <Link to="/login">Login</Link>
      </div>
      <div className="auth-container">
        <form onSubmit={handleSubmit}>
          <h2>Register</h2>
          <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  )
}

export default Register