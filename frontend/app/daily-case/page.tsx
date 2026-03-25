"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Lightbulb, SendHorizontal, Loader2, CheckCircle2, XCircle } from "lucide-react";
import { dailyCasesAPI } from "@/lib/api";
import { useAuth } from "@/lib/auth-context";

interface DailyCaseData {
  id: string;
  xpReward: number;
  coinReward: number;
  chapter: {
    id: string;
    title: string;
    description: string;
    content: string;
    difficulty: string;
  };
  questionData?: string;
}

import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

export default function DailyCasePage() {
  const router = useRouter();
  const { refreshUser } = useAuth();
  const [dailyCase, setDailyCase] = useState<DailyCaseData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [answer, setAnswer] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string; xp?: number; coins?: number } | null>(null);
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    dailyCasesAPI
      .getToday()
      .then((data) => {
        if (data) setDailyCase(data);
        else setError("No daily case available today. Check back tomorrow!");
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = async (selectedIndex: number) => {
    if (!dailyCase) return;
    setSubmitting(true);
    setAnswer(selectedIndex.toString());
    try {
      const res = await dailyCasesAPI.submit(dailyCase.id, selectedIndex.toString(), "text");
      setResult({
        success: res.isCorrect !== false,
        message: res.message,
        xp: res.rewards?.xp,
        coins: res.rewards?.coins,
      });
      if (res.isCorrect !== false) await refreshUser();
    } catch (err: any) {
      setResult({
        success: false,
        message: err.message || "You have already submitted for today",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const qData = dailyCase?.questionData ? JSON.parse(dailyCase.questionData) : null;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-200 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="animate-spin text-gray-600" size={32} />
          <p className="text-gray-600">Loading today&apos;s case...</p>
        </div>
      </div>
    );
  }

  if (error && !dailyCase) {
    return (
      <div className="min-h-screen bg-gray-200 flex items-center justify-center">
        <div className="bg-white rounded-2xl p-8 shadow-lg max-w-md text-center">
          <XCircle className="text-red-400 mx-auto mb-4" size={48} />
          <h2 className="text-xl font-bold text-gray-900 mb-2">Oops!</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button onClick={() => router.push("/dashboard")}
            className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition">
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-200 flex flex-col p-6 lg:p-12">
      {/* Top Status Bar */}
      <div className="flex items-center justify-between w-full max-w-6xl mx-auto">
        <button onClick={() => router.push("/dashboard")}
          className="flex items-center gap-2 text-gray-900 hover:text-black transition-colors">
          <ArrowLeft size={24} />
          <span className="text-xl font-bold">Daily Case</span>
        </button>

        <span className="rounded-full border border-gray-400/60 bg-transparent px-6 py-2 text-sm font-semibold text-gray-900 shadow-sm">
          {dailyCase?.chapter.difficulty || "MEDIUM"} Challenge
        </span>

        <button type="button" onClick={() => setShowHint(!showHint)}
          className="flex items-center gap-2 rounded-full border border-gray-400/60 bg-transparent px-5 py-2 text-sm font-semibold text-gray-900 transition hover:bg-gray-300 shadow-sm">
          Hint <Lightbulb size={18} />
        </button>
      </div>

      {/* Hint Banner */}
      {showHint && (
        <div className="w-full max-w-6xl mx-auto mt-4 bg-yellow-50 border border-yellow-200 rounded-xl px-6 py-4 text-sm text-yellow-800">
          💡 {qData?.hint || "Look carefully at the details in the case description. The answer might be simpler than you think!"}
        </div>
      )}

      {/* Main Heading */}
      <div className="w-full max-w-6xl mx-auto mt-12 mb-10">
        <h1 className="text-center text-2xl font-bold leading-snug text-gray-900 sm:text-3xl lg:text-4xl px-4">
          {dailyCase?.chapter.title || "Daily Case"}
        </h1>
      </div>

      {/* Investigation Area */}
      <div className="w-full max-w-4xl mx-auto flex flex-col gap-8">
        {/* Main Card */}
        <div className="flex flex-col rounded-3xl border border-gray-400/50 bg-gray-300 shadow-sm p-8">
          <div className="prose prose-sm md:prose-base text-gray-800 space-y-4">
            <h3 className="font-bold text-gray-900">📋 Assignment Brief</h3>
            <p>{dailyCase?.chapter.description}</p>
            <div className="border-t border-gray-400/30 pt-4">
              {qData ? (
                <div>
                  <p className="font-semibold text-gray-900 mb-2">Problem Statement:</p>
                  <div className="text-gray-700 leading-relaxed text-base">
                    {qData.question.split(/\$\$(.*?)\$\$/g).map((part: string, i: number) => (
                      <span key={i}>
                        {i % 2 === 1 ? (
                          <BlockMath math={part} />
                        ) : (
                          <span className="whitespace-pre-wrap">{part}</span>
                        )}
                      </span>
                    ))}
                  </div>
                </div>
              ) : (
                <p className="whitespace-pre-wrap">{dailyCase?.chapter.content}</p>
              )}
            </div>
            <div className="bg-gray-200/60 rounded-xl p-4 mt-4">
              <p className="font-bold text-gray-900 text-sm">🎁 Rewards</p>
              <p className="text-sm text-gray-600 mt-1">
                +{dailyCase?.xpReward} XP  •  +{dailyCase?.coinReward} Coins
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Result Banner */}
      {result && (
        <div className={`mx-auto mt-8 w-full max-w-lg rounded-2xl p-6 text-center ${
          result.success ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"
        }`}>
          {result.success ? <CheckCircle2 className="mx-auto mb-3 text-green-500" size={40} /> : <XCircle className="mx-auto mb-3 text-red-500" size={40} />}
          <p className="font-bold text-lg">{result.message}</p>
          {result.success && result.xp && (
            <p className="mt-2 text-sm text-green-700">🎉 You earned +{result.xp} XP and +{result.coins} Coins!</p>
          )}
        </div>
      )}

      {/* Answer Options */}
      {!result && qData && (
        <div className="mx-auto mt-8 w-full max-w-4xl grid grid-cols-2 md:grid-cols-4 gap-4">
          {qData.options.map((opt: string, idx: number) => (
            <button
              key={idx}
              disabled={submitting}
              onClick={() => handleSubmit(idx)}
              className={`p-6 rounded-2xl border ${answer === idx.toString() ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-400/80 bg-gray-300 text-gray-900'} shadow-sm text-center transition hover:bg-white hover:border-gray-500 disabled:opacity-50`}
            >
              <div className="text-xl font-bold mb-2 text-gray-500">
                Option {String.fromCharCode(65 + idx)}
              </div>
              <div className="text-lg">
                <InlineMath math={opt} />
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}