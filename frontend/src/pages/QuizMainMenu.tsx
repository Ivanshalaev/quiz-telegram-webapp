import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "../components/ui/card";
import { PlayCircle, Eye, Trash } from "lucide-react";

interface QuizItem {
  id: number;
  title: string;
}

const QuizMainMenu = () => {
  const [quizzes, setQuizzes] = useState<QuizItem[]>([]);
  const navigate = useNavigate();

  const tg = window.Telegram?.WebApp;
  const user = tg?.initDataUnsafe?.user;

  useEffect(() => {
    if (!user?.id) return;

    fetch(`http://localhost:8000/quiz/my?user_id=${user.id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Квизы загружены:", data);
        setQuizzes(data);
      })
      .catch((err) => {
        console.error("Ошибка загрузки квизов:", err);
      });
  }, [user?.id]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0e0e0e] to-[#1a1a1a] text-white p-6">
      <div className="max-w-3xl mx-auto space-y-4">
        <h1 className="text-2xl font-bold mb-4">🧩 Мои квизы</h1>

        {Array.isArray(quizzes) && quizzes.length > 0 ? (
          quizzes.map((quiz) => (
            <Card
              key={quiz.id}
              className="bg-white/5 border border-white/10 backdrop-blur-sm p-4 flex items-center justify-between"
            >
              <span className="font-semibold text-lg">{quiz.title}</span>

              <div className="flex gap-3">
                <button
                  onClick={() => navigate(`/preview/${quiz.id}`)}
                  title="Предпросмотр"
                  className="hover:text-blue-400 transition"
                >
                  <Eye size={20} />
                </button>
                <button
                  onClick={() => navigate(`/take/${quiz.id}`)}
                  title="Пройти"
                  className="hover:text-green-400 transition"
                >
                  <PlayCircle size={20} />
                </button>
                <button
                  onClick={() => alert("Удаление пока не реализовано")}
                  title="Удалить"
                  className="hover:text-red-400 transition"
                >
                  <Trash size={20} />
                </button>
              </div>
            </Card>
          ))
        ) : (
          <p className="text-gray-400">У вас пока нет квизов.</p>
        )}
      </div>
    </div>
  );
};

export default QuizMainMenu;
