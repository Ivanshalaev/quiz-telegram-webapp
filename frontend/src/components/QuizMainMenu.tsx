import React from "react";
import { Cog6ToothIcon, PlusCircleIcon, ClipboardDocumentListIcon } from "@heroicons/react/24/outline";

interface Props {
  onCreateQuiz: () => void;
  onViewQuizzes: () => void;
  onSettings: () => void;
}

const QuizMainMenu: React.FC<Props> = ({ onCreateQuiz, onViewQuizzes, onSettings }) => {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-900 dark:text-white">
        Квиз-конструктор
      </h1>
      <p className="text-center text-gray-600 dark:text-gray-300 mb-12">
        Создавайте, управляйте и делитесь своими квизами легко и быстро.
      </p>

      <div className="grid gap-6 sm:grid-cols-3">
        <button
          onClick={onCreateQuiz}
          className="flex flex-col items-center justify-center rounded-lg border border-gray-300 dark:border-gray-700 p-6 bg-white dark:bg-gray-800 shadow-md hover:shadow-xl transition-shadow duration-300"
        >
          <PlusCircleIcon className="h-12 w-12 text-blue-500 mb-4" />
          <span className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            Создать квиз
          </span>
        </button>

        <button
          onClick={onViewQuizzes}
          className="flex flex-col items-center justify-center rounded-lg border border-gray-300 dark:border-gray-700 p-6 bg-white dark:bg-gray-800 shadow-md hover:shadow-xl transition-shadow duration-300"
        >
          <ClipboardDocumentListIcon className="h-12 w-12 text-green-500 mb-4" />
          <span className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            Мои квизы
          </span>
        </button>

        <button
          onClick={onSettings}
          className="flex flex-col items-center justify-center rounded-lg border border-gray-300 dark:border-gray-700 p-6 bg-white dark:bg-gray-800 shadow-md hover:shadow-xl transition-shadow duration-300"
        >
          <Cog6ToothIcon className="h-12 w-12 text-yellow-500 mb-4" />
          <span className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            Настройки
          </span>
        </button>
      </div>
    </div>
  );
};

export default QuizMainMenu;
