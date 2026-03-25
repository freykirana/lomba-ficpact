import React from 'react';
import { InlineMath, BlockMath } from 'react-katex';

export function getGeometriBidangDatar() {
  return {
    SECTIONS: [
      { id: 0, title: "Titik, Garis, dan Sudut" },
      { id: 1, title: "Segitiga & Pythagoras" },
      { id: 2, title: "Segi Empat & Lingkaran" },
      { id: 3, title: "Kesebangunan & Kekongruenan" },
      { id: 4, title: "Contoh Soal Geometri" },
      { id: 5, title: "Interactive Quiz" }
    ],
    QUIZ_QUESTIONS: [
      { question: "Berapa jumlah sudut dalam segitiga murni?", options: ["90\u00b0", "360\u00b0", "180\u00b0", "270\u00b0"], correctIdx: 2 },
      { question: "Dua segitiga sebangun, artinya...", options: ["Sudut sama tapi ukuran sisi bebas namun meminiki rasio skala ukur tetap", "Semua sisinya mutlak sama panjang", "Saling berpotongan siku-siku", "Luas nya harus nol"], correctIdx: 0 },
      { question: "Jika keliling lingkaran adalah \\( 2\\pi r \\), luas permukaannya adalah...", options: ["\\(\\pi r^2\\)", "\\(2\\pi r\\)", "\\(\\frac{4}{3}\\pi r^3\\)", "\\(\\pi d\\)"], correctIdx: 0 },
      { question: "Syarat segitiga siku-siku sesuai rumus Pythagoras adalah...", options: ["a+b=c", "a^2 + b^2 = c^2", "a<b", "c^2 - b^2 = a"], correctIdx: 1 },
      { question: "Diagonal persegi dengan sisi \\( s \\) adalah...", options: ["s", "s \u221a2", "s \u221a3", "2s"], correctIdx: 1 }
    ],
    renderContent: (activeStep: number) => {
      switch (activeStep) {
        case 0: return (
           <div className="space-y-6 text-slate-700 leading-relaxed text-lg">
              <h2 className="text-2xl font-bold text-slate-800 border-b pb-2">Titik, Garis, dan Sudut</h2>
              <p><strong>Titik</strong> tidak memiliki dimensi. <strong>Garis</strong> dibangun dari deretan titik berdimensi 1 panjang (tanpa ketebalan). <strong>Sudut</strong> adalah ruang lengkung pelurusan yang terbentuk antara himpitan dua ujung garis terpisah.</p>
           </div>
        );
        case 1: return (
           <div className="space-y-6 text-slate-700 leading-relaxed text-lg">
              <h2 className="text-2xl font-bold text-slate-800 border-b pb-2">Segitiga & Pythagoras</h2>
              <p>Segitiga memiliki 3 sumbu sisi lurus. Teorema paling epik memecahkan masalah ini adalah Pythagoras untuk Segi-3 Siku Siku.</p>
              <BlockMath math="c^2 = a^2 + b^2" />
              <p>Dalam segitiga lainnya dapat digunakan <i>Aturan Sinus</i> dan <i>Aturan Cosinus</i> jika titik sudut sembarangan (tidak berderajat 90).</p>
           </div>
        );
        case 2: return (
          <div className="space-y-6 text-slate-700 leading-relaxed text-lg">
            <h2 className="text-2xl font-bold text-slate-800 border-b pb-2">Segi Empat & Lingkaran</h2>
            <p><strong>Segi Empat:</strong> Luas adalah <InlineMath math="\text{Panjang} \times \text{Lebar}" />. Meliputi Bangun layang-layang, jajargenjang, trapesium, Persegi Panjang dsb.</p>
            <p><strong>Lingkaran:</strong> Garis lengkung sentralistik, sudut penemu 360 derajat sejajar jari-jari (r). <InlineMath math="\text{Luas} = \pi \cdot r^2" />.</p>
          </div>
        );
        case 3: return (
          <div className="space-y-6 text-slate-700 leading-relaxed text-lg">
            <h2 className="text-2xl font-bold text-slate-800 border-b pb-2">Kesebangunan & Kekongruenan</h2>
            <ul className="list-disc pl-5 mt-2 space-y-4">
              <li><strong>Sebangun:</strong> Sudut bersesuaiannya sama besar. Panjang sisinya sebanding (memiliki skala).</li>
              <li><strong>Kongruen:</strong> Mirip seperti sepasang kembar identik, harus dan wajib mutlak sama persis di setiap pelurusan sudut maupun rusuk.</li>
            </ul>
          </div>
        );
        case 4: return (
          <div className="space-y-6 text-slate-700 leading-relaxed text-lg">
            <h2 className="text-2xl font-bold text-slate-800 border-b pb-2">Contoh Soal Geometri Datar</h2>
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
              <p>Sebuah pohon tingginya 5m membentuk bayangan panjang 10m ke aspal, berapa panjang bayangan manusia (h=1.5m) di kondisi yang konstan sebangun tersebut?</p>
              <br/>
              <span className="font-semibold">Skala Kesebangunan:</span>
              <BlockMath math="\frac{5}{10} = \frac{1.5}{x} \implies 5x = 15 \implies x= 3\text{m}" />
              <p>Maka panjang bayangan manusia adalah 3 meter.</p>
            </div>
          </div>
        );
        default: return null;
      }
    }
  };
}

export function getGeometriBidangRuang() {
  return {
    SECTIONS: [
      { id: 0, title: "Unsur Bangun Ruang" },
      { id: 1, title: "Kedudukan Titik Garis Bidang" },
      { id: 2, title: "Jarak dalam Ruang 3D" },
      { id: 3, title: "Sudut Antara Dimensi" },
      { id: 4, title: "Volume & Luas Permukaan" },
      { id: 5, title: "Interactive Quiz" }
    ],
    QUIZ_QUESTIONS: [
      { question: "Volume bola sempurna dengan jari jari r adalah...", options: ["\\(\\frac{1}{3}\\pi r^2\\)", "\\(4\\pi r^2\\)", "\\(\\frac{4}{3}\\pi r^3\\)", "\\(\\pi d\\)"], correctIdx: 2 },
      { question: "Volume Kubus bersisi panjang 5cm adalah...", options: ["25", "100", "125", "150"], correctIdx: 2 },
      { question: "Jarak titik H ke garis potong AG membelah diagonal ruang pada kubus dinamakan rumus...", options: ["Titik berat segitiga", "Proyeksi Pythagoras 3D", "Penyiku Garis Singgung", "Diagonal Sisi"], correctIdx: 1 },
      { question: "Rumus luas selimut Tabung sejajar silinder adalah...", options: ["\u03c0r\u00b2", "2\u03c0rt", "\u03c0d\u00b2", "2\u03c0r\u00b2 + 2\u03c0rt"], correctIdx: 1 },
      { question: "Sebuah Limas segiempat punya alas persegi. Jika sisi 3 dan tinggi 5, volumenya?", options: ["15", "45", "75", "Volume tidak utuh"], correctIdx: 0 }
    ],
    renderContent: (activeStep: number) => {
      switch (activeStep) {
        case 0: return (
           <div className="space-y-6 text-slate-700 leading-relaxed text-lg">
              <h2 className="text-2xl font-bold text-slate-800 border-b pb-2">Pengantar Dimensi 3 / Bangun Ruang</h2>
              <p>Ruang 3D mempunyai unsur kedalaman (Z), disamping Panjang (X) dan Lebar (Y). Karena melingkupi porsi vakum di dalam alam semesta, <i>Shape</i> ini memiliki Volume dan Area Selimut Kontak Permukaan yang luas.</p>
           </div>
        );
        case 1: return (
           <div className="space-y-6 text-slate-700 leading-relaxed text-lg">
              <h2 className="text-2xl font-bold text-slate-800 border-b pb-2">Titik, Garis, dan Bidang dalam Ruang 3D</h2>
              <ul className="list-decimal pl-5 space-y-4">
               <li><span className="font-bold">Titik X Titik:</span> Menghitung rute lurus melintasi bidang hampa dimensi 3 ruang.</li>
               <li><span className="font-bold">Garis Menembus Bidang:</span> Garis dapat sejajar di dalam, berimpit, bahkan menembus luaran bidang dalam ruang.</li>
              </ul>
           </div>
        );
        case 2: return (
          <div className="space-y-6 text-slate-700 leading-relaxed text-lg">
            <h2 className="text-2xl font-bold text-slate-800 border-b pb-2">Jarak di Area 3 Dimensi</h2>
            <p><strong>Titik ke Titik:</strong> Akar koordinat jarak vektor.</p>
            <p><strong>Titik ke Bidang Dasar (Contoh Proyeksi):</strong> Jika ingin menghitung titik C ke alas bidang BDG di prisma tegak, temukan proyeksi kejatuhan titik semu pada garis alas yang membentuk siku-siku di segitiga bantuan ruang.</p>
            <BlockMath math="\text{Area}_1 = \text{Area}_2 \iff \frac{1}{2} a \cdot h_1 = \frac{1}{2} b \cdot h_2" />
          </div>
        );
        case 3: return (
          <div className="space-y-6 text-slate-700 leading-relaxed text-lg">
            <h2 className="text-2xl font-bold text-slate-800 border-b pb-2">Sudut Persilangan</h2>
            <p>Dua bidang (misal pelapis kardus balok A dan atap piramida B) menciptakan sudut runcing miring. Gunakan aturan kosinus segitiga imajiner yang ditarik tegak lurus pada irisan ke dua bidang untuk menemukannya.</p>
          </div>
        );
        case 4: return (
          <div className="space-y-6 text-slate-700 leading-relaxed text-lg">
            <h2 className="text-2xl font-bold text-slate-800 border-b pb-2">Volume & Luas Bangun Ruang</h2>
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 grid grid-cols-2 gap-4">
              <div><h4 className="font-bold">Balok:</h4> <InlineMath math="V = p \cdot l \cdot t" /></div>
              <div><h4 className="font-bold">Silinder/Tabung:</h4> <InlineMath math="V = \pi r^2 \cdot t" /></div>
              <div><h4 className="font-bold">Limas Kerucut:</h4> <InlineMath math="V = \frac{1}{3} (\text{Luas Alas}) \cdot t" /></div>
              <div><h4 className="font-bold">Bola Murni:</h4> <InlineMath math="V = \frac{4}{3} \pi r^3" /></div>
            </div>
          </div>
        );
        default: return null;
      }
    }
  };
}
