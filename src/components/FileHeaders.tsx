interface FileHeadersProps {
    headers: string[];
}

const FileHeaders: React.FC<FileHeadersProps> = ({ headers }) => {
    return (
        <div className="flex flex-wrap gap-4 p-4">
      {headers.map((item, index) => (
        <div
          key={index}
          className="flex items-center justify-center bg-gray-400 text-white p-4 rounded shadow-md w-24 h-10"
        >
          {item}
        </div>
      ))}
    </div>
    );
};

export default FileHeaders;