import { useContext } from "react"
import { FileContext } from "../context/FileContext"

export const useFileContext = () => {
    return useContext(FileContext)
  }