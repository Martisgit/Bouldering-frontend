import React from "react";
import styles from "./styles.module.css";

const BetaItem = ({ beta, onLikeDislike }) => {
  if (!beta || !beta.media) {
    return <p>Error: Beta data is missing.</p>;
  }

  return (
    <div className={styles.betaItem}>
      {/* ✅ Display Beta Media */}
      {beta.media.endsWith(".mp4") ? (
        <video controls className={styles.betaMedia}>
          <source src={beta.media} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <img src={beta.media} alt="Beta" className={styles.betaMedia} />
      )}
      <div className={styles.betaActions}>
        <button
          onClick={() => onLikeDislike(beta.id, "like")}
          className={styles.likeBtn}
        >
          👍 {beta.likes.length}
        </button>
        <button
          onClick={() => onLikeDislike(beta.id, "dislike")}
          className={styles.dislikeBtn}
        >
          👎 {beta.dislikes.length}
        </button>
      </div>
    </div>
  );
};

export default BetaItem;
