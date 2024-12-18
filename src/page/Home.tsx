import { ChangeEvent, useState } from 'react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Button } from '../components/ui/button';

const Home = () => {
    const [file, setFile] = useState<File | null>(null);
    const [headers, setHeaders] = useState<string[]>([]);
    const [tableData, setTableData] = useState<{ [key: string]: string }[]>([]);
    const [template, setTemplate] = useState<string>('');
    const [processedData, setProcessedData] = useState<string[]>([]);

    const generateTemplates = (headers: string[]) => {
        return {
            "Basic Information": headers.map(header => `${header}: @${header}`).join(", "),
            "Prettier Format": headers.map(header => `${header}: @${header}`).join("\n"),
            "Identifier Format": `Identifier: ${headers.map(h => `@${h}`).join("-")}, ${headers.map(header => `${header}: @${header}`).join(", ")}`,
            "CSV Export Format": headers.map(header => `${header}: @${header}`).join(", "),
        };
    };

    const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
        const uploadedFile = e.target.files?.[0];

        if (uploadedFile) {
            setFile(uploadedFile);
            const reader = new FileReader();
            reader.onload = (event) => {
                const binaryStr = event.target?.result;
                const workbook = XLSX.read(binaryStr, { type: 'binary' });

                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const jsonData = XLSX.utils.sheet_to_json(worksheet) as { [key: string]: string }[];

                if (jsonData.length > 0) {
                    const extractedHeaders = Object.keys(jsonData[0]);
                    setHeaders(extractedHeaders);
                    setTableData(jsonData);
                    setTemplate('');
                }
            };

            reader.readAsArrayBuffer(uploadedFile);
        }
    };

    const processData = () => {
        const processed = tableData.map((row) => {
            let processedRow = template;
            headers.forEach((header) => {
                const regex = new RegExp(`@${header}`, 'g');
                processedRow = processedRow.replace(regex, row[header] || '');
            });
            return processedRow;
        });
        setProcessedData(processed);
        console.log("Processed Data:", processed);
    };

    const downloadProcessedData = () => {
        const blob = new Blob([processedData.join('\n')], { type: 'text/plain;charset=utf-8' });
        saveAs(blob, 'processed_data.txt');
    };

    return (
        <section>
            <h1>File Processor</h1>

            <div className="grid w-full max-w-sm items-center gap-4">
                <Input
                    type="file"
                    accept=".xlsx,.xls"
                    className="mb-4"
                    onChange={handleFileUpload}
                />
            </div>

            {headers.length > 0 && (
                <div className="mb-4">
                    <h3 className="text-lg font-semibold mb-2">File Headers</h3>
                    <div className="flex flex-wrap gap-2">
                        {headers.map((header) => (
                            <span
                                key={header}
                                className="bg-blue-100 text-blue-800 px-2 py-1 rounded"
                            >
                                {header}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            <div className="mb-4">
                    <Label>Select Template</Label>
                    <select
                        value={template}
                        onChange={(e) => setTemplate(e.target.value)}
                        className="border rounded p-2 mb-2 w-full"
                    >
                        <option value="">-- Select a Template --</option>
                        {Object.entries(generateTemplates(headers)).map(([key, value]) => (
                            <option key={key} value={value}>
                                {key}
                            </option>
                        ))}
                    </select>
                    <Button onClick={processData} disabled={!template}>
                        Process Data
                    </Button>
                </div>

            {processedData.length > 0 && (
                <div>
                    <h3 className="text-lg font-semibold mb-2">Processed Data</h3>
                    <div className="bg-gray-100 p-4 rounded max-h-60 overflow-y-auto">
                        {processedData.map((row, index) => (
                            <div key={index} className="mb-2">
                                {row}
                            </div>
                        ))}
                    </div>
                    <Button onClick={downloadProcessedData} className="mt-2">
                        Download Processed Data
                    </Button>
                </div>
            )}
        </section>
    );
};

export default Home;