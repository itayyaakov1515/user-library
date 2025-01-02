import React from "react";
import { ButtonProps } from "../types/ButtonProps";

const Button: React.FC<ButtonProps> = ({
  text,
  onClick,
  color = "green",
  size = "medium",
  disabled = false,
  type = "button",
  width,
}) => {
  const buttonStyle: React.CSSProperties = {
    backgroundColor: color,
    color: "white",
    border: "none",
    borderRadius: "4px",
    padding:
      size === "large"
        ? "12px 24px"
        : size === "small"
        ? "6px 12px"
        : "8px 16px",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.6 : 1,
    fontSize: size === "large" ? "16px" : size === "small" ? "12px" : "14px",
    width: width, 
  };

  return (
    <button
      type={type}
      onClick={onClick}
      style={buttonStyle}
      disabled={disabled}>
      {text}
    </button>
  );
};

export default Button;
