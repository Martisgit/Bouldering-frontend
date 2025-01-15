import React, { useState } from "react";
import cookie from "js-cookie";
import axios from "axios";
import { useRouter } from "next/router";
import styles from "./styles.module.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const onLogin = async () => {
    setError("");

    try {
      const userData = {
        email,
        password,
      };

      const response = await axios.post(
        "http://localhost:3002/login",
        userData
      );

      if (response.status === 200) {
        cookie.set("jwt_token", response.data.token, {
          expires: 1,
          secure: true,
          sameSite: "strict", // Prevents CSRF attacks
        });

        console.log("Token stored:", response.data.token);
        cookie.set("user_id", response.data.user.id);
        router.push("/boulders");
      }
    } catch (err) {
      console.error("Login Error:", err.response?.data || err.message);
      setError(
        err.response?.data?.message ||
          "We have some problems. Please try again."
      );
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
