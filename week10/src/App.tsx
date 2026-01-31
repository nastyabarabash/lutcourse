import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Header from "./components/Header"
import About from "./components/About"
import FrontPage from "./components/FrontPage";
import SavedPage from "./components/SavedPage";
import { useJokes } from "./hooks/useJokes";

function App() {
  const { savedJokes, saveJoke } = useJokes();
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<FrontPage saveJoke={saveJoke} />} />
        <Route path="/about" element={<About />} />
        <Route path="/saved" element={<SavedPage savedJokes={savedJokes} />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App
