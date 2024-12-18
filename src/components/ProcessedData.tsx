import { Button } from './ui/button';

interface ProcessedDataProps {
    data: string[];
    downloadProcessedData: (format:'txt'|'pdf') => void;
}

const ProcessedData: React.FC<ProcessedDataProps> = ({ data, downloadProcessedData }) => {
    return (
        <div>
            <h3 className="text-lg font-semibold mb-2">Processed Data</h3>
            <div className="bg-gray-100 p-4 rounded max-h-60 overflow-y-auto">
                {data.map((row, index) => (
                    <div key={index} className="mb-2">
                        {row}
                    </div>
                ))}
            </div>
            <div className="flex gap-2">
            <Button onClick={() => downloadProcessedData('txt')}>
            Download as TXT
            </Button>
            <Button onClick={() => downloadProcessedData('pdf')}>
            Download as PDF
            </Button>
        </div>
        </div>
    );
};

export default ProcessedData;