import { BsCloudUpload } from "react-icons/bs"
function DragDrop() {
  return (
    <div className="flex flex-col items-center gap-1">
            <div className="flex flex-col items-center space-x-2 text-gray-400 gap-1">
              <BsCloudUpload className="text-gray-400 w-7 h-7 md:w-8 md:h-8" />
              <p className="text-[14px] md:text-[16px] dark:text-gray-400">
                <span className="underline underline-offset-2">
                  Click to upload
                </span>{" "}
                or drag & drop
              </p>
            </div>
            <div className="text-gray-400 space-y-2 md:space-y-1">
              <p className="text-sm md:text-[12px] md:text-sm">
                Maximum file size is 10 MB
              </p>
              <p className="text-[12px] md:text-sm">
                Accepted file formats are:
              </p>
            </div>

            <div className="flex space-x-3 mt-1">
              <img
                src="../../src/assets/icons/csv-file.png"
                alt="CSV"
                className="w-8 h-8"
              />
              <img
                src="../../src/assets/icons/xls.png"
                alt="XLSX"
                className="w-8 h-8"
              />
            </div>
          </div>
  )
}

export default DragDrop