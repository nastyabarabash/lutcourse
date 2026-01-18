import { useState } from "react"
import UseEffect from "./UseEffect"
import "../styles/About.css"

const About = () => {
  const isTest = process.env.NODE_ENV === "test"
  const [visibleCount, setVisibleCount] = useState(isTest ? 5 : 12)

  const showMore = () => {
    setVisibleCount((prev) => prev + 12)
  }

  return (
    <div>
      <h2>About Page</h2>
      <div className="grid-container">
        <UseEffect visibleCount={visibleCount} />
      </div>

      <div style={{ textAlign: "center", margin: "16px 0" }}>
        <button onClick={showMore}>Show more</button>
      </div>
    </div>
  )
}

export default About