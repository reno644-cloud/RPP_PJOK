import { GoogleGenAI } from "@google/genai";
import { RPPMFormData } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateRPPM = async (data: RPPMFormData): Promise<string> => {
  const model = "gemini-3-flash-preview";

  const prompt = `
    Bertindaklah sebagai Ahli Kurikulum PJOK (Pendidikan Jasmani, Olahraga, dan Kesehatan) dan Teknolog Pendidikan yang profesional. 
    Tugas Anda adalah membuat "Perencanaan Pembelajaran Mendalam (RPPM)" yang sangat detail, operasional, dan siap cetak untuk guru PJOK.
    
    DATA INPUT:
    - Satuan Pendidikan: ${data.schoolName}
    - Guru: ${data.teacherName} (NIP: ${data.teacherNip})
    - Kepala Sekolah: ${data.principalName} (NIP: ${data.principalNip})
    - Jenjang: ${data.educationLevel}
    - Kelas: ${data.className}, Semester: ${data.semester}
    - Mata Pelajaran: PJOK
    - CP: ${data.learningOutcomes}
    - TP: ${data.learningObjectives}
    - Materi: ${data.material}
    - Pertemuan: ${data.meetingCount} kali
    - Durasi: ${data.duration} per pertemuan
    - Model Pembelajaran Dominan: ${data.pedagogy}
    - Dimensi Profil Lulusan: ${data.graduateDimensions.join(", ")}

    INSTRUKSI KHUSUS & FORMAT OUTPUT:
    Hasilkan output dalam format HTML yang terdiri dari **BEBERAPA TAG <table> TERPISAH** (Satu tabel untuk setiap Bagian 1-5 dan Tanda Tangan).
    Penggunaan tabel terpisah SANGAT PENTING agar lebar kolom (30% vs 20%) dapat diatur dengan presisi tanpa saling mempengaruhi.
    
    ATURAN CSS, WARNA & TYPOGRAPHY (WAJIB):
    - Font Family: 'Arial', sans-serif (WAJIB KONSISTEN).
    - Ukuran Font: 11pt.
    - Border: 1px solid black; border-collapse: collapse;
    - Padding: 8px; vertical-align: top;
    - Perataan Teks Isi: Text-align Justify (Rata Kanan Kiri).
    - Style Tabel: margin-bottom: 20px; width: 100%;
    
    ATURAN WARNA (CRITICAL):
    1. JUDUL UTAMA (Baris Poin 1, 2, 3, 4, 5): Teks WAJIB berwarna MERAH (#FF0000) dan Bold.
    2. SELURUH ISI TABEL LAINNYA (Termasuk Tahap, Kegiatan, Waktu): Teks WAJIB berwarna HITAM (#000000).

    STRUKTUR & LAYOUT (GENERATE SECARA BERURUTAN):

    <!-- BAGIAN 1: IDENTITAS (TABEL 1 - 2 KOLOM) -->
    - Buat <table> baru.
    - Judul: <tr><td colspan="2" style="color: #FF0000; font-weight: bold; background-color: #f2f2f2; border: 1px solid black; padding: 10px;">1. IDENTITAS</td></tr>
    - Format Baris Isi: <tr><td style="width: 30%; border: 1px solid black; color: #000000; font-weight: bold;">Label</td><td style="width: 70%; border: 1px solid black; color: #000000;">Isi</td></tr>
    - Konten:
      - Nama Satuan Pendidikan : ${data.schoolName}
      - Mata Pelajaran : PJOK
      - Kelas / Semester : ${data.className} / ${data.semester}
      - Alokasi Waktu : ${data.duration} (${data.meetingCount} Pertemuan)

    <!-- BAGIAN 2: IDENTIFIKASI KESIAPAN & PROFIL (TABEL 2 - 2 KOLOM) -->
    - Buat <table> baru.
    - Judul: <tr><td colspan="2" style="color: #FF0000; font-weight: bold; background-color: #f2f2f2; border: 1px solid black; padding: 10px;">2. IDENTIFIKASI KESIAPAN & PROFIL</td></tr>
    - Format Baris Isi: <tr><td style="width: 30%; border: 1px solid black; color: #000000; font-weight: bold;">Label</td><td style="width: 70%; border: 1px solid black; color: #000000;">Isi</td></tr>
    - Konten:
      - Kesiapan Siswa : (Deskripsi naratif singkat)
      - Materi Pelajaran : ${data.material}
      - Capaian Dimensi Profil : ${data.graduateDimensions.join(", ")}

    <!-- BAGIAN 3: DESAIN PEMBELAJARAN (TABEL 3 - 2 KOLOM) -->
    - Buat <table> baru.
    - Judul: <tr><td colspan="2" style="color: #FF0000; font-weight: bold; background-color: #f2f2f2; border: 1px solid black; padding: 10px;">3. DESAIN PEMBELAJARAN</td></tr>
    - Format Baris Isi: <tr><td style="width: 30%; border: 1px solid black; color: #000000; font-weight: bold;">Label</td><td style="width: 70%; border: 1px solid black; color: #000000;">Isi</td></tr>
    - Konten:
      - Capaian Pembelajaran (CP) : ${data.learningOutcomes}
      - Tujuan Pembelajaran (TP) : ${data.learningObjectives}
      - Lintas Disiplin Ilmu : (Generate otomatis)
      - Topik Pembelajaran : (Disesuaikan dari materi)
      - Praktik Pedagogis : ${data.pedagogy}
      - Kemitraan Pembelajaran : (Generate otomatis)
      - Lingkungan Pembelajaran : (Generate otomatis)
      - Pemanfaatan Digital : (Generate referensi)

    <!-- BAGIAN 4: PENGALAMAN BELAJAR (TABEL 4 - 3 KOLOM) -->
    - Buat <table> baru.
    - Judul: <tr><td colspan="3" style="color: #FF0000; font-weight: bold; background-color: #f2f2f2; border: 1px solid black; padding: 10px;">4. PENGALAMAN BELAJAR</td></tr>
    - Header Kolom: <tr><td style="width: 20%; font-weight: bold; text-align: center; border: 1px solid black; color: #000000;">Tahap</td><td style="width: 65%; font-weight: bold; text-align: center; border: 1px solid black; color: #000000;">Kegiatan Pembelajaran</td><td style="width: 15%; font-weight: bold; text-align: center; border: 1px solid black; color: #000000;">Waktu</td></tr>
    - Konten (Untuk setiap Pertemuan 1 s.d ${data.meetingCount}):
      (Untuk setiap pertemuan, buat 3 baris kegiatan (Pendahuluan, Inti, Penutup). Pastikan SEMUA Teks dalam tabel berwarna HITAM #000000):
      
      1. Baris Pendahuluan:
         - Isi Kolom Tahap: "Pendahuluan (Memahami)"
         - Isi Kolom Kegiatan:
           WAJIB Gunakan Penomoran (1, 2, 3):
           1. Pembukaan (Salam, doa, presensi).
           2. Apersepsi (Mengaitkan dengan materi sebelumnya).
           3. Pemanasan / Warming Up (Aktivitas fisik terkait materi).
           
           Akhiri dengan teks bold di baris baru: <br>**(BERKESADARAN)**
         - Isi Kolom Waktu: (durasi, e.g. 15 Menit)

      2. Baris Inti:
         - Isi Kolom Tahap: "Inti (Mengaplikasikan)"
         - Isi Kolom Kegiatan:
           WAJIB Gunakan Penomoran (1, 2, 3, dst) untuk Langkah-langkah Sintaks sesuai model "${data.pedagogy}".
           Generate SINTAKS OTOMATIS yang detail dan operasional membahas materi "${data.material}".
           
           Contoh SINTAKS (Sesuaikan dengan model yang dipilih):
           - Inkuiri/Discovery: 1. Stimulasi, 2. Identifikasi Masalah, 3. Pengumpulan Data, 4. Pengolahan Data, 5. Pembuktian, 6. Generalisasi.
           - PBL: 1. Orientasi Masalah, 2. Organisasi Belajar, 3. Penyelidikan, 4. Pengembangan Karya, 5. Evaluasi.
           - TGfU/Game Based: 1. Pengenalan Permainan, 2. Kesadaran Taktis, 3. Pengambilan Keputusan, 4. Eksekusi Skill, 5. Penampilan.
           
           Akhiri dengan teks bold di baris baru: <br>**(BERMAKNA DAN MENGGEMBIRAKAN)**
         - Isi Kolom Waktu: (durasi)

      3. Baris Penutup:
         - Isi Kolom Tahap: "Penutup (Refleksi)"
         - Isi Kolom Kegiatan:
           WAJIB Gunakan Penomoran (1, 2, 3):
           1. Pendinginan (Cooling Down).
           2. Refleksi & Umpan Balik.
           3. Doa & Penutup.
           
           Akhiri dengan teks bold di baris baru: <br>**(BERKESADARAN)**
         - Isi Kolom Waktu: (durasi, e.g. 15 Menit)

    <!-- BAGIAN 5: ASESMEN PEMBELAJARAN (TABEL 5 - 2 KOLOM) -->
    - Buat <table> baru.
    - Judul: <tr><td colspan="2" style="color: #FF0000; font-weight: bold; background-color: #f2f2f2; border: 1px solid black; padding: 10px;">5. ASESMEN PEMBELAJARAN</td></tr>
    - Format Baris Isi: <tr><td style="width: 30%; border: 1px solid black; color: #000000; font-weight: bold;">Label</td><td style="width: 70%; border: 1px solid black; color: #000000;">Isi</td></tr>
    - Konten:
      - Asesmen Awal : (Generate otomatis)
      - Asesmen Proses : (Generate otomatis)
      - Asesmen Akhir : (Generate otomatis)

    <!-- TANDA TANGAN (TABEL 6 - TANPA BORDER) -->
    - Buat <table> baru dengan width 100%, border 0.
    - <tr>
        <td style="width: 50%; text-align: center; padding-top: 30px; color: #000000;">
          Mengetahui Kepala Sekolah<br><br><br><br><b>${data.principalName}</b><br>NIP. ${data.principalNip}
        </td>
        <td style="width: 50%; text-align: center; padding-top: 30px; color: #000000;">
          Guru Mata Pelajaran<br><br><br><br><b>${data.teacherName}</b><br>NIP. ${data.teacherNip}
        </td>
      </tr>

    Pastikan semua tag table ditutup dengan benar. Output harus rapi dan siap copy-paste ke Word.
  `;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        thinkingConfig: { thinkingBudget: 2048 }, 
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    
    // Clean up markdown code blocks if present
    const cleanHtml = text.replace(/```html/g, '').replace(/```/g, '');
    return cleanHtml;

  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Gagal menghasilkan rencana pembelajaran. Pastikan API Key valid atau coba lagi.");
  }
};