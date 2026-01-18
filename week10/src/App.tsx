import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Header from "./components/Header"
import About from "./components/About"
import MyContainer from "./components/MyContainer"

function App() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<MyContainer />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
