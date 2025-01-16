import React, { useState } from "react";
import styles from "./styles.module.css";
import Button from "@/components/Button/Button";
import { addBeta } from "@/api/BoulderApi";
const NewBetaForm = ({ boulderId, onBetaAdded }) => {
  const [media, setMedia] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      await addBeta(boulderId, media); // Use the `addBeta` function
      setSuccess("Beta added successfully!");
      setMedia("");

      if (onBetaAdded) {
        onBetaAdded(); // Notify the parent to refresh the Betas
      }
    } catch (err) {
      console.error("❌ Error adding beta:", err.response?.data || err.message);
      setError("Failed to add beta. Please try again.");
    }
  };

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.addBeta}>Add Beta (Video/Image)</h3>

      {error && <p className={` ${styles.betaError}`}>{error}</p>}
      {success && <p className={`${styles.betaSuccess}`}>{success}</p>}
      <form onSubmit={handleSubmit} className={styles.betaWrapper}>
        <input
          type="text"
          value={media}
          onChange={(e) => setMedia(e.target.value)}
          placeholder="Paste Image or Video URL"
          className={styles.betaInput}
          required
        />
        <Button type="submit" className={styles.betaSubmitButton}>
          Submit Beta
        </Button>
      </form>
    </div>
  );
};

export default NewBetaForm;
