import React, { useEffect, useState } from "react";
import styles from "./Home.module.scss";
import AuthLayout from "../../Layout/AuthLayout/AuthLayout";
import HomeSideBar from "../../Components/Home/HomeSideBar/HomeSideBar";
import { Grid, Grid2 } from "@mui/material";
import ProductCard from "../../Components/Home/ProductCard/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { getMerch } from "../../Redux/Features/getMerchSlice";

const Home = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state?.getMerch);
  const [merchData, setMerchData] = useState([]);
  const [filters, setFilters] = useState({
    title: "",
    marketPlace: "",
    sortBy: "",
    priceRange: {
      min: "",
      max: "",
    },
    avg30Bsr: {
      min: "",
      max: "",
    },
    reviewsRange: {
      min: "",
      max: "",
    },
    salesRange: {
      min: "",
      max: "",
    },
    salesRangeRank: {
      min: "",
      max: "",
    },
    publishedAfter: "",
  });

  useEffect(() => {
    dispatch(getMerch());
  }, []);

  useEffect(() => {
    setMerchData(data);
  }, [data]);

  // console.log(merchData);

  return (
    <AuthLayout>
      <div className={styles.main_home_container}>
        <Grid container spacing={3}>
          <Grid item sm={12} md={4} lg={3}>
            <HomeSideBar
              filters={filters}
              setFilters={setFilters}
              data={data}
              merchData={merchData}
              setMerchData={setMerchData}
            />
          </Grid>
          <Grid item sm={12} md={8} lg={9}>
            <Grid container spacing={4}>
              {merchData?.map((item, i) => (
                <Grid item xs={12} sm={4} md={4} lg={3} xl={3} key={i}>
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
