import React from 'react';
import { RPPMFormData, PedagogyType } from '../types';
import { PEDAGOGY_OPTIONS, DIMENSION_OPTIONS } from '../constants';

interface RPPMFormProps {
  formData: RPPMFormData;
  onChange: (data: RPPMFormData) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

const RPPMForm: React.FC<RPPMFormProps> = ({ formData, onChange, onSubmit, isLoading }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    onChange({ ...formData, [name]: value });
  };

  const handleDimensionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    let newDimensions = [...formData.graduateDimensions];
    if (checked) {
      newDimensions.push(value);
    } else {
      newDimensions = newDimensions.filter((d) => d !== value);
    }
    onChange({ ...formData, graduateDimensions: newDimensions });
  };

  const inputClasses = "w-full rounded-md border-gray-700 bg-gray-800 text-white shadow-sm focus:border-secondary focus:ring focus:ring-secondary focus:ring-opacity-50 border p-2 placeholder-gray-500";
  const labelClasses = "block text-sm font-medium text-gray-300 mb-1";

  return (
    <div className="bg-gray-900 p-6 rounded-xl shadow-lg border border-gray-800">
      <h2 className="text-2xl font-bold text-secondary mb-6 border-b border-gray-800 pb-2">Input Data Perencanaan</h2>
      
      <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }} className="space-y-6">
        
        {/* Section 1: Data Guru & Sekolah */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={labelClasses}>Nama Satuan Pendidikan</label>
            <input required type="text" name="schoolName" value={formData.schoolName} onChange={handleChange} className={inputClasses} placeholder="SD Negeri 1 RPPM_PJOK" />
          </div>
          <div>
            <label className={labelClasses}>Jenjang Pendidikan</label>
            <select name="educationLevel" value={formData.educationLevel} onChange={handleChange} className={inputClasses}>
              <option value="SD">SD (Sekolah Dasar)</option>
              <option value="SMP">SMP (Sekolah Menengah Pertama)</option>
            </select>
          </div>
          <div>
            <label className={labelClasses}>Nama Guru PJOK</label>
            <input required type="text" name="teacherName" value={formData.teacherName} onChange={handleChange} className={inputClasses} />
          </div>
          <div>
            <label className={labelClasses}>NIP Guru</label>
            <input required type="text" name="teacherNip" value={formData.teacherNip} onChange={handleChange} className={inputClasses} />
          </div>
          <div>
            <label className={labelClasses}>Nama Kepala Sekolah</label>
            <input required type="text" name="principalName" value={formData.principalName} onChange={handleChange} className={inputClasses} />
          </div>
          <div>
            <label className={labelClasses}>NIP Kepala Sekolah</label>
            <input required type="text" name="principalNip" value={formData.principalNip} onChange={handleChange} className={inputClasses} />
          </div>
        </div>

        {/* Section 2: Kelas & Waktu */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-gray-800/50 p-4 rounded-lg border border-gray-800">
          <div>
            <label className={labelClasses}>Kelas</label>
            <input required type="text" name="className" value={formData.className} onChange={handleChange} placeholder="V (Lima)" className={inputClasses} />
          </div>
           <div>
            <label className={labelClasses}>Jumlah Pertemuan</label>
            <input required type="number" min="1" max="10" name="meetingCount" value={formData.meetingCount} onChange={handleChange} className={inputClasses} />
          </div>
          <div>
            <label className={labelClasses}>Durasi per Pertemuan</label>
            <input required type="text" name="duration" value={formData.duration} onChange={handleChange} placeholder="Contoh: 3 x 35 menit" className={inputClasses} />
          </div>
        </div>

        {/* Section 3: Materi & Kurikulum */}
        <div className="space-y-4">
          <div>
            <label className={labelClasses}>Materi Pelajaran (Topik Utama)</label>
            <input required type="text" name="material" value={formData.material} onChange={handleChange} placeholder="Contoh: Variasi dan Kombinasi Gerak Dasar Permainan Bola Besar (Sepak Bola)" className={inputClasses} />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div>
              <label className={labelClasses}>Capaian Pembelajaran (CP)</label>
              <textarea required name="learningOutcomes" rows={3} value={formData.learningOutcomes} onChange={handleChange} className={`${inputClasses} text-sm`} placeholder="Salin CP dari kurikulum..." />
            </div>
             <div>
              <label className={labelClasses}>Tujuan Pembelajaran (TP)</label>
              <textarea required name="learningObjectives" rows={3} value={formData.learningObjectives} onChange={handleChange} className={`${inputClasses} text-sm`} placeholder="Peserta didik mampu..." />
            </div>
          </div>

          <div>
            <label className={labelClasses}>Praktik Pedagogis (Model Utama)</label>
            <select name="pedagogy" value={formData.pedagogy} onChange={handleChange} className={inputClasses}>
              {PEDAGOGY_OPTIONS.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>

           <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">DIMENSI PROFIL LULUSAN</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {DIMENSION_OPTIONS.map(opt => (
                <label key={opt.value} className="flex items-center space-x-2 bg-gray-800 p-2 rounded border border-gray-700 hover:bg-gray-700 cursor-pointer transition-colors">
                  <input 
                    type="checkbox" 
                    value={opt.value} 
                    checked={formData.graduateDimensions.includes(opt.value)} 
                    onChange={handleDimensionChange}
                    className="rounded text-secondary focus:ring-secondary bg-gray-700 border-gray-600"
                  />
                  <span className="text-xs text-gray-300">{opt.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-4">
          <button 
            type="submit" 
            disabled={isLoading}
            className={`w-full py-4 px-6 rounded-lg text-white font-bold text-lg shadow-md transition-all 
              ${isLoading ? 'bg-gray-700 cursor-not-allowed text-gray-400' : 'bg-gradient-to-r from-primary to-secondary hover:from-green-800 hover:to-green-700 hover:shadow-xl transform hover:-translate-y-1'}`}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Sedang Menganalisis & Menyusun RPPM...
              </span>
            ) : 'GENERATE RPPM OTOMATIS'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RPPMForm;