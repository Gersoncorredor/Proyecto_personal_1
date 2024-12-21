import React, { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

function LoginForm () {
  const navigate = useNavigate()

  const [formData, setformData] = useState({
    email: "",
    password: ""
  })

  const [loading, setloading] = useState(false)
  const [error, setError] = useState("")

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setformData((prevData) => ({
      ...prevData,
      [name]: value
    }))
    setError("")
  }

  const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    return emailRegex.test(email)
  }

  const validateform = (formData) => {
    if (!formData.email || !formData.password) return "Por favor completar los campos"

    if (!isValidEmail(formData.email)) return "Por favor, ingresa un correo electrónico válido."
    return null
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setloading(true)

    const errorMessage = validateform(formData)
    if (errorMessage) {
      setError(errorMessage)
      setloading(false)
      return null
    }

    try {
      const response = await axios.post("http://localhost:3001/api/login", { ...formData })

      if (response.data.token) {
        localStorage.setItem("authtoken", response.data.token)
        return navigate("/IndexCliente")
      }
    } catch (err) {
      setError(err.response.data.message)
    } finally {
      setloading(false)
    }

  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          type='text'
          name='email'
          value={formData.email}
          onChange={handleInputChange}
          placeholder='Email'
        />

        <input
          type='password'
          name='password'
          value={formData.password}
          onChange={handleInputChange}
          placeholder='Contraseña'
        />
        {error && <p className='error-message'>{error}</p>}
      </div>
      <button type='submit' disabled={loading}>
        {loading ? "Cargando..." : "Iniciar Sesion"}
      </button>
    </form>
  )
}

export default LoginForm
