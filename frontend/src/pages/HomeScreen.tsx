import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { ClipboardList } from "lucide-react";
import FancyCreateButton from "../components/FancyCreateButton";
import { Card } from "../components/ui/card";
import LogoAnimated from "../components/LogoAnimated"; // 🔥 логотип

const HomeScreen = () => {
  useEffect(() => {
    const tg = window.Telegram?.WebApp;
    tg?.ready();
    tg?.expand();
    tg?.MainButton.setText("Начать");
    tg?.MainButton.show();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0e0e0e] to-[#1a1a1a] text-white flex flex-col items-center justify-between p-6">
      <div className="w-full max-w-sm mt-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="bg-white/5 border border-white/10 backdrop-blur-lg shadow-xl rounded-2xl p-6 flex flex-col items-center">
            {/* 🔥 Анимированный логотип */}
            <LogoAnimated />

            <h1 className="text-2xl font-bold text-center mb-2 tracking-wide mt-4">
              Конструктор Квизов
            </h1>
            <p className="text-center text-gray-400 mb-6 text-sm">
              Создай квиз, поделись с друзьями и собери ответы
            </p>

            <div className="flex flex-col gap-3 w-full">
              <FancyCreateButton onClick={() => (window.location.href = "/create")} />

              <motion.button
                whileTap={{ scale: 0.96 }}
                onClick={() => (window.location.href = "/quizzes")}
                className="relative w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-tr from-slate-700 to-slate-600 hover:to-slate-500 text-white border border-slate-500"
              >
                <ClipboardList size={18} /> Мои квизы
              </motion.button>
            </div>
          </Card>
        </motion.div>
      </div>

      <footer className="w-full max-w-sm mt-10 text-xs text-gray-500 text-center border-t border-gray-800 pt-4">
        <div className="flex justify-center gap-4 mb-2">
          <a href="https://t.me/yourchannel" target="_blank" rel="noreferrer" className="hover:underline">Telegram</a>
          <a href="https://github.com/yourrepo" target="_blank" rel="noreferrer" className="hover:underline">GitHub</a>
          <a href="#" className="hover:underline">Instagram</a>
        </div>
        <div className="mb-1">© {new Date().getFullYear()} QuizApp. Все права защищены.</div>
        <a href="#" className="hover:underline">Политика конфиденциальности</a>
      </footer>
    </div>
  );
};

export default HomeScreen;
