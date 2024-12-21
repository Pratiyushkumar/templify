import FileUploader from "../components/FileUploader"
import TemplateSelector from "../components/TemplateSelector"
import FileHeaders from "../components/FileHeaders"
import ProcessedData from "../components/ProcessedData"
import Navbar from "../components/ui/navbar"
import useFileHandling from "../hooks/useFileHandling"

const Home = () => {
  const {
    handleFileSelected,
    handleTemplateSelected,
    downloadProcessedData,
    headers,
    processedData,
  } = useFileHandling()

  return (
    <div className="min-h-screen overflow-hidden  w-full  bg-black space-y-5">
      <Navbar />

      <div className="w-full md:w-3/4 mx-auto p-5 py-12 md:p-14">
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
  )
}

export default Home
