import React, { useState } from "react";
import styles from "./HomeSideBar.module.scss";
import {
  TextField,
  Typography,
  Box,
  Input,
  InputAdornment,
  MenuItem,
  Button,
} from "@mui/material";
import {
  DatePicker,
  LocalizationProvider,
  StaticDatePicker,
} from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

// function valuetext(value) {
//   return `${value}°C`;
// }
const currencies = [
  {
    value: "USD",
    label: "$",
  },
  {
    value: "EUR",
    label: "€",
  },
  {
    value: "BTC",
    label: "฿",
  },
  {
    value: "JPY",
    label: "¥",
  },
];
const HomeSideBar = () => {
  const [isDatePickerActive, setIsDatePickerActive] = useState(false);
  // const [value, setValue] = useState([20, 37]);

  // const handleChange = (event, newValue) => {
  //   setValue(newValue);
  // };

  return (
    <div className={styles.home_side_bar_container}>
      <div className={styles.selection_container}>
        <Box className={styles.select_box}>
          <TextField
            label="Title"
            defaultValue=" "
            size="small"
            sx={{ width: "100%" }}
          />
        </Box>
        <Box className={styles.select_box}>
          <TextField
            label="Marketplace"
            defaultValue=" "
            size="small"
            sx={{ width: "100%" }}
            select
          >
            {currencies.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Box>
        <Box className={styles.select_box}>
          <TextField
            label="Sort By"
            defaultValue=" "
            size="small"
            sx={{ width: "100%" }}
            select
          >
            {currencies.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Box>
      </div>
      <div className={styles.filter_container}>
        <Box className={styles.range_filter}>
          <Typography variant="caption">Price Range</Typography>
          <Box className={styles.input_container}>
            <TextField
              label="Min"
              defaultValue="0"
              size="small"
              sx={{ width: "100%" }}
            />
            <TextField
              label="Max"
              defaultValue="0"
              size="small"
              sx={{ width: "100%", marginLeft: "16px" }}
            />
          </Box>
        </Box>
        <Box className={styles.range_filter}>
          <Typography variant="caption">Average 30-Day BSR Range</Typography>
          <Box className={styles.input_container}>
            <TextField
              label="Min"
              defaultValue="0"
              size="small"
              sx={{ width: "100%" }}
            />
            <TextField
              label="Max"
              defaultValue="0"
              size="small"
              sx={{ width: "100%", marginLeft: "16px" }}
            />
          </Box>
        </Box>
        <Box className={styles.range_filter}>
          <Typography variant="caption">Reviews Range</Typography>
          <Box className={styles.input_container}>
            <TextField
              label="Min"
              defaultValue="0"
              size="small"
              sx={{ width: "100%" }}
            />
            <TextField
              label="Max"
              defaultValue="0"
              size="small"
              sx={{ width: "100%", marginLeft: "16px" }}
            />
          </Box>
        </Box>
        <Box className={styles.range_filter}>
          <Typography variant="caption">Sales Range</Typography>
          <Box className={styles.input_container}>
            <TextField
              label="Min"
              defaultValue="0"
              size="small"
              sx={{ width: "100%" }}
            />
            <TextField
              label="Max"
              defaultValue="0"
              size="small"
              sx={{ width: "100%", marginLeft: "16px" }}
            />
          </Box>
        </Box>
        <Box className={styles.range_filter}>
          <Typography variant="caption">Sales Rank Range</Typography>
          <Box className={styles.input_container}>
            <TextField
              label="Min"
              defaultValue="0"
              size="small"
              sx={{ width: "100%" }}
            />
            <TextField
              label="Max"
              defaultValue="0"
              size="small"
              sx={{ width: "100%", marginLeft: "16px" }}
            />
          </Box>
        </Box>
        <Box className={styles.range_filter}>
          <Typography variant="caption">Published After</Typography>

          <Box className={styles.date_container}>
            {isDatePickerActive && (
              <Box className={styles.static_date}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer
                    sx={{ padding: "0" }}
                    components={["StaticDatePicker"]}
                  >
                    <StaticDatePicker defaultValue={dayjs("2022-04-17")} />
                  </DemoContainer>
                </LocalizationProvider>
              </Box>
            )}
            <TextField
              id="input-with-icon-textfield"
              size="small"
              // defaultValue={"All Time"}
              value={"All Time"}
              sx={{ width: "100%" }}
              onClick={() => setIsDatePickerActive(!isDatePickerActive)}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="lucide lucide-calendar"
                      >
                        <path d="M8 2v4"></path>
                        <path d="M16 2v4"></path>
                        <rect width="18" height="18" x="3" y="4" rx="2"></rect>
                        <path d="M3 10h18"></path>
                      </svg>
                    </InputAdornment>
                  ),
                  // endAdornment: (
                  //   <InputAdornment position="start">
                  //     {/* <AccountCircle /> */}@
                  //   </InputAdornment>
                  // ),
                },
              }}
            />
          </Box>
        </Box>
        <Button size="large" sx={{ width: "100%", marginTop: "16px" }}>
          Search Products
        </Button>
      </div>
    </div>
  );
};

export default HomeSideBar;
