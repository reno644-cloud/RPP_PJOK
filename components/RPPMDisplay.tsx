import React, { useRef } from 'react';

interface RPPMDisplayProps {
  htmlContent: string;
}

const RPPMDisplay: React.FC<RPPMDisplayProps> = ({ htmlContent }) => {
  const contentRef = useRef<HTMLDivElement>(null);

  const handleDownloadWord = () => {
    // Wrap content in a basic HTML structure for Word compatibility
    const header = "<html xmlns:o='urn:schemas-microsoft-com:office:office' " +
                   "xmlns:w='urn:schemas-microsoft-com:office:word' " +
                   "xmlns='http://www.w3.org/TR/REC-html40'>" +
                   "<head><meta charset='utf-8'><title>RPPM PJOK</title>" +
                   "<style>body { font-family: Arial, sans-serif; } table { border-collapse: collapse; width: 100%; } td { border: 1px solid black; padding: 5px; }</style>" +
                   "</head><body>";
    const footer = "</body></html>";
    const sourceHTML = header + htmlContent + footer;

    const source = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(sourceHTML);
    const fileDownload = document.createElement("a");
    document.body.appendChild(fileDownload);
    fileDownload.href = source;
    fileDownload.download = 'RPPM_PJOK_Output.doc';
    fileDownload.click();
    document.body.removeChild(fileDownload);
  };

  return (
    <div className="bg-gray-900 p-6 rounded-xl shadow-lg border border-gray-800 mt-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 sticky top-0 bg-gray-900 z-10 py-4 border-b border-gray-800">
        <h2 className="text-2xl font-bold text-gray-100">Hasil RPPM Siap Cetak</h2>
        <div className="flex space-x-3 mt-4 md:mt-0">
             <button 
            onClick={handleDownloadWord}
            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            <span>Download Microsoft Word</span>
          </button>
        </div>
      </div>

      <div className="mb-4 p-4 bg-green-900/50 text-green-300 rounded-lg border border-green-800">
          <strong>Siap Unduh!</strong> Klik tombol di atas untuk mengunduh file .doc yang dapat diedit langsung di Microsoft Word.
      </div>

      {/* Preview Container - Kept white to simulate paper and ensure output is black text as requested */}
      <div className="overflow-x-auto border border-gray-700 rounded-lg bg-gray-800 p-2 md:p-8 min-h-[500px]">
        <div 
            ref={contentRef}
            className="prose max-w-none bg-white p-8 shadow-sm text-black"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
            style={{ 
                fontFamily: 'Arial, sans-serif',
                color: 'black', 
                fontSize: '11pt'
            }}
        />
      </div>
    </div>
  );
};

export default RPPMDisplay;