import { ChangeEvent, useState } from 'react';
import { Input } from '../components/ui/input';

interface FileUploaderProps {
    onFileSelected: (file: File) => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({ onFileSelected }) => {
    const [, setFile] = useState<File | null>(null);

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const uploadedFile = event.target.files?.[0];
        if (uploadedFile) {
            setFile(uploadedFile);
            onFileSelected(uploadedFile);
        }
    };

    return (
        <div className="grid w-full max-w-sm items-center gap-4">
            <Input
                type="file"
                accept=".xlsx,.xls"
                className="mb-4"
                onChange={handleFileChange}
            />
        </div>
    );
};

export default FileUploader;