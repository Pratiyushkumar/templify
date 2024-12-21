import { ChangeEvent, DragEvent, useRef, useState } from "react"
import useFileHandling from "./useFileHandling"
interface FileUploaderProps {
    onFileSelected: (file: File) => void
  }
const useFileUploader =  ({onFileSelected}: FileUploaderProps) => {
    const {handleResetData} = useFileHandling();
    const inputRef = useRef<HTMLInputElement>(null)
    const [error, setError] = useState("")
    const [file, setFile] = useState<File | null>(null)
  
    const [dragging, setDragging] = useState(false)
  
    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      setDragging(true)
    }
  
    const handleDragLeave = () => {
      setDragging(false)
    }
  
    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      setDragging(false)
  
      const uploadedFile = e.dataTransfer.files[0]
      if (uploadedFile) {
        handleFileChange({
          target: { files: [uploadedFile] },
        } as unknown as ChangeEvent<HTMLInputElement>)
      }
    }
  
    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0]
      if (file) {
         if (file.size > 2 * 1024 * 1024) {
           alert('File size exceeds 2MB. Please upload a smaller file.');
           if (inputRef.current) {
             inputRef.current.value = '';
           }
           return;
         }
        const isValid = [".xls", ".xlsx", ".csv"].some((ext) =>
          file.name.toLowerCase().endsWith(ext),
        )
  
        if (!isValid) {
          if (inputRef.current) {
            inputRef.current.value = ""
          }
          alert("Please upload only Excel (.xls, .xlsx) or CSV files")
          setError("Please upload only Excel (.xls, .xlsx) or CSV files")
          return
        }
  
        setFile(file)
        setError("")
        onFileSelected(file)
      }
    }

    const handleResetButton = () => {
      if(file){
        setFile(null);
        handleResetData();
      }
      if(inputRef.current){
        inputRef.current.value = ""
      }
      setError("");
    }

    return {handleDragLeave, handleDragOver, handleDrop, handleFileChange, error,file, inputRef, dragging, handleResetButton}
}

export default useFileUploader;