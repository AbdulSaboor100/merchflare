import React, { useState } from "react";
import styles from "./SignUp.module.scss";
import validator from "validator";
import {
  Button,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userSignUp } from "../../Redux/Features/userSignUpSlice";

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [clientError, setClientError] = useState({});

  const handleSignUp = () => {
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
    if (validator.isEmpty(formData?.firstName)) {
      isErr = true;
      errors.firstName = "First name is required";
    }
    if (validator.isEmpty(formData?.lastName)) {
      isErr = true;
      errors.lastName = "Last name is required";
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
          name: `${formData?.firstName}${formData?.lastName}`,
          email: formData?.email,
          password: formData?.password,
        },
        onSuccess: () => {
          setFormData({
            email: "",
            firstName: "",
            lastName: "",
            password: "",
          });
        },
        navigate,
      };
      dispatch(userSignUp(data));
    }
  };

  return (
    <div className={styles.sign_in_container}>
      <Typography variant="h6">Merch flare</Typography>
      <div className={styles.form_container}>
        <Typography variant="h5">Get started</Typography>
        <Typography variant="body1">
          Already have an account?{" "}
          <Typography variant="caption" onClick={() => navigate("/signin")}>
            Sign in
          </Typography>
        </Typography>
        <div className={styles.form}>
          <Grid container spacing={2}>
            <Grid item lg={6}>
              <TextField
                label={"First name"}
                value={formData?.firstName}
                onChange={(e) =>
                  setFormData((d) => ({ ...d, firstName: e?.target?.value }))
                }
                variant="outlined"
              />
            </Grid>
            <Grid item lg={6}>
              <TextField
                label={"Last name"}
                value={formData?.lastName}
                onChange={(e) =>
                  setFormData((d) => ({ ...d, lastName: e?.target?.value }))
                }
                variant="outlined"
              />
            </Grid>
          </Grid>
          <TextField
            sx={{ marginTop: "24px" }}
            label={"Email address"}
            variant="outlined"
            value={formData?.email}
            onChange={(e) =>
              setFormData((d) => ({ ...d, email: e?.target?.value }))
            }
          />
          <TextField
            label={"Password"}
            variant="outlined"
            sx={{ marginTop: "24px" }}
            value={formData?.password}
            onChange={(e) =>
              setFormData((d) => {
                return { ...d, password: e?.target?.value };
              })
            }
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="start">
                    <Button className={styles.password_button}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                        role="img"
                        class="MuiBox-root css-1t9pz9x iconify iconify--eva"
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
            onClick={handleSignUp}
          >
            Sign Up
          </Button>
          <Typography variant="caption" className={styles.sign_container}>
            By signing up, I agree to <a>Terms of condition</a> and{" "}
            <a>Privacy Policy</a>.
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
