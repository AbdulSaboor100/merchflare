import React, { useEffect, useState } from "react";
import cc from "classnames";
import styles from "./Navbar.module.scss";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { logout } from "../../Redux/Features/getUserSlice";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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

  const handleLogout = () => {
    dispatch(logout());
    navigate("/signin");
  };

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
          <div className={styles.btn_container}>
            <Button size="small" onClick={handleLogout}>
              <svg
                focusable="false"
                aria-hidden="true"
                viewBox="0 0 24 24"
                data-testid="LogoutIcon"
                tabindex="-1"
                title="Logout"
              >
                <path d="m17 7-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4z"></path>
              </svg>
            </Button>
          </div>
        </div>
      </div>
      {scroll >= 64 && <div className={styles.bottom_shadow}></div>}
    </div>
  );
};

export default Navbar;
