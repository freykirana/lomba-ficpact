import React from 'react';
import { InlineMath, BlockMath } from 'react-katex';

export function getPertidaksamaanLinear() {
  return {
    SECTIONS: [
      { id: 0, title: "Pengertian Pertidaksamaan" },
      { id: 1, title: "Sifat Sifat Pertidaksamaan" },
      { id: 2, title: "Pertidaksamaan Linier & Kuadrat" },
      { id: 3, title: "Pecahan, Irasional, & Mutlak" },
      { id: 4, title: "Contoh Soal & Pembahasan" },
      { id: 5, title: "Interactive Quiz" }
    ],
    QUIZ_QUESTIONS: [
      { question: "Himpunan penyelesaian dari \\( 3x - 4 \\ge 2x + 5 \\) adalah...", options: ["x \u2265 9", "x \u2264 9", "x \u2265 1", "x \u2264 1"], correctIdx: 0 },
      { question: "Penyelesaian dari pertidaksamaan mutlak \\( |x - 2| < 3 \\) adalah...", options: ["-5 < x < 1", "-1 < x < 5", "x < -1 atau x > 5", "x < -5 atau x > 1"], correctIdx: 1 },
      { question: "Himpunan penyelesaian dari \\( x^2 - 4x - 5 < 0 \\) adalah...", options: ["x < -1 atau x > 5", "-5 < x < 1", "-1 < x < 5", "1 < x < 5"], correctIdx: 2 },
      { question: "Apa yang terjadi pada tanda pertidaksamaan jika kedua ruas dikalikan dengan bilangan negatif?", options: ["Tanda tetap", "Tanda berubah arah", "Menjadi persamaan (=)", "Tidak ada nilai penyelesaian"], correctIdx: 1 },
      { question: "Nilai minimum \\( x \\) bilangan bulat yang memenuhi \\( 5x - 3 \\ge 12 \\) adalah...", options: ["2", "3", "4", "5"], correctIdx: 1 }
    ],
    renderContent: (activeStep: number) => {
      switch (activeStep) {
        case 0: return (
           <div className="space-y-6 text-slate-700 leading-relaxed text-lg">
              <h2 className="text-2xl font-bold text-slate-800 border-b pb-2">Pengertian Pertidaksamaan</h2>
              <p>Pertidaksamaan adalah suatu kalimat matematika yang mengandung notasi lebih kecil dari (<InlineMath math="<" />), lebih besar dari (<InlineMath math=">" />), lebih kecil dari atau sama dengan (<InlineMath math="\le" />), dan notasi lebih besar dari atau sama dengan (<InlineMath math="\ge" />).</p>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
                <span className="font-semibold text-blue-900 block mb-1">Contoh Notasi Himpunan:</span>
                <BlockMath math="HP = \{ x \mid x > 2, x \in \mathbb{R} \}" />
              </div>
           </div>
        );
        case 1: return (
           <div className="space-y-6 text-slate-700 leading-relaxed text-lg">
              <h2 className="text-2xl font-bold text-slate-800 border-b pb-2">Sifat-Sifat Pertidaksamaan</h2>
              <ul className="list-decimal pl-5 space-y-6">
               <li><span className="font-bold text-slate-800">Sifat Penjumlahan/Pengurangan:</span> Suatu pertidaksamaan dapat ditambah atau dikurang oleh bilangan tanpa merubah tanda. <InlineMath math="x > y \implies x \pm z > y \pm z" /></li>
               <li><span className="font-bold text-slate-800">Sifat Perkalian:</span> Jika dikalikan bilangan positif, notasi tetap. Jika bilangan negatif, notasi berubah.</li>
               <li><span className="font-bold text-slate-800">Sifat Gabungan:</span> "dan" untuk irisan, "atau" untuk gabungan saling lepas.</li>
              </ul>
           </div>
        );
        case 2: return (
          <div className="space-y-6 text-slate-700 leading-relaxed text-lg">
            <h2 className="text-2xl font-bold text-slate-800 border-b pb-2">Linier & Kuadrat</h2>
            <p>Pertidaksamaan Linier: <InlineMath math="ax + b > 0" /></p>
            <p>Pertidaksamaan Kuadrat: <InlineMath math="ax^2 + bx + c > 0" /></p>
            <div className="bg-amber-50 rounded-xl p-6 shadow-sm"><span className="font-bold">Langkah Penyelesaian Kuadrat:</span> Temukan akar, uji titik pada garis bilangan, pilih interval yang sesuai tanda akhir.</div>
          </div>
        );
        case 3: return (
          <div className="space-y-6 text-slate-700 leading-relaxed text-lg">
            <h2 className="text-2xl font-bold text-slate-800 border-b pb-2">Pecahan, Irasional, & Mutlak</h2>
            <p>1. <strong>Pecahan:</strong> <InlineMath math="\frac{f(x)}{g(x)} \ge 0" /> (Jangan lupa syarat <InlineMath math="g(x) \neq 0" />)</p>
            <p>2. <strong>Irasional:</strong> <InlineMath math="\sqrt{f(x)} < c" /> (Syarat <InlineMath math="f(x) \ge 0" />)</p>
            <p>3. <strong>Mutlak:</strong> <InlineMath math="|x| < a \implies -a < x < a" /> dan <InlineMath math="|x| > a \implies x < -a \text{ atau } x > a" /></p>
          </div>
        );
        case 4: return (
          <div className="space-y-6 text-slate-700 leading-relaxed text-lg">
            <h2 className="text-2xl font-bold text-slate-800 border-b pb-2">Contoh Soal & Pembahasan</h2>
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
              <h4 className="font-bold">Contoh Kuadrat: <InlineMath math="x^2 + 2x - 15 > 0" /></h4>
              <p>Akar-akar dari faktorisasi <InlineMath math="(x+5)(x-3) = 0" /> adalah x=-5 dan x=3. Uji pada garis bilangan memberikan penyelesaian <InlineMath math="x < -5 \text{ atau } x > 3" />.</p>
            </div>
          </div>
        );
        default: return null;
      }
    }
  };
}

export function getSPLDV() {
  return {
    SECTIONS: [
      { id: 0, title: "Pengertian Bentuk Umum SPLDV" },
      { id: 1, title: "Metode Eliminasi & Grafik" },
      { id: 2, title: "Metode Substitusi & Campuran" },
      { id: 3, title: "Penerapan Kontekstual" },
      { id: 4, title: "Kupas Tuntas Soal" },
      { id: 5, title: "Interactive Quiz" }
    ],
    QUIZ_QUESTIONS: [
      { question: "Solusi dari SPLDV \\( x + y = 6 \\) dan \\( x - y = 2 \\) adalah...", options: ["x=2, y=4", "x=4, y=2", "x=5, y=1", "x=3, y=3"], correctIdx: 1 },
      { question: "Manakah yang BUKAN merupakan metode penyelesaian SPLDV?", options: ["Grafik", "Kuadratik", "Substitusi", "Eliminasi"], correctIdx: 1 },
      { question: "Jika nilai tukar 2 apel dan 1 jeruk adalah Rp5.000, serta 1 apel dan 2 jeruk adalah Rp4.000, berapa harga 1 apel?", options: ["Rp1.000", "Rp1.500", "Rp2.000", "Rp2.500"], correctIdx: 2 },
      { question: "Himpunan penyelesaian dari \\( 3x + y = 7 \\) dan \\( 2x - y = 3 \\) adalah...", options: ["x=2, y=1", "x=1, y=4", "x=2, y=3", "x=3, y=-2"], correctIdx: 0 },
      { question: "Jika dua kurva SPL sejajar (tidak berpotongan), maka sistem persamaan memiliki...", options: ["Satu penyelesaian", "Dua penyelesaian", "Banyak penyelesaian", "Tidak ada penyelesaian"], correctIdx: 3 }
    ],
    renderContent: (activeStep: number) => {
      switch (activeStep) {
        case 0: return (
           <div className="space-y-6 text-slate-700 leading-relaxed text-lg">
              <h2 className="text-2xl font-bold text-slate-800 border-b pb-2">Pengertian SPLDV</h2>
              <p>Sistem Persamaan Linear Dua Variabel (SPLDV) adalah sistem yang memuat dua buah persamaan linear dengan dua variabel yang sama (misal <InlineMath math="x" /> dan <InlineMath math="y" />) serta berpangkat satu.</p>
              <BlockMath math="a_1x + b_1y = c_1" />
              <BlockMath math="a_2x + b_2y = c_2" />
           </div>
        );
        case 1: return (
           <div className="space-y-6 text-slate-700 leading-relaxed text-lg">
              <h2 className="text-2xl font-bold text-slate-800 border-b pb-2">Metode Eliminasi & Grafik</h2>
              <ul className="list-decimal pl-5 space-y-4">
               <li><span className="font-bold">Metode Eliminasi:</span> Menyamakan salah satu koefisien variabel dan menghapusnya dari peredaran dengan jalan penjumlahan atau pengurangan persamaan.</li>
               <li><span className="font-bold">Metode Grafik:</span> Menggambar garis lurus kedua persamaan. Akar penyesaiannya terletak tepat pada <strong>titik potong antar garis tersebut</strong>.</li>
              </ul>
           </div>
        );
        case 2: return (
          <div className="space-y-6 text-slate-700 leading-relaxed text-lg">
            <h2 className="text-2xl font-bold text-slate-800 border-b pb-2">Metode Substitusi & Campuran</h2>
            <p><strong>Metode Substitusi:</strong> Menjadikan suatu variabel bebas (misal <InlineMath math="x = c - y" />). Substitusikan blok tersebut ke persamaan kedua!</p>
            <p><strong>Metode Campuran:</strong> Teknik tergabungkan antara Eliminasi lalu hasil akhirnya diselesaikan dengan Substitusi yang efisien.</p>
          </div>
        );
        case 3: return (
          <div className="space-y-6 text-slate-700 leading-relaxed text-lg">
            <h2 className="text-2xl font-bold text-slate-800 border-b pb-2">Penerapan Kontekstual</h2>
            <p>Sering kali digunakan untuk masalah cerita. Gunakan <InlineMath math="x" /> dan <InlineMath math="y" /> untuk memodelkan harga suatu barang secara aljabar.</p>
            <div className="bg-emerald-50 text-emerald-900 border-l-4 border-emerald-500 p-4 rounded-r-lg mt-3">
              <span className="font-semibold block mb-1">Tips Model Matematika:</span>
              <p>Jika "Buku dan Pensil seharga 10", jadikan <InlineMath math="x + y = 10" />.</p>
            </div>
          </div>
        );
        case 4: return (
          <div className="space-y-6 text-slate-700 leading-relaxed text-lg">
            <h2 className="text-2xl font-bold text-slate-800 border-b pb-2">Contoh Soal Pembahasan</h2>
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
              <h4 className="font-bold">Penyelesaian SPLDV <InlineMath math="2x+y=5" /> & <InlineMath math="x-y=1" /></h4>
              <p>Dengan eliminasi penjumlah langsung (hilangkan y):</p>
              <BlockMath math="(2x+y) + (x-y) = 5 + 1 \implies 3x = 6 \implies x = 2" />
              <p>Substitusi langsung x=2 ke persamaan kedua: <InlineMath math="2 - y = 1 \implies y = 1" />.</p>
            </div>
          </div>
        );
        default: return null;
      }
    }
  };
}

export function getPGL() {
  return {
    SECTIONS: [
      { id: 0, title: "Apa itu PGL?" },
      { id: 1, title: "Menggambar Grafik Garis" },
      { id: 2, title: "Menentukan Gradien (m)" },
      { id: 3, title: "Hubungan Antar Garis" },
      { id: 4, title: "Menyusun Akar Garis Baru" },
      { id: 5, title: "Interactive Quiz" }
    ],
    QUIZ_QUESTIONS: [
      { question: "Gradien dari persamaan \\( y = 4x - 5 \\) adalah...", options: ["-4", "-5", "4", "5"], correctIdx: 2 },
      { question: "Bila gradien garis pertama adalah \\( m_1 = 2 \\), dan garis kedua tegak lurus kepadanya, gradien garis kedua adalah...", options: ["2", "-2", "1/2", "-1/2"], correctIdx: 3 },
      { question: "Persamaan garis dengan gradien 3 melewati titik \\( (1, 5) \\) adalah...", options: ["y = 3x - 2", "y = 3x + 2", "y = -3x + 8", "y = 2x + 3"], correctIdx: 1 },
      { question: "Garis \\( 2x - 3y = 6 \\) memotong sumbu-X pada koordinat...", options: ["(0, -2)", "(3, 0)", "(2, 0)", "(0, 3)"], correctIdx: 1 },
      { question: "Dua garis saling sejajar apabila...", options: ["m1 * m2 = -1", "m1 = -m2", "m1 * m2 = 1", "m1 = m2"], correctIdx: 3 }
    ],
    renderContent: (activeStep: number) => {
      switch (activeStep) {
        case 0: return (
           <div className="space-y-6 text-slate-700 leading-relaxed text-lg">
              <h2 className="text-2xl font-bold text-slate-800 border-b pb-2">Persamaan Garis Lurus</h2>
              <p>Persamaan matematika linier yang mendeskripsikan suatu garis lurus pada bidang kartesius dua dimensi Cartesian.</p>
              <BlockMath math="y = mx + c \quad \text{(Eksplisit)}" />
              <BlockMath math="Ax + By + C = 0 \quad \text{(Implisit)}" />
           </div>
        );
        case 1: return (
           <div className="space-y-6 text-slate-700 leading-relaxed text-lg">
              <h2 className="text-2xl font-bold text-slate-800 border-b pb-2">Menggambar Grafik Garis</h2>
              <p>Cukup tentukan dua titik utama: <strong>Titik potong sumbu-X</strong> (substitusi <InlineMath math="y=0" />) dan <strong>Titik potong sumbu-Y</strong> (substitusi <InlineMath math="x=0" />).</p>
           </div>
        );
        case 2: return (
          <div className="space-y-6 text-slate-700 leading-relaxed text-lg">
            <h2 className="text-2xl font-bold text-slate-800 border-b pb-2">Menentukan Kemiringan (Gradien)</h2>
            <p>Gradien mengukur sudut kemiringan. Disimbolkan <InlineMath math="m" />.</p>
            <BlockMath math="m = \frac{y_2 - y_1}{x_2 - x_1} \quad \text{atau} \quad m = -\frac{A}{B}" />
          </div>
        );
        case 3: return (
          <div className="space-y-6 text-slate-700 leading-relaxed text-lg">
            <h2 className="text-2xl font-bold text-slate-800 border-b pb-2">Hubungan Antar Garis</h2>
            <div className="grid grid-cols-2 gap-4 mt-2">
              <div className="p-4 bg-sky-50 border border-sky-200 rounded text-center">
                <strong>Sejajar</strong><br/>
                <InlineMath math="m_1 = m_2" />
              </div>
              <div className="p-4 bg-rose-50 border border-rose-200 rounded text-center">
                <strong>Tegak Lurus</strong><br/>
                <InlineMath math="m_1 \cdot m_2 = -1" />
              </div>
            </div>
          </div>
        );
        case 4: return (
          <div className="space-y-6 text-slate-700 leading-relaxed text-lg">
            <h2 className="text-2xl font-bold text-slate-800 border-b pb-2">Menyusun Persamaan Baru</h2>
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
              <p>Bila diketahui titik <InlineMath math="(x_1, y_1)" /> dan gradien <InlineMath math="m" />:</p>
              <BlockMath math="y - y_1 = m(x - x_1)" />
              <hr className="my-3"/>
              <p>Bila diketahui dua titik <InlineMath math="(x_1, y_1)" /> dan <InlineMath math="(x_2, y_2)" />:</p>
              <BlockMath math="\frac{y - y_1}{y_2 - y_1} = \frac{x - x_1}{x_2 - x_1}" />
            </div>
          </div>
        );
        default: return null;
      }
    }
  };
}
