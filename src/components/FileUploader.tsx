import { ChangeEvent, useRef } from 'react';
import { Input } from '../components/ui/input';
import { FileUpload } from './ui/file-upload';

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
        <div className='w-1/2 mx-auto border border-dashed border-gray-300'>
            <FileUpload onChange={handleFileChange} />
        </div>
    );
};

export default FileUploader;