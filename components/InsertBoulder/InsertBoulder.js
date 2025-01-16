import React, { useState } from "react";
import { useRouter } from "next/router"; // Import useRouter
import styles from "./styles.module.css";
import { insertBoulder } from "@/api/BoulderApi";

const InsertBoulderForm = () => {
  const [name, setName] = useState("");
  const [gym, setGym] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [picture, setPicture] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter(); // Initialize useRouter

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      await insertBoulder(name, gym, difficulty, picture);

      setSuccess("Boulder added successfully!");

      setName("");
      setGym("");
      setDifficulty("");
      setPicture("");

      router.push("/boulders");
    } catch (err) {
      console.error(
        "❌ Error inserting boulder:",
        err.response?.data || err.message
      );
      setError("Failed to insert boulder. Please try again.");
    }
  };

  return (
    <div className={styles.container}>
      <h2>Add a New Boulder</h2>

      {error && <p className={styles.error}>{error}</p>}
      {success && <p className={styles.success}>{success}</p>}

      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Boulder Name"
          required
          className={styles.input}
        />
        <input
          type="text"
          value={gym}
          onChange={(e) => setGym(e.target.value)}
          placeholder="Gym Name"
          required
          className={styles.input}
        />
        <input
          type="number"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          placeholder="Difficulty (1-10)"
          min="1"
          max="10"
          required
          className={styles.input}
        />
        <input
          type="text"
          value={picture}
          onChange={(e) => setPicture(e.target.value)}
          placeholder="Image URL (optional)"
          className={styles.input}
        />

        <button type="submit" className={styles.button}>
          Add Boulder
        </button>
      </form>
    </div>
  );
};

export default InsertBoulderForm;
