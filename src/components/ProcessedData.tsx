interface ProcessedDataProps {
    data: string[];
    downloadProcessedData: (format: 'txt' | 'pdf') => void;
}

const ProcessedData: React.FC<ProcessedDataProps> = ({ data, downloadProcessedData }) => {
    return (
        <div>
            <h3 className="text-lg text-white font-semibold mb-2">Preview</h3>
            <div className="bg-slate-800 border border-gray-400 text-gray-300 p-4 rounded-lg max-h-60 overflow-y-auto">
                {data.map((row, index) => (
                    <pre
                        key={index}
                        className="font-sans mb-4 last:mb-0 whitespace-pre-wrap break-words"
                    >
                        {row}
                    </pre>
                ))}
            </div>
            <div className="flex gap-2 text-white mt-5 text-sm md:text-base">
                <button className='px-2 md:px-5 py-3 border border-gray-400 rounded-lg' onClick={() => downloadProcessedData('txt')}>
                    <p >Download as TXT</p>
                </button>
                <button className='px-2 md:px-5 py-3 border border-gray-400 rounded-lg' onClick={() => downloadProcessedData('pdf')}>
                    Download as PDF
                </button>
            </div>
        </div>
    );
};

export default ProcessedData;