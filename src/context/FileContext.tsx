import React, { createContext, useContext, useState } from 'react';

interface FileContextProps {
  file: File | null;
  setFile: (file: File | null) => void;
  headers: string[];
  setHeaders: (headers: string[]) => void;
  tableData: { [key: string]: string }[];
  setTableData: (tableData: { [key: string]: string }[]) => void;
  template: string;
  setTemplate: (template: string) => void;
  processedData: string[];
  setProcessedData: (processedData: string[]) => void;
}

const FileContext = createContext<FileContextProps>({
  file: null,
  setFile: () => {},
  headers: [],
  setHeaders: () => {},
  tableData: [],
  setTableData: () => {},
  template: '',
  setTemplate: () => {},
  processedData: [],
  setProcessedData: () => {},
});

const FileContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [file, setFile] = useState<File | null>(null);
  const [headers, setHeaders] = useState<string[]>([]);
  const [tableData, setTableData] = useState<{ [key: string]: string }[]>([]);
  const [template, setTemplate] = useState<string>('');
  const [processedData, setProcessedData] = useState<string[]>([]);

  
  return (
    <FileContext.Provider
      value={{
        file,
        setFile,
        headers,
        setHeaders,
        tableData,
        setTableData,
        template,
        setTemplate,
        processedData,
        setProcessedData,
      }}
    >
      {children}
    </FileContext.Provider>
  );
};

 const useFileContext = () => {
  return useContext(FileContext);
};

export { FileContext,useFileContext };
export default FileContextProvider