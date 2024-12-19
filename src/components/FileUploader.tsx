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

        const uploadedFile = e.dataTransfer.files[0];
        if (uploadedFile) {
          handleFileChange({ target: { files: [uploadedFile] } } as unknown as ChangeEvent<HTMLInputElement>);
        }        
      };

    // const triggerFileInput = () => {
    //     const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    //     fileInput.click();
    //   };
    // my changes end 

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const isValid = ['.xls', '.xlsx', '.csv'].some(ext => 
                file.name.toLowerCase().endsWith(ext)
            );
            
            if (!isValid) {
                if (inputRef.current) {
                    inputRef.current.value = '';
                }
                alert('Please upload only Excel (.xls, .xlsx) or CSV files');
                setError('Please upload only Excel (.xls, .xlsx) or CSV files')
                return;
            }
            
            setFile(file);
            setError('');
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
              <p className="text-gray-700 dark:text-gray-200">File Uploaded: {file.name}</p>
            ) : (
              <>
                <p className="text-gray-500 dark:text-gray-400 mb-4">Drag & Drop your file here</p>
              </>
            )}
          </div>
          <button onClick={() => inputRef.current?.click()}
          className="px-4 py-2 mt-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
              Click to Upload
          </button>
          {error && <p className="mt-2 text-red-500 text-sm">{error}</p>}
        </div>
      );
};

export default FileUploader;