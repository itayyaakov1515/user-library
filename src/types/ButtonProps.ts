export interface ButtonProps {
  text: string;
  onClick: () => void;
  color?: "green" | "grey" | "red";
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  type?: "button" | "submit";
  width?: string;
}
