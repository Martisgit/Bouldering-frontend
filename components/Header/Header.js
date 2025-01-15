import React from "react";
import { useRouter } from "next/router";
import cookie from "js-cookie";
import styles from "./styles.module.css";
import Button from "../Button/Button";

const Header = () => {
  const router = useRouter();

  const handleLogout = () => {
    cookie.remove("jwt_token");
    router.push("/login");
  };

  const handleGoToBoulders = () => {
    router.push("/boulders");
  };

  const handleGoToInsert = () => {
    router.push("/insert");
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>Boulder Tracker</div>
      <div className={styles.buttonContainer}>
        <Button onClick={handleGoToBoulders} className={styles.bouldersButton}>
          🧗 Boulders
        </Button>
        <Button onClick={handleGoToInsert} className={styles.insertButton}>
          ➕ Add Boulder
        </Button>
        <Button onClick={handleLogout} className={styles.logoutButton}>
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Header;
