import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreateQuiz from "./pages/CreateQuiz";
import PreviewQuizById from "./pages/PreviewQuizById";
import TakeQuiz from "./pages/TakeQuiz";
import PreviewQuiz from "./pages/PreviewQuiz";
import QuizMainMenu from "./pages/QuizMainMenu";
import HomeScreen from "./pages/HomeScreen"; // ✅ добавлено

const App = () => {
  return (
    <Router>
      <Routes>
        {/* 🏠 Главная стартовая страница в Telegram WebApp */}
        <Route path="/" element={<HomeScreen />} />

        {/* 🎛 Создание квиза */}
        <Route path="/create" element={<CreateQuiz />} />

        {/* 👁 Предпросмотр уже сохранённого квиза (по id) */}
        <Route path="/preview/:id" element={<PreviewQuizById />} />

        {/* 👁 Локальный предпросмотр в редакторе */}
        <Route path="/preview-local" element={<PreviewQuiz quiz={{ title: '', questions: [] }} />} />

        {/* 🧠 Прохождение квиза */}
        <Route path="/take/:id" element={<TakeQuiz />} />

        {/* 📋 Меню квиза / список */}
        <Route path="/quizzes" element={<QuizMainMenu />} />
      </Routes>
    </Router>
  );
};

export default App;
