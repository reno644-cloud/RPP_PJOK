import React, { useRef, useState } from 'react';

interface RPPMDisplayProps {
  htmlContent: string;
}

const RPPMDisplay: React.FC<RPPMDisplayProps> = ({ htmlContent }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied' | 'error'>('idle');

  const handleCopyAndOpenDocs = async () => {
    if (!contentRef.current) return;

    try {
      // Create a blob with the HTML content type specifically for Word/Docs pasting
      const blob = new Blob([htmlContent], { type: 'text/html' });
      const plainTextBlob = new Blob([contentRef.current.innerText], { type: 'text/plain' });
      
      const item = new ClipboardItem({
        'text/html': blob,
        'text/plain': plainTextBlob,
      });

      await navigator.clipboard.write([item]);
      
      setCopyStatus('copied');
      
      // Open Google Docs in a new tab
      window.open('https://docs.google.com/create', '_blank');

      setTimeout(() => setCopyStatus('idle'), 3000);
    } catch (err) {
      console.error('Failed to copy: ', err);
      setCopyStatus('error');
    }
  };

  return (
    <div className="bg-gray-900 p-6 rounded-xl shadow-lg border border-gray-800 mt-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 sticky top-0 bg-gray-900 z-10 py-4 border-b border-gray-800">
        <h2 className="text-2xl font-bold text-gray-100">Hasil RPPM Siap Cetak</h2>
        <div className="flex space-x-3 mt-4 md:mt-0">
             <button 
            onClick={handleCopyAndOpenDocs}
            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
            </svg>
            <span>{copyStatus === 'copied' ? 'Tersalin! Membuka Docs...' : 'Salin & Buka Google Dokumen'}</span>
          </button>
        </div>
      </div>

      {copyStatus === 'copied' && (
        <div className="mb-4 p-4 bg-green-900/50 text-green-300 rounded-lg border border-green-800">
          <strong>Berhasil disalin!</strong> Tab Google Docs baru telah dibuka. Tekan <strong>Ctrl+V</strong> (atau Cmd+V) di dokumen kosong untuk menempelkan tabel.
        </div>
      )}

      {/* Preview Container - Kept white to simulate paper and ensure output is black text as requested */}
      <div className="overflow-x-auto border border-gray-700 rounded-lg bg-gray-800 p-2 md:p-8 min-h-[500px]">
        <div 
            ref={contentRef}
            className="prose max-w-none bg-white p-8 shadow-sm text-black"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
            style={{ 
                // Specific styles to help WYSIWYG copy
                fontFamily: 'Arial, sans-serif',
                color: 'black', // Explicitly set text color to black for the output
                fontSize: '11pt'
            }}
        />
      </div>
    </div>
  );
};

export default RPPMDisplay;