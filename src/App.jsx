import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./components/Home"
import ItemsView from "./components/ItemsView"
function App() {
  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/items/:objectId" element={<ItemsView />}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
