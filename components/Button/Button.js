import React from "react";
import styles from "./styles.module.css";

const Button = ({ onClick, children, className }) => {
  return (
    <button onClick={onClick} className={`${styles.button} ${className}`}>
      {children}
    </button>
  );
};

export default Button;
