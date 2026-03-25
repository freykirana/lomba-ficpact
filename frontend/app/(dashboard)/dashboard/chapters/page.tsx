"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Book, Trophy, ArrowLeft, ArrowRight, Loader2, GraduationCap } from "lucide-react";
import { chaptersAPI } from "@/lib/api";

interface Chapter {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  category: string;
  totalAttempts: number;
  totalSucceeds: number;
}

const difficultyColor: Record<string, string> = {
  EASY: "bg-green-100 text-green-700",
  MEDIUM: "bg-yellow-100 text-yellow-700",
  HARD: "bg-red-100 text-red-700",
};

const GRADES = [
  { id: "KELAS_10", title: "Kelas 10", desc: "Aljabar, Logika Dasar, dan Geometri Analitik.", icon: "bg-blue-100 text-blue-600" },
  { id: "KELAS_11", title: "Kelas 11", desc: "Eksplorasi pembuktian dan penalaran lanjut.", icon: "bg-purple-100 text-purple-600" },
  { id: "KELAS_12", title: "Kelas 12", desc: "Geometri tingkat tinggi dan keruangan.", icon: "bg-rose-100 text-rose-600" },
];

export default function ChaptersPage() {
  const [selectedGrade, setSelectedGrade] = useState<string | null>(null);
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!selectedGrade) {
      setChapters([]);
      return;
    }
    setLoading(true);
    chaptersAPI
      .list(selectedGrade)
      .then(data => {
        const order10 = ['Pertidaksamaan Linear', 'Sistem Persamaan Linear', 'Persamaan Garis Lurus'];
        const order11 = ['Logika Matematika', 'Induksi Matematika'];
        const order12 = ['Geometri Bidang Datar', 'Geometri Bidang Ruang'];
        
        data.sort((a,b) => {
          if (selectedGrade === 'KELAS_10') return order10.indexOf(a.title) - order10.indexOf(b.title);
          if (selectedGrade === 'KELAS_11') return order11.indexOf(a.title) - order11.indexOf(b.title);
          if (selectedGrade === 'KELAS_12') return order12.indexOf(a.title) - order12.indexOf(b.title);
          return 0;
        });
        setChapters(data);
      })
      .catch(() => setChapters([]))
      .finally(() => setLoading(false));
  }, [selectedGrade]);

  return (
    <div className="space-y-8">
      <div className="mb-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Chapters & Pembelajaran</h1>
        <p className="text-gray-600">Pilih tingkatan kelas untuk memulai perjalanan belajar Anda.</p>
      </div>

      {!selectedGrade ? (
        <section>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {GRADES.map(grade => (
              <button
                key={grade.id}
                onClick={() => setSelectedGrade(grade.id)}
                className="group relative flex flex-col items-start p-8 bg-white border border-gray-200 rounded-2xl hover:border-blue-500 hover:shadow-lg transition-all text-left"
              >
                <div className={`p-4 rounded-xl mb-6 ${grade.icon}`}>
                  <GraduationCap size={32} />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">{grade.title}</h2>
                <p className="text-gray-500 line-clamp-2">{grade.desc}</p>
                <div className="mt-8 flex items-center text-blue-600 font-semibold opacity-80 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                  Lihat Materi <ArrowRight size={20} className="ml-2" />
                </div>
              </button>
            ))}
          </div>
        </section>
      ) : (
        <section>
          <button 
            onClick={() => setSelectedGrade(null)}
            className="flex items-center text-gray-500 hover:text-gray-900 mb-6 font-medium transition-colors"
          >
            <ArrowLeft size={20} className="mr-2" /> Kembali ke Pilihan Kelas
          </button>
          
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Materi {GRADES.find(g => g.id === selectedGrade)?.title}
          </h2>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="animate-spin text-gray-400" size={32} />
            </div>
          ) : chapters.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center border border-gray-100">
              <Book className="text-gray-300 mx-auto mb-4" size={48} />
              <p className="text-gray-500 font-medium">Belum ada materi untuk kelas ini.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {chapters.map((ch) => (
                <div
                  key={ch.id}
                  className="rounded-2xl border border-gray-200 bg-white p-5 flex flex-col transition-all hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="w-full aspect-video rounded-xl mb-4 flex items-center justify-center bg-blue-50">
                    <Book className="text-blue-400" size={32} />
                  </div>

                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-gray-900">{ch.title}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-md font-bold ${difficultyColor[ch.difficulty] || "bg-gray-100 text-gray-600"}`}>
                      {ch.difficulty}
                    </span>
                  </div>

                  <p className="text-sm text-gray-500 mb-4 flex-1">{ch.description}</p>

                  <Link href={`/dashboard/chapters/${ch.id}`}
                    className="w-full py-2.5 rounded-lg flex items-center justify-center gap-2 font-semibold transition-colors bg-gray-900 text-white hover:bg-gray-800"
                  >
                    Mulai Belajar <ArrowRight size={16} />
                  </Link>
                </div>
              ))}
            </div>
          )}
        </section>
      )}
    </div>
  );
}
