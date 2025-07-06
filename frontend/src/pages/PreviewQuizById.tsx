import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const PreviewQuizById = () => {
  const { id } = useParams();
  const [quiz, setQuiz] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState<{ [key: number]: any }>({});

  useEffect(() => {
    fetch(`http://localhost:8000/quiz/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Квиз не найден");
        return res.json();
      })
      .then((data) => {
        setQuiz(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  const handleAnswerChange = (questionId: number, value: any) => {
    setAnswers((prev) => {
      const updated = { ...prev, [questionId]: value };
      console.log("Ответы:", updated);
      localStorage.setItem("quiz_answers_" + id, JSON.stringify(updated));
      return updated;
    });
  };

  const handleSubmit = async () => {
    try {
      const res = await fetch(`http://localhost:8000/quiz/${id}/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(answers)
      });

      if (res.ok) {
        alert("Ответы успешно отправлены!");
      } else {
        alert("Ошибка при отправке");
      }
    } catch (err) {
      console.error(err);
      alert("Ошибка сети");
    }
  };

  if (loading) return <p style={{ padding: 20 }}>Загрузка...</p>;
  if (!quiz) return <p style={{ padding: 20 }}>Квиз не найден 😢</p>;

  return (
    <div style={{ maxWidth: 700, margin: "0 auto", padding: 20 }}>
      <h2 style={{ fontSize: 24, marginBottom: 20 }}>{quiz.title}</h2>

      {quiz.questions.map((q: any, index: number) => (
        <div key={q.id} style={{ marginBottom: 30 }}>
          <p style={{ fontWeight: "bold", marginBottom: 8 }}>
            {index + 1}. {q.text}
          </p>

          {q.type === "text" &&
            q.options?.map((opt: string, i: number) => (
              <div key={i}>
                <label>
                  <input
                    type="radio"
                    name={`q_${q.id}`}
                    value={opt}
                    onChange={() => handleAnswerChange(q.id, opt)}
                  /> {opt}
                </label>
              </div>
            ))}

          {q.type === "input" && (
            <input
              type="text"
              onChange={(e) => handleAnswerChange(q.id, e.target.value)}
              style={{ width: "100%", padding: 8 }}
            />
          )}

          {q.type === "dropdown" && (
            <select
              onChange={(e) => handleAnswerChange(q.id, e.target.value)}
              style={{ padding: 8 }}
            >
              <option value="">Выбрать</option>
              {q.options?.map((opt: string, i: number) => (
                <option key={i}>{opt}</option>
              ))}
            </select>
          )}

          {q.type === "emoji" && (
            <div style={{ fontSize: 24 }}>
              {q.options?.map((em: string, i: number) => (
                <button
                  key={i}
                  style={{ fontSize: 32, marginRight: 10 }}
                  onClick={() => handleAnswerChange(q.id, em)}
                >
                  {em}
                </button>
              ))}
            </div>
          )}

          {q.type === "datetime" && (
            <input
              type="datetime-local"
              onChange={(e) => handleAnswerChange(q.id, e.target.value)}
              style={{ padding: 8 }}
            />
          )}

          {q.type === "file" && (
            <input
              type="file"
              onChange={(e) =>
                handleAnswerChange(q.id, e.target.files?.[0]?.name || "")
              }
            />
          )}
        </div>
      ))}

      <button
        onClick={handleSubmit}
        style={{
          padding: "12px 24px",
          backgroundColor: "green",
          color: "white",
          fontWeight: "bold"
        }}
      >
        📤 Отправить ответы
      </button>
    </div>
  );
};

export default PreviewQuizById;
