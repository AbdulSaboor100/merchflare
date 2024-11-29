import React from "react";
import styles from "./Home.module.scss";
import AuthLayout from "../../Layout/AuthLayout/AuthLayout";
import HomeSideBar from "../../Components/Home/HomeSideBar/HomeSideBar";
import { Grid, Grid2 } from "@mui/material";
import ProductCard from "../../Components/Home/ProductCard/ProductCard";

const Home = () => {
  return (
    <AuthLayout>
      <div className={styles.main_home_container}>
        <Grid container spacing={3}>
          <Grid item sm={12} md={4} lg={3}>
            <HomeSideBar />
          </Grid>
          <Grid item sm={12} md={8} lg={9}>
            <Grid container spacing={4}>
              <Grid item lg={3}>
                <ProductCard />
              </Grid>
              <Grid item lg={3}>
                <ProductCard />
              </Grid>
              <Grid item lg={3}>
                <ProductCard />
              </Grid>
              <Grid item lg={3}>
                <ProductCard />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </AuthLayout>
  );
};

export default Home;
