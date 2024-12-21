import React from "react"
import LoginForm from "./loginForm"
import "./Loginpage.css"

const LoginPage = () => {
  return (
    <div className='login-page'>
      <h2>Iniciar sesión</h2>
      <LoginForm />
    </div>
  )
}

export default LoginPage
