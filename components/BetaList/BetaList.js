import React from "react";
import BetaItem from "@/components/BetaItem/BetaItem";
import styles from "./styles.module.css";

const BetaList = ({ betas, onLikeDislike }) => {
  if (!Array.isArray(betas) || betas.length === 0) {
    return <p>No beta available for this boulder.</p>;
  }

  return (
    <div className={styles.betaContainer}>
      {betas.map((beta) => (
        <BetaItem key={beta.id} beta={beta} onLikeDislike={onLikeDislike} />
      ))}
    </div>
  );
};

export default BetaList;
