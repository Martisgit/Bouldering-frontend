import React from "react";
import styles from "./styles.module.css";

const Spinner = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.spinner}></div>
    </div>
  );
};

export default Spinner;
