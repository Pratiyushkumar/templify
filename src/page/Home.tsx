import { useState } from 'react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import FileUploader from '../components/FileUploader';
import TemplateSelector from '../components/TemplateSelector';
import FileHeaders from '../components/FileHeaders';
import ProcessedData from '../components/ProcessedData';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import Navbar from '../components/ui/navbar';


pdfMake.vfs = pdfFonts.vfs;

const Home = () => {
  const [, setFile] = useState<File | null>(null);
  const [headers, setHeaders] = useState<string[]>([]);
  const [tableData, setTableData] = useState<{ [key: string]: string }[]>([]);
  const [, setTemplate] = useState<string>('');
  const [processedData, setProcessedData] = useState<string[]>([]);
  const ALLOWED_FILE_EXTENSIONS = ['.xls', '.xlsx', '.csv'];


  const handleFileSelected = (file: File) => {
    if (!ALLOWED_FILE_EXTENSIONS.some(ext => file.name.toLowerCase().endsWith(ext))) {
        alert('Please upload only Excel (.xls, .xlsx) or CSV files');
        return;
      }
    setFile(file);
    const reader = new FileReader();
    reader.onload = (event) => {
      const binaryStr = event.target?.result;
      const workbook = XLSX.read(binaryStr, { type: 'binary' });

      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet) as {
        [key: string]: string;
      }[];

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

  const downloadProcessedData = (format: 'txt' | 'pdf') => {
    if (format === 'txt') {
      const blob = new Blob([processedData.join('\n')], {
        type: 'text/plain;charset=utf-8',
      });
      saveAs(blob, 'processed_data.txt');
    } else {
      const docDefinition = {
        content: [
          { text: 'Processed Data', style: 'header' },
          { text: '\n' },
          ...processedData.map(data => ({ text: data }))
        ],
        styles: {
          header: {
            fontSize: 18,
            bold: true,
            marginBottom: 10
          }
        }
      };

      pdfMake.createPdf(docDefinition).download('processed_data.pdf');
    }
  };
  
  return (
    <div className='min-h-screen h-full  w-full -mt-5 bg-black space-y-5'>
      <Navbar/>

      <div className='w-full md:w-3/4 mx-auto p-5 py-12 md:p-14'>  

        <FileUploader onFileSelected={handleFileSelected} />

        {headers.length > 0 && <FileHeaders headers={headers} />}

        <TemplateSelector onCustomTemplateSelected={handleTemplateSelected} />

        {processedData.length > 0 && (
          <ProcessedData
            data={processedData}
            downloadProcessedData={downloadProcessedData}
          />
        )}
      </div>
    </div>
    
  );
};

export default Home;
