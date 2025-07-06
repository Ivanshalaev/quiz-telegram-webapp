import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PrettySlider from "../components/PrettySlider";
import { Card } from "../components/ui/card";

interface Question {
  id: number;
  type: string;
  text: string;
  options?: any[];
  min?: number;
  max?: number;
  unit?: string;
}

interface Quiz {
  title: string;
  questions: Question[];
}

const TakeQuiz = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [answers, setAnswers] = useState<any[]>([]);
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const fetchQuiz = async () => {
      const res = await fetch(`http://localhost:8000/quiz/${id}`);
      const data = await res.json();
      setQuiz(data);
    };
    fetchQuiz();
  }, [id]);

  const updateAnswer = (value: any) => {
    const q = quiz!.questions[step];
    setAnswers((prev) => {
      const copy = [...prev];
      const index = copy.findIndex((a) => a.questionId === q.id);
      if (index !== -1) copy[index] = { questionId: q.id, value };
      else copy.push({ questionId: q.id, value });
      return copy;
    });
  };

  const handleSubmit = async () => {
    await fetch(`http://localhost:8000/quiz/${id}/answers`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        answers,
        user: { name, phone, email },
      }),
    });
    navigate("/success");
  };

  if (!quiz) return <p className="text-white p-6">Загрузка...</p>;

  if (step >= quiz.questions.length) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0e0e0e] to-[#1a1a1a] text-white p-6">
        <div className="max-w-xl mx-auto space-y-4">
          <Card className="bg-white/5 border border-white/10 backdrop-blur-md">
            <h2 className="text-xl font-bold mb-3">Оставьте контактные данные (по желанию)</h2>
            <input
              placeholder="Имя"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full mb-3 p-3 rounded bg-[#1a1a1a] border border-white/20 text-white placeholder-gray-400"
            />
            <input
              placeholder="Телефон"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full mb-3 p-3 rounded bg-[#1a1a1a] border border-white/20 text-white placeholder-gray-400"
            />
            <input
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mb-4 p-3 rounded bg-[#1a1a1a] border border-white/20 text-white placeholder-gray-400"
            />
            <button
              onClick={handleSubmit}
              className="w-full py-3 rounded-xl bg-gradient-to-tr from-green-500 to-green-600 text-white font-semibold shadow-md hover:brightness-110 transition"
            >
              ✅ Отправить
            </button>
          </Card>
        </div>
      </div>
    );
  }

  const q = quiz.questions[step];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0e0e0e] to-[#1a1a1a] text-white p-6">
      <div className="max-w-xl mx-auto space-y-6">
        <Card className="bg-white/5 border border-white/10 backdrop-blur-md">
          <h2 className="text-xl font-bold mb-4">{quiz.title}</h2>
          <p className="mb-4 font-semibold">{step + 1}. {q.text}</p>

          {q.type === "text" && q.options?.map((opt, i) => (
            <label key={i} className="block mb-2">
              <input
                type="radio"
                name={`question-${q.id}`}
                value={opt}
                onChange={(e) => updateAnswer(e.target.value)}
                className="mr-2"
              />
              {opt}
            </label>
          ))}

          {q.type === "dropdown" && (
            <select
              onChange={(e) => updateAnswer(e.target.value)}
              className="w-full p-3 rounded bg-[#1a1a1a] border border-white/20 text-white"
            >
              <option value="">Выбери вариант</option>
              {q.options?.map((opt, i) => (
                <option key={i} value={opt}>{opt}</option>
              ))}
            </select>
          )}

          {q.type === "emoji" && (
            <div className="flex gap-3 mt-2">
              {q.options?.map((emoji, i) => (
                <button
                  key={i}
                  onClick={() => updateAnswer(emoji)}
                  className="text-2xl p-2 rounded bg-[#1a1a1a] border border-white/20 hover:bg-white/10"
                >
                  {emoji}
                </button>
              ))}
            </div>
          )}

          {q.type === "slider" && q.min !== undefined && q.max !== undefined && (
            <PrettySlider
              min={q.min}
              max={q.max}
              unit={q.unit}
              onChange={(val: number) => updateAnswer(val)}
            />
          )}

          {q.type === "input" && (
            <input
              type="text"
              onChange={(e) => updateAnswer(e.target.value)}
              className="w-full mt-2 p-3 rounded bg-[#1a1a1a] border border-white/20 text-white placeholder-gray-400"
              placeholder="Введите ответ"
            />
          )}

          {q.type === "datetime" && (
            <input
              type="datetime-local"
              onChange={(e) => updateAnswer(e.target.value)}
              className="w-full mt-2 p-3 rounded bg-[#1a1a1a] border border-white/20 text-white"
            />
          )}

          {q.type === "file" && (
            <input
              type="file"
              onChange={(e) => updateAnswer(e.target.files?.[0]?.name || "")}
              className="w-full mt-2 text-white"
            />
          )}

          <button
            onClick={() => setStep((s) => s + 1)}
            className="w-full mt-6 py-3 rounded-xl bg-gradient-to-tr from-blue-500 to-purple-600 text-white font-semibold shadow-md hover:brightness-110 transition"
          >
            Далее →
          </button>
        </Card>
      </div>
    </div>
  );
};

export default TakeQuiz;
