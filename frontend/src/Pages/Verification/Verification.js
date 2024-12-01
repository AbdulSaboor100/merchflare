import { CircularProgress, Typography } from "@mui/material";
import React, { useEffect } from "react";
import styles from "./Verification.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userVerify } from "../../Redux/Features/userVerifySlice";

const Verification = () => {
  const { code } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, message, errors } = useSelector(
    (state) => state?.userVerify
  );

  useEffect(() => {
    dispatch(
      userVerify({
        data: {
          navigate,
          code,
        },
      })
    );
  }, []);

  return (
    <div className={styles.verification_container}>
      {isLoading ? (
        <CircularProgress size="3rem" />
      ) : (
        <Typography variant="h6">{message || errors[0]?.message}</Typography>
      )}
    </div>
  );
};

export default Verification;
