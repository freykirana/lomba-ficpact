import React from 'react';
import { InlineMath, BlockMath } from 'react-katex';

export function getLogikaMatematika() {
  return {
    SECTIONS: [
      { id: 0, title: "Pernyataan & Terbuka" },
      { id: 1, title: "Negasi / Ingkaran" },
      { id: 2, title: "Konjungsi & Disjungsi" },
      { id: 3, title: "Implikasi & Biimplikasi" },
      { id: 4, title: "Penarikan Kesimpulan" },
      { id: 5, title: "Interactive Quiz" }
    ],
    QUIZ_QUESTIONS: [
      { question: "Negasi dari pernyataan 'Semua siswa lulus ujian' adalah...", options: ["Tidak ada siswa yang lulus", "Beberapa siswa lulus ujian", "Ada siswa yang tidak lulus ujian", "Semua siswa tidak lulus"], correctIdx: 2 },
      { question: "Pernyataan p bernilai B, q bernilai S. Nilai kebenaran dari p \u2192 q adalah...", options: ["Benar", "Salah", "Tidak Terdefinisi", "Tergantung kondisi"], correctIdx: 1 },
      { question: "Jika Hujan turun, maka tanah basah. (Modus Ponens). Tanah tidak basah, kesimpulannya:", options: ["Hujan turun lebat", "Tanah kering", "Hujan tidak turun", "Tidak bisa disimpulkan"], correctIdx: 2 },
      { question: "Nilai kebenaran dari (B \u2228 S) \u2227 S adalah...", options: ["Benar", "Salah", "Terkadang Benar", "Semua Salah"], correctIdx: 1 },
      { question: "P \u2192 Q, Q \u2192 R. Maka kesimpulan yang sah adalah P \u2192 R. Prinsip ini disebut...", options: ["Modus Ponens", "Modus Tollens", "Silogisme", "Konvers"], correctIdx: 2 }
    ],
    renderContent: (activeStep: number) => {
      switch (activeStep) {
        case 0: return (
           <div className="space-y-6 text-slate-700 leading-relaxed text-lg">
              <h2 className="text-2xl font-bold text-slate-800 border-b pb-2">Pernyataan & Kalimat Terbuka</h2>
              <p>Di dalam logika matematika, <b>Pernyataan</b> adalah sebuah kalimat yang dapat ditentukan nilai kebenarannya secara objektif (Benar atau Salah, tidak bisa dua-duanya).</p>
              <p><b>Kalimat Terbuka</b> adalah kalimat yang belum bisa ditentukan kebenarannya karena masih memuat variabel yang dipertanyakan.</p>
              <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg mt-3">
                <span className="font-semibold block mb-1">Contoh:</span>
                <p>Pernyataan: "Ibukota Indonesia adalah Jakarta." (Benar)</p>
                <p>Terbuka: "x + 2 = 5" (Belum tahu karena x rahasia)</p>
              </div>
           </div>
        );
        case 1: return (
           <div className="space-y-6 text-slate-700 leading-relaxed text-lg">
              <h2 className="text-2xl font-bold text-slate-800 border-b pb-2">Negasi (Ingkaran)</h2>
              <p>Negasi adalah kebalikan nilai kebenaran dari sebuah pernyataan, disimbolkan dengan <InlineMath math="\sim p" />.</p>
              <BlockMath math="p: \text{Bumi itu bulat} \implies \sim p: \text{Bumi itu tidak bulat}" />
              <h3 className="font-bold text-slate-800 mt-4">Negasi Kuantor</h3>
              <ul className="list-disc pl-5 mt-2 space-y-2">
                <li><InlineMath math="\forall" /> (Semua) Dinegasikan menjadi <InlineMath math="\exists" /> (Ada / Beberapa)</li>
                <li><InlineMath math=">" /> Dinegasikan menjadi <InlineMath math="\le" /></li>
              </ul>
           </div>
        );
        case 2: return (
          <div className="space-y-6 text-slate-700 leading-relaxed text-lg">
            <h2 className="text-2xl font-bold text-slate-800 border-b pb-2">Konjungsi & Disjungsi</h2>
            <p><strong>Konjungsi (Dan):</strong> Simbol <InlineMath math="p \land q" />. Hanya akan bernilai BENAR apabila kedua pernyataan bernilai BENAR.</p>
            <p><strong>Disjungsi (Atau):</strong> Simbol <InlineMath math="p \lor q" />. Hanya akan bernilai SALAH apabila kedua pernyataan bernilai SALAH.</p>
          </div>
        );
        case 3: return (
          <div className="space-y-6 text-slate-700 leading-relaxed text-lg">
            <h2 className="text-2xl font-bold text-slate-800 border-b pb-2">Implikasi & Biimplikasi</h2>
            <p><strong>Implikasi (Jika... maka...):</strong> <InlineMath math="p \implies q" /> bernilai SALAH murni jika awalan (p) Benar namun akhiran (q) Salah.</p>
            <p><strong>Biimplikasi (...jika dan hanya jika...):</strong> <InlineMath math="p \iff q" /> bernilai BENAR jika kedua sisi kembar (keduanya Benar atau keduanya Salah).</p>
          </div>
        );
        case 4: return (
          <div className="space-y-6 text-slate-700 leading-relaxed text-lg">
            <h2 className="text-2xl font-bold text-slate-800 border-b pb-2">Penarikan Kesimpulan</h2>
            <ul className="list-disc pl-5 mt-2 space-y-4">
              <li><strong>Modus Ponens:</strong> <InlineMath math="p \implies q" /> (Premis 1), <InlineMath math="p" /> (Premis 2). Kesimpulan: <InlineMath math="q" />.</li>
              <li><strong>Modus Tollens:</strong> <InlineMath math="p \implies q" />, <InlineMath math="\sim q" />. Kesimpulan: <InlineMath math="\sim p" />.</li>
              <li><strong>Silogisme:</strong> <InlineMath math="p \implies q" />, <InlineMath math="q \implies r" />. Kesimpulan: <InlineMath math="p \implies r" />.</li>
            </ul>
          </div>
        );
        default: return null;
      }
    }
  };
}

export function getInduksiMatematika() {
  return {
    SECTIONS: [
      { id: 0, title: "Apa itu Induksi Mat?" },
      { id: 1, title: "Prinsip Dasar Induksi" },
      { id: 2, title: "Induksi Deret Barisan" },
      { id: 3, title: "Induksi Keterbagian" },
      { id: 4, title: "Contoh Soal Pembuktian" },
      { id: 5, title: "Interactive Quiz" }
    ],
    QUIZ_QUESTIONS: [
      { question: "Langkah pertama dalam pembuktian induksi matematika adalah membuktikan benar untuk...", options: ["n = k", "n = k + 1", "n = 1", "n = tak hingga"], correctIdx: 2 },
      { question: "Hipotesis induksinya terletak pada pembuktian asumsikan benar saat...", options: ["n = 1", "n = 0", "n = k + 1", "n = k"], correctIdx: 3 },
      { question: "Jika n(n+1) habis dibagi 2, maka bilangan tersebut merupakan bilangan...", options: ["Ganjil", "Prima", "Genap", "Desimal"], correctIdx: 2 },
      { question: "Deret 1+2+3+...+n dapat dibuktikan dengan induksi bernilai...", options: ["n(n+1)/2", "n^2", "n!", "2n+1"], correctIdx: 0 },
      { question: "Tujuan utama induksi matematika adalah untuk...", options: ["Mencari nilai x", "Membuktikan rumus untuk bilangan asli", "Menghitung luas kurva", "Membuktikan integral"], correctIdx: 1 }
    ],
    renderContent: (activeStep: number) => {
      switch (activeStep) {
        case 0: return (
           <div className="space-y-6 text-slate-700 leading-relaxed text-lg">
              <h2 className="text-2xl font-bold text-slate-800 border-b pb-2">Pengantar Induksi Matematika</h2>
              <p>Induksi matematika bukan untuk menemukan rumus baru, melainkan sebuah metode formal untuk <strong>membuktikan kebenaran suatu pernyataan atau rumus</strong> yang berlaku untuk semua bilangan asli <InlineMath math="n \ge 1" />.</p>
           </div>
        );
        case 1: return (
           <div className="space-y-6 text-slate-700 leading-relaxed text-lg">
              <h2 className="text-2xl font-bold text-slate-800 border-b pb-2">Prinsip Induksi (Efek Domino)</h2>
              <p>Induksi bekerja seperti meruntuhkan efek domino tak berhingga. Ada 2 langkah utama:</p>
              <ul className="list-decimal pl-5 space-y-4">
               <li><span className="font-bold">Langkah Basis (Base Case):</span> Buktikan pernyataan benar secara manual untuk bilangan pertama (biasanya <InlineMath math="n = 1" />). Domino pertama jatuh!</li>
               <li><span className="font-bold">Langkah Induksi (Inductive Step):</span> Asumsikan pernyataan benar untuk <InlineMath math="n = k" />. Buktikan bahwa pernyataan itu mau tidak mau harus benar juga untuk <InlineMath math="n = k + 1" />.</li>
              </ul>
           </div>
        );
        case 2: return (
          <div className="space-y-6 text-slate-700 leading-relaxed text-lg">
            <h2 className="text-2xl font-bold text-slate-800 border-b pb-2">Penerapan pada Deret Bilangan</h2>
            <p>Bila membuktikan deret <InlineMath math="P(n)" />, dalam langkah induksi, ganti suku ke-n menjadi: <strong>Deret Suku ke-k + Suku ke-(k+1)</strong>.</p>
            <BlockMath math="\text{Substitusi asumsi ke } P(k+1) \implies \text{Jabarkan persamaan secara aljabar.}" />
          </div>
        );
        case 3: return (
          <div className="space-y-6 text-slate-700 leading-relaxed text-lg">
            <h2 className="text-2xl font-bold text-slate-800 border-b pb-2">Penerapan pada Keterbagian</h2>
            <p>Membuktikan bahwa bentuk aljabar seperti <InlineMath math="n^3 - n" /> habis dibagi oleh suatu bilangan <InlineMath math="x" />.</p>
            <p>Trik: Ganti bentuk aljabar dengan <InlineMath math="P(k) = c \cdot x" />. Lalu uji ke dalam <InlineMath math="P(k+1)" /> sedemikian hingga muncul konstanta kelipatan dari pengali <InlineMath math="x" />.</p>
          </div>
        );
        case 4: return (
          <div className="space-y-6 text-slate-700 leading-relaxed text-lg">
            <h2 className="text-2xl font-bold text-slate-800 border-b pb-2">Contoh Pembuktian Singkat</h2>
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
              <h4 className="font-bold">Buktikan: 1+3+5+...+(2n-1) = n²</h4>
              <ul className="list-disc pl-5 mt-2 space-y-2">
                <li><InlineMath math="n=1 \implies  (2(1)-1) = 1^2 \implies 1 = 1" /> (Benar)</li>
                <li>Asumsi <InlineMath math="n=k \implies 1+3+...+(2k-1) = k^2" /> (Asumsi Benar)</li>
                <li>Buktikan <InlineMath math="n=k+1" />:<br/>
                  <InlineMath math="1+3+...+(2k-1) + (2(k+1)-1)" /><br/>
                  <InlineMath math="= k^2 + (2k + 1)" /><br/>
                  <InlineMath math="= (k+1)^2" /> (Terbukti Cocok!)
                </li>
              </ul>
            </div>
          </div>
        );
        default: return null;
      }
    }
  };
}
