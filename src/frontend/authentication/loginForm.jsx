import React, { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import Modal, { useModal } from "../Modal"


function LoginForm() {
  const navigate = useNavigate()
  const { isOpen, openModal, closeModal } = useModal()
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })
  const [recoverData, setRecoverData] = useState({
    email: "",
    password: "",
    verifyPassword: "",
    token: ""
  })

  const [loading, setloading] = useState(false)
  const [error, setError] = useState("")

  const handleInputChange = (stateSetter) => (e) => {
    const { name, value } = e.target
    stateSetter((prevData) => ({
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


  const s = () => {
    alert("hola")
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            className="lg-input"
            type='text'
            name='email'
            value={formData.email}
            onChange={handleInputChange(setFormData)}
            placeholder='Email'
            disabled={loading}
          />

          <input
            className="lg-input"
            type='password'
            name='password'
            value={formData.password}
            onChange={handleInputChange(setFormData)}
            placeholder='Contraseña'
            disabled={loading}
          />
          {error && <p className='error-message'>{error}</p>}
        </div>
        <button className="lg-button" type='submit' disabled={loading}>
          {loading ? "Cargando..." : "Iniciar Sesion"}
        </button>
      </form>
      <button className="lg-button" onClick={openModal}>Recuperar contraseña</button>
      <Modal isOpen={isOpen} onClose={closeModal} title={"Recuperar contraseña"} onAccept={s}>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Ingrese un correo electrónico para recuperar su contraseña
              <input
                className="lg-input"
                type='text'
                name='email'
                value={recoverData.email}
                onChange={handleInputChange(setRecoverData)}
                placeholder='Email'
              />
            </label>
          </div>
        </form>


      </Modal>

    </>
  )
}

export default LoginForm
