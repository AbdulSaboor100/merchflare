import React from "react";
import styles from "./ProductCard.module.scss";
import { Box, Divider, Paper, Typography } from "@mui/material";

const ProductCard = () => {
  return (
    <Paper className={styles.product_card_container}>
      <div className={styles.image_container}>
        <Box
          component={"img"}
          src={"/Assets/product_1.png"}
          alt={"Product image"}
        />
      </div>
      <div className={styles.title_container}>
        <Typography variant="h6">Mens Fishing TShirt Dont</Typography>
        <Typography variant="body1">
          <Typography variant="caption">by</Typography>Geni Game
        </Typography>
      </div>
      <Divider></Divider>
      <div className={styles.details_container}>
        <Box className={styles.color_strip}></Box>
        <div className={styles.side}>
          <Typography className={styles.text_1}>2,125</Typography>
          <Typography className={styles.text_2}>311</Typography>
        </div>
        <div className={styles.side}>
          <Typography className={styles.text_1}>$19.99</Typography>
          <Typography className={styles.text_2}>2 days ago</Typography>
        </div>
        <div className={styles.side}>
          <Typography className={styles.text_1}>52,115</Typography>
          <Typography className={styles.text_2}>111</Typography>
        </div>
        <div className={styles.side}>
          <Typography className={styles.text_1}>May 31, 2022</Typography>
          <Typography className={styles.text_2}>Game Action</Typography>
        </div>
      </div>
    </Paper>
  );
};

export default ProductCard;
