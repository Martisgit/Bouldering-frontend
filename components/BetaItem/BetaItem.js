import React from "react";
import Button from "../Button/Button";
import styles from "./styles.module.css";
import cookie from "js-cookie";

const BetaItem = ({ beta, onLikeDislike, onDeleteBeta }) => {
  const loggedInUserId = cookie.get("user_id");

  const isYouTube =
    beta.media.includes("youtube") || beta.media.includes("youtu.be");
  const isVideo = beta.media.includes(".mp4") || beta.media.includes(".webm");

  if (!beta || !beta.media) {
    return <p>Error: Beta data is missing.</p>;
  }

  return (
    <div className={styles.betaItem}>
      {isYouTube ? (
        <iframe
          className={styles.betaMedia}
          src={beta.media.replace("watch?v=", "embed/")}
          title="YouTube Video"
          allowFullScreen
        ></iframe>
      ) : isVideo ? (
        <video className={styles.betaMedia} controls>
          <source src={beta.media} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <img src={beta.media} alt="Beta Preview" className={styles.betaMedia} />
      )}
      <div className={styles.betaActions}>
        <Button
          onClick={() => onLikeDislike(beta.id, "like")}
          className={styles.likeBtn}
        >
          👍 {beta.likes.length}
        </Button>
        <Button
          onClick={() => onLikeDislike(beta.id, "dislike")}
          className={styles.dislikeBtn}
        >
          👎 {beta.dislikes.length}
        </Button>
        {beta.createdBy === loggedInUserId && (
          <Button
            onClick={() => onDeleteBeta(beta.id)}
            className={styles.deleteBtn}
          >
            🗑️ Delete
          </Button>
        )}
      </div>
    </div>
  );
};

export default BetaItem;
