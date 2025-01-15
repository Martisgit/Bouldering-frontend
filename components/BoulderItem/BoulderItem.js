import React from "react";
import Link from "next/link";
import styles from "./styles.module.css";

const BoulderItem = ({ boulder }) => {
  const difficultyStyle = {
    color: boulder.difficulty > 5 ? "red" : "green",
  };

  return (
    <Link href={`/boulders/${boulder.id}`}>
      <div className={styles.wrapper}>
        <img
          src={boulder.picture}
          alt={boulder.name || "-"}
          className={styles.image}
        />
        <div className={styles.name}>{boulder.name || "-"}</div>
        <div className={styles.difficulty} style={difficultyStyle}>
          Difficulty: {boulder.difficulty}
        </div>
        <div className={styles.gym}>Gym: {boulder.gym || "-"}</div>
      </div>
    </Link>
  );
};

export default BoulderItem;
