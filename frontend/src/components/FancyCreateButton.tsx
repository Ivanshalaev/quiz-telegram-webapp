import React from "react";
import { Plus } from "lucide-react";
import { motion } from "framer-motion";

const FancyCreateButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <motion.button
      onClick={onClick}
      whileTap={{ scale: 0.96 }}
      className="relative inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-white bg-gradient-to-tr from-blue-500 to-purple-600 shadow-md overflow-hidden"
    >
      <span className="z-10 flex items-center gap-2">
        <Plus size={18} /> Новый квиз
      </span>

      {/* shimmer overlay */}
      <span
        className="absolute inset-0 bg-white/10 blur-sm animate-shimmer"
        aria-hidden
      ></span>

      <style>
        {`
          @keyframes shimmer {
            0% {
              transform: translateX(-100%);
            }
            50% {
              transform: translateX(100%);
            }
            100% {
              transform: translateX(100%);
            }
          }
          .animate-shimmer {
            background: linear-gradient(
              120deg,
              transparent,
              rgba(255, 255, 255, 0.2),
              transparent
            );
            animation: shimmer 2.5s infinite linear;
          }
        `}
      </style>
    </motion.button>
  );
};

export default FancyCreateButton;
