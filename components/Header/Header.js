import React from "react";
import { useRouter } from "next/router";
import cookie from "js-cookie";
import styles from "./styles.module.css";
import Button from "../Button/Button";

const Header = () => {
  const router = useRouter();
  const { pathname } = router; // Get the current page path

  const handleLogout = () => {
    cookie.remove("jwt_token");
    router.push("/login");
  };

  // Hide logout button on /login and /signup pages
  const hideLogout = pathname === "/login" || pathname === "/signup";

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>Boulder Tracker</div>
      {!hideLogout && (
        <Button onClick={handleLogout} className={styles.logoutButton}>
          Logout
        </Button>
      )}
    </div>
  );
};

export default Header;
