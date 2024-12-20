import { useState } from "react"
import { useAuth } from "./useAuth"
import { useNavigate } from "react-router"

const useSignup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [errorMessage, setErrorMessage] = useState("")
  const { registerUser, loading } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage("") // Clear any previous errors

    const { name, email, password, confirmPassword } = formData

    // Client-side validation
    if (!name || !email || !password || !confirmPassword) {
      setErrorMessage("All fields are required")
      return
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match")
      return
    }

    if (password.length < 8) {
      setErrorMessage("Password must be at least 8 characters long")
      return
    }
    try {
      await registerUser(name, email, password)
      navigate("/home")
      // Registration successful - the AuthContext will handle the redirect/state update
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message)
      } else {
        setErrorMessage("An unexpected error occurred. Please try again.")
      }
    }
  }

  return {formData, setFormData,errorMessage, setErrorMessage,registerUser, loading, handleChange, handleSubmit,}
}

export default useSignup
