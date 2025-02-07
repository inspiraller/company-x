import { PropsWithChildren } from "react";
import styles from "@/styles/button.module.css";

interface PropsButton extends PropsWithChildren {
  type: "button" | "submit" | "reset";
  isActive?: boolean;
}
export const Button = ({ type, children, isActive }: PropsButton) => {
  return (
    <button type={type} className={isActive ? styles["button-active"] : ""}>
      {children}
    </button>
  );
};
