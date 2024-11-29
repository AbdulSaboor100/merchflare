import React from "react";
import styles from "./AuthLayout.module.scss";
import Navbar from "../../Components/Navbar/Navbar";

const AuthLayout = ({ children }) => {
  return (
    <div className={styles.auth_layout_container}>
      <Navbar />
      {children}
    </div>
  );
};

export default AuthLayout;
