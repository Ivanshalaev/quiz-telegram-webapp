import React from "react";
import classNames from "classnames";

export const Button: React.FC<{
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: "primary" | "outline";
}> = ({ children, className, onClick, variant = "primary" }) => {
  const base =
    variant === "primary"
      ? "bg-blue-600 text-white hover:bg-blue-700"
      : "border border-gray-300 text-gray-700 dark:text-gray-200";

  return (
    <button
      onClick={onClick}
      className={classNames(
        "w-full py-3 px-4 rounded-xl text-center text-lg transition-all",
        base,
        className
      )}
    >
      {children}
    </button>
  );
};
