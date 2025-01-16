import React, { useState } from "react";
import { useRouter } from "next/router";
import styles from "./styles.module.css";
import { registerUser } from "@/api/UserApi"; // Import the API function

const SignupForm = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const onSignup = async () => {
    setError("");

    try {
      await registerUser(email, name, password); // Use the registerUser function
      console.log("User registered successfully.");
      router.push("/boulders"); // Redirect to boulders page
    } catch (err) {
      console.error("Signup Error:", err.message || err);
      setError(err.message || "Sign up failed. Please try again.");
    }
  };

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Create an Account</h2>

      {error && <p className={styles.error}>{error}</p>}

      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className={styles.input}
      />
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        className={styles.input}
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className={styles.input}
      />

      <button onClick={onSignup} className={styles.button}>
        Sign Up
      </button>

      <p className={styles.text}>
        <span> Already have an account? </span>
        <a onClick={() => router.push("/login")} className={styles.link}>
          Login
        </a>
      </p>
    </div>
  );
};

export default SignupForm;
