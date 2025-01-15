import React, { useState } from "react";
import axios from "axios";
import cookie from "js-cookie";
import styles from "./styles.module.css";
import Button from "@/components/Button/Button"; // ✅ Import Button Component

const NewBetaForm = ({ boulderId, onBetaAdded }) => {
  const [media, setMedia] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const token = cookie.get("jwt_token");

    try {
      const response = await axios.post(
        `http://localhost:3002/boulders/${boulderId}/beta`,
        { media },
        { headers: { Authorization: token } }
      );

      setSuccess("Beta added successfully!");

      setMedia("");

      if (onBetaAdded) {
        onBetaAdded();
      }
    } catch (err) {
      console.error(err.response?.data || err.message);
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
