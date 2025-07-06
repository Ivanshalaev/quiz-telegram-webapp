// src/components/ui/card.tsx
import React from "react";
import classNames from "classnames";

export const Card: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => {
  return (
    <div
      className={classNames(
        "rounded-2xl p-6 shadow-md bg-white dark:bg-[#1e1e1e]",
        className
      )}
    >
      {children}
    </div>
  );
};
