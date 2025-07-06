import React, { useState } from "react";
import OptionListDraggable from "../components/OptionListDraggable";
import { Card } from "../components/ui/card";

const CreateQuiz = () => {
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([
    { text: "", type: "text", options: ["", ""] },
  ]);

  // Telegram WebApp user
  const tg = window.Telegram?.WebApp;
  const user = tg?.initDataUnsafe?.user;

  const addQuestion = () => {
    setQuestions((prev) => [...prev, { text: "", type: "text", options: ["", ""] }]);
  };

  const updateQuestion = (index: number, field: string, value: any) => {
    const copy = [...questions];
    (copy[index] as any)[field] = value;
    setQuestions(copy);
  };

  const saveQuiz = async () => {
    const quizData = {
      title,
      questions,
      user_id: user?.id,
      username: user?.username,
      first_name: user?.first_name,
    };

    try {
      const res = await fetch("http://localhost:8000/quiz/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(quizData),
      });
      const data = await res.json();
      alert("Квиз сохранён! ID: " + data.id);
    } catch (err) {
      console.error(err);
      alert("Ошибка при сохранении квиза");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0e0e0e] to-[#1a1a1a] text-white p-6">
      <div className="max-w-3xl mx-auto space-y-6">
        <Card className="bg-white/5 p-4 border border-white/10 backdrop-blur-sm">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Название квиза"
            className="w-full p-3 rounded bg-[#1a1a1a] border border-white/20 text-white text-lg placeholder-gray-400"
          />
        </Card>

        {questions.map((q, i) => (
          <Card key={i} className="bg-white/5 p-4 border border-white/10 space-y-4">
            <input
              type="text"
              value={q.text}
              onChange={(e) => updateQuestion(i, "text", e.target.value)}
              placeholder={`Вопрос ${i + 1}`}
              className="w-full p-3 rounded bg-[#1a1a1a] border border-white/20 text-white"
            />

            <select
              value={q.type}
              onChange={(e) => updateQuestion(i, "type", e.target.value)}
              className="w-full p-2 rounded bg-[#1a1a1a] border border-white/20 text-white"
            >
              <option value="text">Одиночный выбор</option>
              <option value="dropdown">Dropdown</option>
              <option value="emoji">Emoji</option>
              <option value="slider">Слайдер</option>
              <option value="text_with_image">Текст + Картинка</option>
              <option value="input">Свободный текст</option>
              <option value="datetime">Дата и время</option>
              <option value="file">Файл</option>
            </select>

            {["text", "emoji", "dropdown", "text_with_image"].includes(q.type) && (
              <OptionListDraggable
                options={q.options}
                onUpdate={(opts: any[]) => updateQuestion(i, "options", opts)}
                type={q.type}
              />
            )}

            {q.type === "slider" && (
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Минимум"
                  className="flex-1 p-2 rounded bg-[#1a1a1a] border border-white/20 text-white"
                  onChange={(e) => updateQuestion(i, "min", parseInt(e.target.value))}
                />
                <input
                  type="number"
                  placeholder="Максимум"
                  className="flex-1 p-2 rounded bg-[#1a1a1a] border border-white/20 text-white"
                  onChange={(e) => updateQuestion(i, "max", parseInt(e.target.value))}
                />
                <input
                  type="text"
                  placeholder="Единица"
                  className="w-24 p-2 rounded bg-[#1a1a1a] border border-white/20 text-white"
                  onChange={(e) => updateQuestion(i, "unit", e.target.value)}
                />
              </div>
            )}
          </Card>
        ))}

        <button
          onClick={addQuestion}
          className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition"
        >
          ➕ Добавить вопрос
        </button>

        <button
          onClick={saveQuiz}
          className="w-full py-3 rounded-xl bg-gradient-to-tr from-green-500 to-green-600 text-white font-semibold shadow-md hover:brightness-110 transition"
        >
          💾 Сохранить квиз
        </button>
      </div>
    </div>
  );
};

export default CreateQuiz;
