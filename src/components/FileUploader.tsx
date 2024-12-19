import { ChangeEvent, useRef, useState, DragEvent} from 'react';

interface FileUploaderProps {
    onFileSelected: (file: File) => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({ onFileSelected }) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [error, setError] = useState('');
    const [file, setFile] = useState<File | null>(null);
    // my changes 
    const [dragging, setDragging] = useState(false);
  
    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setDragging(true);
    };
  
    const handleDragLeave = () => {
      setDragging(false);
    };
  
    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragging(false);
    
        // const uploadedFile = e.dataTransfer.files[0];
    
        // if (uploadedFile && uploadedFile.type === 'application/vnd.ms-excel') {
        //   setFile(uploadedFile);
        //   setError('');
        // } else {
        //   setError('Only .xls files are allowed!');
        // }
      };

    const triggerFileInput = () => {
        const fileInput = document.getElementById('fileInput') as HTMLInputElement;
        fileInput.click();
      };
    // my changes end 

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const isValid = ['.xls', '.xlsx', '.csv'].some(ext => 
                file.name.toLowerCase().endsWith(ext)
            );
            
            if (!isValid) {
                // Reset the input value
                if (inputRef.current) {
                    inputRef.current.value = '';
                }
                alert('Please upload only Excel (.xls, .xlsx) or CSV files');
                setError('Please upload only Excel (.xls, .xlsx) or CSV files')
                return;
            }
            
            setFile(file);
            onFileSelected(file);
        }
    };

    

    return (
        <div className="flex flex-col items-center mt-10">
          <div
            className={`
              w-1/2 h-64 rounded-lg border-2 border-dashed
              ${dragging ? 'border-blue-500 bg-blue-100 dark:bg-blue-900' : 'border-gray-200  bg-gray-50 dark:bg-gray-800'}
              flex justify-center items-center text-center
              transition-all duration-300 cursor-pointer
            `}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={triggerFileInput}
          >
            {file ? (
              <p className="text-gray-700 dark:text-gray-200">File Uploaded: {file.name}</p>
            ) : (
              <p className="text-gray-500 dark:text-gray-400">Drag & Drop your file here or click to upload</p>
            )}
            <input
              id="fileInput"
              type="file"
              accept=".xlsx, .xls"
              onChange={handleFileChange}
              className="hidden"
            />
            <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]">
                            
            </div>
          </div>
          {error && <p className="mt-2 text-red-500 text-sm">{error}</p>}
        </div>
      );
};

export default FileUploader;

