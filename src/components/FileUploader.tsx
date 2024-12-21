import { ChangeEvent, useRef, useState, DragEvent } from "react"
import { BsCloudUpload } from "react-icons/bs";
import UploadedFileInfo from "./UploadedFileInfo";

import { FaRegCircleCheck } from "react-icons/fa6";
interface FileUploaderProps {
  onFileSelected: (file: File) => void
}


const FileUploader: React.FC<FileUploaderProps> = ({ onFileSelected }) => {
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

  // const triggerFileInput = () => {
  //     const fileInput = document.getElementById('fileInput') as HTMLInputElement;
  //     fileInput.click();
  //   };
  // my changes end

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
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

  return (
    <div className="flex flex-col items-center my-8">
    <div
      onClick={() => inputRef.current?.click()}
      className={`
        w-full max-w-md h-48 rounded-lg border-2 border-dashed
        ${
          dragging
            ? "border-blue-500 bg-blue-100 dark:bg-blue-900"
            : "border-gray-500 bg-slate-800 dark:bg-gray-800"
        }
        flex flex-col justify-center items-center text-center
        transition-all duration-300 cursor-pointer
      `}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        ref={inputRef}
        id="fileInput"
        type="file"
        accept=".xlsx, .xls, .csv"
        onChange={handleFileChange}
        className="hidden"
      />
      {file ? (
        <div className="px-5 space-y-2">
          <div className="flex items-center  text-gray-300 gap-2">
            <FaRegCircleCheck className=" w-3 h-3" />
            <p className="text-sm tracking-wider normal-case">File uploaded successfully</p>
        </div>
          <UploadedFileInfo file={file} />
        </div>
      ) : (
        <div className="flex flex-col items-center gap-1">
          <div className="flex flex-col items-center space-x-2 text-gray-400 gap-1">
            <BsCloudUpload className="text-gray-400 w-7 h-7 md:w-8 md:h-8" />
            <p className="text-[14px] md:text-[16px] dark:text-gray-400">
              <span className="underline underline-offset-2">Click to upload</span> or drag &
              drop
            </p>
          </div>
          <div className="text-gray-400 space-y-2 md:space-y-1">
            <p className="text-sm md:text-[12px] md:text-sm">Maximum file size is 2 MB</p>
            <p className="text-[12px] md:text-sm">Accepted file formats are:</p>
          </div>
  
          <div className="flex space-x-3 mt-1">
            <img
              src="../../src/assets/icons/csv-file.png"
              alt="CSV"
              className="w-8 h-8"
            />
            <img
              src="../../src/assets/icons/xls.png"
              alt="XLSX"
              className="w-8 h-8"
            />
          </div>
        </div>
      )}
    </div>
  
    {error && <p className="mt-2 text-red-500 text-sm">{error}</p>}
  </div>
  )
}

export default FileUploader
