import React, { useState } from 'react';
import RPPMForm from './components/RPPMForm';
import RPPMDisplay from './components/RPPMDisplay';
import { RPPMFormData } from './types';
import { INITIAL_FORM_STATE } from './constants';
import { generateRPPM } from './services/geminiService';

const App: React.FC = () => {
  const [formData, setFormData] = useState<RPPMFormData>(INITIAL_FORM_STATE);
  const [generatedHtml, setGeneratedHtml] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    // Basic validation
    if (!formData.schoolName || !formData.teacherName || !formData.material || formData.graduateDimensions.length === 0) {
      alert("Mohon lengkapi semua field wajib dan pilih minimal satu Dimensi Profil Pelajar.");
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const html = await generateRPPM(formData);
      setGeneratedHtml(html);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan yang tidak diketahui.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black pb-20">
      {/* Header */}
      <header className="bg-gray-900 border-b border-gray-800 text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center space-x-4 w-full md:w-auto">
                <div className="bg-gray-800 p-2 rounded-full">
                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-secondary">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                    </svg>
                </div>
              <div>
                  <h1 className="text-xl md:text-2xl font-bold uppercase tracking-wide text-white">RPP_PJOK</h1>
                  <p className="text-sm md:text-base text-gray-400">SD Sungaiselan</p>
              </div>
            </div>
            
            <div className="text-center md:text-right w-full md:w-auto border-t md:border-t-0 border-gray-700 pt-2 md:pt-0">
                <p className="text-xs text-gray-500 uppercase tracking-wider">Pencipta aplikasi</p>
                <p className="font-semibold text-secondary">Reno Aprial, S.pd.</p>
            </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Info Banner */}
        <div className="bg-gray-900 border-l-4 border-secondary p-4 mb-8 rounded-r-md">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-secondary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-300">
                Isi formulir di bawah ini sesuai data real. AI akan menyusun langkah pembelajaran PJOK yang spesifik (Pemanasan, Inti, Pendinginan) sesuai model pedagogis yang dipilih.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8">
          <RPPMForm 
            formData={formData} 
            onChange={setFormData} 
            onSubmit={handleSubmit} 
            isLoading={isLoading} 
          />

          {error && (
             <div className="bg-red-900/50 border-l-4 border-red-500 p-4 rounded-r-md">
              <div className="flex">
                <div className="ml-3">
                  <p className="text-sm text-red-200 font-bold">Error:</p>
                  <p className="text-sm text-red-300">{error}</p>
                </div>
              </div>
            </div>
          )}

          {generatedHtml && !isLoading && (
            <RPPMDisplay htmlContent={generatedHtml} />
          )}
        </div>
      </main>
      
      <footer className="bg-gray-900 border-t border-gray-800 text-gray-500 py-6 mt-12">
          <div className="max-w-7xl mx-auto text-center text-sm">
              <p>&copy; {new Date().getFullYear()} RPP_PJOK SD Sungaiselan. Dibuat dengan Teknologi Gemini AI.</p>
          </div>
      </footer>
    </div>
  );
};

export default App;