import React from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import LoginPage from "./frontend/authentication/loginpage"

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<LoginPage />} />
      </Routes>
    </Router>
  )
}

export default App
