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

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>Boulder tracker</div>
      <Button onClick={handleLogout} className={styles.logoutButton}>
        Logout
      </Button>
    </div>
  );
};

export default Header;
