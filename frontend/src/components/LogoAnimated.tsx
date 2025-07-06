import React from "react";
import { motion } from "framer-motion";

const LogoAnimated: React.FC = () => {
  return (
    <motion.svg
      width="80"
      height="80"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 2, ease: "easeInOut" }}
    >
      {/* Квадрат — как форма бумаги */}
      <motion.rect
        x="15"
        y="15"
        width="70"
        height="70"
        rx="10"
        stroke="#fff"
        strokeWidth="4"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5 }}
      />
      {/* Галочка */}
      <motion.path
        d="M30 50 L45 65 L70 35"
        stroke="#00ffcc"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5, delay: 0.5 }}
      />
    </motion.svg>
  );
};

export default LogoAnimated;
