import UploadedFileInfo from "./UploadedFileInfo"
import { FaRegCircleCheck } from "react-icons/fa6"
import useFileUploader from "../hooks/useFileUploader"
import BackgroundGrid from "./BackgroundGrid"
import DragDrop from "./DragDrop"
import ResetButton from "./ResetButton"
interface FileUploaderProps {
  onFileSelected: (file: File) => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({ onFileSelected }) => {
  
  const {
    handleDragLeave,
    handleDragOver,
    handleDrop,
    handleFileChange,
    error,
    file,
    inputRef,
    dragging,
    handleResetButton
  } = useFileUploader({ onFileSelected })
  return (
    <div className="w-full flex flex-col items-center my-8 ">
      <div
        onClick={() => inputRef.current?.click()}
        className={`relative
        w-full max-w-md h-48 rounded-lg border-2 border-dashed
        ${dragging
            ? 'border-blue-500 bg-blue-100 dark:bg-blue-900'
            : 'border-gray-500 bg-slate-800 dark:bg-gray-800'
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

        <BackgroundGrid />
        
        {file ? (
          <div className="px-5 space-y-2">
            <div className="flex items-center  text-gray-300 gap-2">
              <FaRegCircleCheck className=" w-3 h-3" />
              <p className="text-sm tracking-wider normal-case">
                File uploaded successfully
              </p>
            </div>
            <UploadedFileInfo file={file} />
          </div>
        ) : (
          <DragDrop />
        )}
      </div>

      {error && <p className="mt-2 text-red-500 text-sm">{error}</p>}
      {
        file && <ResetButton handleResetButton={handleResetButton}/>
      }
    </div>
  )
}

export default FileUploader;
