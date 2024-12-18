interface FileHeadersProps {
    headers: string[];
}

const FileHeaders: React.FC<FileHeadersProps> = ({ headers }) => {
    return (
        <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">File Headers</h3>
            <div className="flex flex-wrap gap-2">
                {headers.map((header) => (
                    <span key={header} className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        {header}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default FileHeaders;