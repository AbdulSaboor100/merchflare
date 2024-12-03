import { red } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

// A custom theme for this app
const theme = createTheme({
  // cssVariables: true,

  typography: {
    fontFamily: `'Public Sans', sans-serif`,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          // Custom styles for all buttons
          fontWeight: 700,
          lineHeight: 1.71429,
          fontSize: "15px",
          color: "rgb(255, 255, 255)", // Text color
          backgroundColor: "rgb(33, 43, 54)", // Default background color
          textTransform: "capitalize",
          borderRadius: "8px",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          // Root-level styles for the TextField
          // marginBottom: "16px", // Adds spacing between fields
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          // Input box styles
          // fontWeight: 500,
          // fontSize: "14px",
          // lineHeight: 1.5,
          // color: "rgb(33, 33, 33)", // Text color
          // backgroundColor: "rgba(255, 255, 255, 0.9)", // Background color
          // padding: "8px 12px",
        },
        input: {
          // Text inside the input field
          // "&::placeholder": {
          //   color: "rgba(0, 0, 0, 0.6)", // Placeholder text color
          //   fontStyle: "italic",
          // },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          lineHeight: "1.4375em",
          fontSize: "1rem",
          fontWeight: 400,
          color: "rgb(145, 158, 171)",
          // Label styles
          // fontWeight: 700,
          // fontSize: "12px",
          // color: "rgb(117, 117, 117)", // Label text color
          "&.Mui-focused": {
            color: "rgb(33,43,54)",
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          color: "rgb(33,43,54)",
          borderWidth: "1px", // This won't apply directly; see notchedOutline
          borderRadius: "8px", // Correctly applies to the root
          // "&:hover .MuiOutlinedInput-notchedOutline": {
          //   borderColor: "blue", // Border color on hover
          // },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            // borderColor: "darkblue", // Border color when focused
            borderWidth: "1px",
          },
        },
        notchedOutline: {
          borderWidth: "1px", // Default border width
          borderColor: "rgba(145, 158, 171, 0.32)", // Default border color
        },
      },
    },
  },
  palette: {
    primary: {
      main: "rgb(33, 43, 54)",
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: red?.A400,
    },
  },
});

export default theme;
