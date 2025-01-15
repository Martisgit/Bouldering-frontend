import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import cookie from "js-cookie";
import styles from "./styles.module.css";

const SignupForm = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const onSignup = async () => {
    setError("");

    try {
      const response = await axios.post("http://localhost:3002/register", {
        email,
        name,
        password,
      });

      if (response.status === 201) {
        if (response.data.token) {
          cookie.set("jwt_token", response.data.token, {
            secure: true,
            sameSite: "strict",
          });
          console.log("✅ Token stored:", response.data.token);
        } else {
          console.error("❌ Token missing in response");
        }

        if (response.data.user && response.data.user.id) {
          cookie.set("user_id", response.data.user.id);
          console.log("✅ User ID stored:", response.data.user.id);
        } else {
          console.error("❌ User ID missing in response");
        }

        router.push("/boulders");
      } else {
        setError(response.data.message || "Sign up failed. Please try again.");
      }
    } catch (err) {
      console.error("Signup Error:", err.response?.data || err.message);
      setError(
        err.response?.data?.message || "Sign up failed. Please try again."
      );
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
