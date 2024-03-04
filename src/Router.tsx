import { BrowserRouter, Routes, Route } from "react-router-dom"
import DesignEditor from "~/views/DesignEditor"
import Dashboard from "~/views/Dashboard"
import { MyHomeComponent } from "./qr-lab/HomePage.jsx"

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MyHomeComponent />} />
        <Route path="/designer" element={<DesignEditor />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
