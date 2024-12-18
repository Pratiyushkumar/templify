// src/page/Home.tsx
import React, { useState } from 'react';
// import { FileUploader } from '../components/FileUploader';
// import { FileHeaders } from '../components/FileHeaders';
// import { TemplateSelector } from '../components/TemplateSelector';
// import { ProcessedData } from '../components/ProcessedData';
import { generateTemplates } from '../utils/generateTemplate';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import FileUploader from '../components/FileUploader';
import TemplateSelector from '../components/TemplateSelector';
import FileHeaders from '../components/FileHeaders';
import ProcessedData from '../components/ProcessedData';

const Home = () => {
    const [, setFile] = useState<File | null>(null);
    const [headers, setHeaders] = useState<string[]>([]);
    const [tableData, setTableData] = useState<{ [key: string]: string }[]>([]);
    const [, setTemplate] = useState<string>('');
    const [processedData, setProcessedData] = useState<string[]>([]);

    const handleFileSelected = (file: File) => {
        setFile(file);
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

        reader.readAsArrayBuffer(file);
    };

    const handleTemplateSelected = (template: string) => {
        setTemplate(template);
        const processed = tableData.map((row) => {
            let processedRow = template;
            headers.forEach((header) => {
                const regex = new RegExp(`@${header}`, 'g');
                processedRow = processedRow.replace(regex, row[header] || '');
            });
            return processedRow;
        });
        setProcessedData(processed);
    };

    const downloadProcessedData = () => {
        const blob = new Blob([processedData.join('\n')], { type: 'text/plain;charset=utf-8' });
        saveAs(blob, 'processed_data.txt');
    };

    return (
        <section>
            <h1>File Processor</h1>

            <FileUploader onFileSelected={handleFileSelected} />

            {headers.length > 0 && <FileHeaders headers={headers} />}

            <TemplateSelector
                templates={generateTemplates(headers)}
                onTemplateSelected={handleTemplateSelected}
            />

            {processedData.length > 0 && (
                <ProcessedData data={processedData} downloadProcessedData={downloadProcessedData} />
            )}
        </section>
    );
};

export default Home;