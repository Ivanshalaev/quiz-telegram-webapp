import React, { useState } from "react";
import PrettySlider from "../components/PrettySlider";
import { Card } from "../components/ui/card";

interface Question {
  id: number;
  type: string;
  text: string;
  options?: any[];
  image?: string;
  min?: number;
  max?: number;
  unit?: string;
}

interface Quiz {
  title: string;
  questions: Question[];
}

const PreviewQuiz = ({ quiz }: { quiz: Quiz }) => {
  const [answers, setAnswers] = useState<any[]>([]);

  const updateAnswer = (questionId: number, value: any) => {
    setAnswers((prev) => {
      const copy = [...prev];
      const index = copy.findIndex((a) => a.questionId === questionId);
      if (index !== -1) {
        copy[index] = { questionId, value };
      } else {
        copy.push({ questionId, value });
      }
      return copy;
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0e0e0e] to-[#1a1a1a] text-white p-6">
      <div className="max-w-3xl mx-auto space-y-6">
        <Card className="bg-white/5 border border-white/10 backdrop-blur-lg shadow-md">
          <h2 className="text-2xl font-bold text-center">{quiz.title || "Без названия"}</h2>
        </Card>

        {quiz.questions.map((q, i) => (
          <Card key={q.id} className="bg-white/5 border border-white/10 backdrop-blur-md shadow-sm">
            <div className="mb-4 font-semibold">
              {i + 1}. {q.text}
            </div>

            {q.type === "text" && q.options?.map((opt, idx) => (
              <label key={idx} className="block mb-2">
                <input
                  type="radio"
                  name={`question-${q.id}`}
                  value={opt}
                  onChange={(e) => updateAnswer(q.id, e.target.value)}
                  className="mr-2"
                />
                {opt}
              </label>
            ))}

            {q.type === "text_with_image" && q.options?.map((opt: any, idx) => (
              <div key={idx} className="mb-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name={`question-${q.id}`}
                    value={opt.text}
                    onChange={() => updateAnswer(q.id, opt.text)}
                    className="mr-2"
                  />
                  {opt.text}
                </label>
                {opt.image && (
                  <img src={opt.image} alt="option" className="mt-1 max-w-xs rounded" />
                )}
              </div>
            ))}

            {q.type === "dropdown" && (
              <select
                onChange={(e) => updateAnswer(q.id, e.target.value)}
                className="w-full p-2 rounded bg-[#1a1a1a] border border-white/20 text-white"
              >
                <option value="">Выберите</option>
                {q.options?.map((opt, idx) => (
                  <option key={idx} value={opt}>{opt}</option>
                ))}
              </select>
            )}

            {q.type === "emoji" && (
              <div className="flex gap-3 mt-2">
                {q.options?.map((emoji, idx) => (
                  <button
                    key={idx}
                    onClick={() => updateAnswer(q.id, emoji)}
                    className="text-2xl p-2 rounded bg-[#1a1a1a] border border-white/20 hover:bg-white/10"
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            )}

            {q.type === "slider" && q.min !== undefined && q.max !== undefined && (
              <div className="mt-4">
                <PrettySlider
                  min={q.min}
                  max={q.max}
                  unit={q.unit}
                  onChange={(val) => updateAnswer(q.id, val)}
                />
              </div>
            )}

            {q.type === "input" && (
              <input
                type="text"
                onChange={(e) => updateAnswer(q.id, e.target.value)}
                className="w-full mt-2 p-2 rounded bg-[#1a1a1a] border border-white/20 text-white placeholder-gray-400"
                placeholder="Введите текст"
              />
            )}

            {q.type === "datetime" && (
              <input
                type="datetime-local"
                onChange={(e) => updateAnswer(q.id, e.target.value)}
                className="w-full mt-2 p-2 rounded bg-[#1a1a1a] border border-white/20 text-white"
              />
            )}

            {q.type === "file" && (
              <input
                type="file"
                onChange={(e) => updateAnswer(q.id, e.target.files?.[0])}
                className="w-full mt-2"
              />
            )}
          </Card>
        ))}

        <button
          onClick={() => console.log("Ответы:", answers)}
          className="w-full py-3 rounded-xl bg-gradient-to-tr from-blue-500 to-purple-600 text-white font-semibold shadow-md hover:brightness-110 transition"
        >
          ✅ Завершить и показать ответы
        </button>
      </div>
    </div>
  );
};

export default PreviewQuiz;
