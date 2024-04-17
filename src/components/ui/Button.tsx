import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "light" | "dark" | "white";
  onClick?: () => void;
  className?: string;
}


const Button = ({ children, variant = "light", onClick, className }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center font-semibold ${
        variant == "dark"
          ? "bg-main text-white"
          : variant == "light"
          ? "text-main bg-[rgba(81, 56, 238, 0.06)]"
          : "bg-white text-main"
      }  py-3 px-6 border-main rounded-md text-nowrap cursor-pointer duration-200 hover:scale-105 ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
