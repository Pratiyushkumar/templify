import { useState } from "react"
import { useAuth } from "./useAuth"
import { useNavigate } from "react-router"
import toast from "react-hot-toast"

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
    setErrorMessage("")

    const { name, email, password, confirmPassword } = formData

    if (!name || !email || !password || !confirmPassword) {
      setErrorMessage("All fields are required")
      toast.error("All fields are required");
      return
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match")
      toast.error("Passwords do not match")
      return
    }

    if (password.length < 8) {
      setErrorMessage("Password must be at least 8 characters long")
      toast.error("Password must be at least 8 characters long")
      return
    }

    const toastId = toast.loading('creating account ...')
    try {
      await registerUser(name, email, password)
      navigate("/home")
      toast.success("Account create successfully");
    
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message)
        setErrorMessage(error.message)
      } else {
        setErrorMessage("An unexpected error occurred. Please try again.")
        toast.error("An unexpected error occurred. Please try again.")
      }
    }
    finally{
      toast.dismiss(toastId);
    }
  }

  return {formData, setFormData,errorMessage, setErrorMessage,registerUser, loading, handleChange, handleSubmit,}
}

export default useSignup
