import React, { useEffect } from "react";
import styles from "./Home.module.scss";
import AuthLayout from "../../Layout/AuthLayout/AuthLayout";
import HomeSideBar from "../../Components/Home/HomeSideBar/HomeSideBar";
import { Grid, Grid2 } from "@mui/material";
import ProductCard from "../../Components/Home/ProductCard/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { getMerch } from "../../Redux/Features/getMerchSlice";

const Home = () => {
  const dispatch = useDispatch();
  const { data: merchData } = useSelector((state) => state?.getMerch);

  useEffect(() => {
    dispatch(getMerch());
  }, []);

  console.log(merchData);

  return (
    <AuthLayout>
      <div className={styles.main_home_container}>
        <Grid container spacing={3}>
          <Grid item sm={12} md={4} lg={3}>
            <HomeSideBar />
          </Grid>
          <Grid item sm={12} md={8} lg={9}>
            <Grid container spacing={4}>
              {merchData?.map((item, i) => (
                <Grid item lg={3} key={i}>
                  <ProductCard data={item} />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </div>
    </AuthLayout>
  );
};

export default Home;
