import React, { useState } from "react";
import styles from "./SignIn.module.scss";
import {
  Button,
  Divider,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import validator from "validator";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userSignIn } from "../../Redux/Features/userSignInSlice";

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [hidePassword, setHidePassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [clientError, setClientError] = useState({});

  const handleSignIn = () => {
    let isErr = false;
    let errors = {};

    if (!validator.isEmail(formData?.email)) {
      isErr = true;
      errors.email = "Email is invalid";
    }
    if (!validator.isLength(formData?.password, { min: 6 })) {
      isErr = true;
      errors.password = "Password should be 6 or more characters long";
    }
    if (validator.isEmpty(formData?.email)) {
      isErr = true;
      errors.email = "Email is required";
    }
    if (validator.isEmpty(formData?.password)) {
      isErr = true;
      errors.password = "Password is required";
    }

    if (isErr) {
      isErr = false;
      setClientError(errors);
    } else {
      setClientError({});
      const data = {
        data: {
          email: formData?.email,
          password: formData?.password,
        },
        onSuccess: () => {
          setFormData({
            email: "",
            password: "",
          });
        },
        navigate,
      };
      dispatch(userSignIn(data));
    }
  };
  return (
    <div className={styles.sign_in_container}>
      <Typography variant="h6">Merch flare</Typography>
      <div className={styles.form_container}>
        <Typography variant="h5">Sign in to Merch Flare</Typography>
        <Typography variant="body1">
          New user?{" "}
          <Typography variant="caption" onClick={() => navigate("/signup")}>
            Create an account
          </Typography>
        </Typography>
        <div className={styles.form}>
          <TextField
            label={"Email address"}
            value={formData?.email}
            onChange={(e) =>
              setFormData((d) => ({ ...d, email: e?.target?.value }))
            }
            variant="outlined"
          />
          <TextField
            label={"Password"}
            variant="outlined"
            sx={{ marginTop: "24px" }}
            value={formData?.password}
            onChange={(e) =>
              setFormData((d) => ({ ...d, password: e?.target?.value }))
            }
            type={!hidePassword ? "password" : "text"}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="start">
                    {!hidePassword ? (
                      <Button
                        className={styles.password_button}
                        onClick={() => setHidePassword(true)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden="true"
                          role="img"
                          width="1em"
                          height="1em"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            cx="12"
                            cy="12"
                            r="1.5"
                            fill="currentColor"
                          ></circle>
                          <path
                            fill="currentColor"
                            d="M15.29 18.12L14 16.78l-.07-.07l-1.27-1.27a4 4 0 0 1-.61.06A3.5 3.5 0 0 1 8.5 12a4 4 0 0 1 .06-.61l-2-2L5 7.87a15.9 15.9 0 0 0-2.87 3.63a1 1 0 0 0 0 1c.63 1.09 4 6.5 9.89 6.5h.25a9.5 9.5 0 0 0 3.23-.67ZM8.59 5.76l2.8 2.8A4 4 0 0 1 12 8.5a3.5 3.5 0 0 1 3.5 3.5a4 4 0 0 1-.06.61l2.68 2.68l.84.84a15.9 15.9 0 0 0 2.91-3.63a1 1 0 0 0 0-1c-.64-1.11-4.16-6.68-10.14-6.5a9.5 9.5 0 0 0-3.23.67Zm12.12 13.53L19.41 18l-2-2l-9.52-9.53L6.42 5L4.71 3.29a1 1 0 0 0-1.42 1.42L5.53 7l1.75 1.7l7.31 7.3l.07.07L16 17.41l.59.59l2.7 2.71a1 1 0 0 0 1.42 0a1 1 0 0 0 0-1.42"
                          ></path>
                        </svg>
                      </Button>
                    ) : (
                      <Button
                        className={styles.password_button}
                        onClick={() => setHidePassword(false)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden="true"
                          role="img"
                          width="1em"
                          height="1em"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            cx="12"
                            cy="12"
                            r="1.5"
                            fill="currentColor"
                          ></circle>
                          <path
                            fill="currentColor"
                            d="M21.87 11.5c-.64-1.11-4.16-6.68-10.14-6.5c-5.53.14-8.73 5-9.6 6.5a1 1 0 0 0 0 1c.63 1.09 4 6.5 9.89 6.5h.25c5.53-.14 8.74-5 9.6-6.5a1 1 0 0 0 0-1m-9.87 4a3.5 3.5 0 1 1 3.5-3.5a3.5 3.5 0 0 1-3.5 3.5"
                          ></path>
                        </svg>
                      </Button>
                    )}
                  </InputAdornment>
                ),
              },
            }}
          />
          {/* <Typography variant={"caption"}>Forgot Password</Typography> */}
          <Button
            variant="contained"
            size="large"
            className={styles.login_button}
            onClick={handleSignIn}
          >
            Login
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
