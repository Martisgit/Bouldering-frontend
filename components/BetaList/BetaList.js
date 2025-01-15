import React from "react";
import BetaItem from "@/components/BetaItem/BetaItem";
import styles from "./styles.module.css";

const BetaList = ({ betas, onLikeDislike, onDeleteBeta }) => {
  if (!Array.isArray(betas) || betas.length === 0) {
    return (
      <p className={styles.noBoulderMessage}>No beta added for this boulder.</p>
    );
  }

  return (
    <div className={styles.wrapper}>
      {betas.map((beta) => (
        <BetaItem
          key={beta.id}
          beta={beta}
          onLikeDislike={onLikeDislike}
          onDeleteBeta={onDeleteBeta}
        />
      ))}
    </div>
  );
};

export default BetaList;
