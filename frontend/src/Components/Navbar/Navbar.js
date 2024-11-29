import React from "react";
import styles from "./Navbar.module.scss";

const Navbar = () => {
  return (
    <div className={styles.navbar_container}>
      <div className={styles.brand_container}>
        <h3>Merch Flare</h3>
      </div>
      <div className={styles.details_container}>
        <p>Home</p>
        <p className={styles.selected}>Search</p>
        <p>Collections</p>
      </div>
    </div>
  );
};

export default Navbar;
