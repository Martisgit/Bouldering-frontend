import React, { useState } from "react";
import { useRouter } from "next/router";
import styles from "./styles.module.css";
import { loginUser } from "@/api/UserApi";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const onLogin = async () => {
    setError("");

    try {
      const response = await loginUser(email, password);
      console.log("Token stored:", response.token);
      router.push("/boulders");
    } catch (err) {
      console.error("Login Error:", err.message || err);
      setError(err.message || "We have some problems. Please try again.");
    }
  };

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Login to Your Account</h2>

      {error && <p className={styles.error}>{error}</p>}

      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className={styles.input}
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className={styles.input}
      />

      <button onClick={onLogin} className={styles.button}>
        Login
      </button>

      <p className={styles.text}>
        <span> Don't have an account? </span>
        <span onClick={() => router.push("/signup")} className={styles.link}>
          Register
        </span>
      </p>
    </div>
  );
};

export default LoginPage;
