import React from "react";
import Link from "next/link";
import styles from "./styles.module.css";

const BoulderItem = ({ boulder }) => {
  const difficultyStyle = {
    color: boulder.difficulty > 4 ? "red" : "green",
  };

  return (
    <Link href={`/boulders/${boulder.id}`}>
      <div className={styles.wrapper}>
        <div className={styles.name}>{boulder.name || "-"}</div>
        <img
          src={boulder.picture}
          alt={boulder.name || "-"}
          className={styles.image}
        />
        <div className={styles.gym}>Gym: {boulder.gym || "-"}</div>
        <div className={styles.difficulty} style={difficultyStyle}>
          Difficulty: {boulder.difficulty}
        </div>
      </div>
    </Link>
  );
};

export default BoulderItem;
