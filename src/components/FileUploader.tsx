import { ChangeEvent, useRef } from 'react';
import { Input } from '../components/ui/input';

interface FileUploaderProps {
    onFileSelected: (file: File) => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({ onFileSelected }) => {
    const inputRef = useRef<HTMLInputElement>(null);

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
                return;
            }
            
            onFileSelected(file);
        }
    };

    return (
        <div className="grid w-full max-w-sm items-center gap-4">
            <Input
                ref={inputRef}
                type="file"
                accept=".xlsx,.xls,.csv"
                className="mb-4"
                onChange={handleFileChange}
            />
        </div>
    );
};

export default FileUploader;