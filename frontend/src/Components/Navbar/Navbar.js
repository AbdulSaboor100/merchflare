import React, { useEffect, useState } from "react";
import cc from "classnames";
import styles from "./Navbar.module.scss";

const Navbar = () => {
  const [scroll, setScroll] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY);
    };

    // Attach the scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Cleanup function to remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={styles.main_navbar_container}>
      <div
        className={cc(
          styles.navbar_container,
          scroll >= 64 && styles.modifiy_navbar
        )}
      >
        <div className={styles.brand_container}>
          <h3>Merch Flare</h3>
        </div>
        <div className={styles.details_container}>
          <p>Home</p>
          <p className={styles.selected}>Search</p>
          <p>Collections</p>
        </div>
      </div>
      {scroll >= 64 && <div className={styles.bottom_shadow}></div>}
    </div>
  );
};

export default Navbar;
