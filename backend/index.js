const express = require("express");
const passport = require("passport");
const expressSession = require("express-session");
const connectDB = require("./config/db");
const cors = require("cors");
const app = express();

require("dotenv").config();
require("./middleware/passport");

const PORT = process.env.PORT || 8000;
const JWT_SECRET = process.env.JWT_SECRET;
const MONGO_URI = process.env.MONGO_URI;
// const CORS_REGEX = process.env.CORS_REGEX
//   ? new RegExp(process.env.CORS_REGEX)
//   : "*";
const corsOptions = {
  //   origin: CORS_REGEX || "*",
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

if (!JWT_SECRET) {
  throw "JWT_SECRET is not set. Please configure that first";
}

if (!MONGO_URI) {
  throw "MONGO_URI is not set. Please configure that first";
}

connectDB();

app.use(express.json({ extented: false, limit: "10mb" }));

app.use(
  expressSession({
    resave: false,
    saveUninitialized: true,
    secret: JWT_SECRET,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.send("Api working");
});

app.use("/api/auth", require("./api/auth/index"));
app.use("/api/merch", require("./api/merch/index"));
app.use("/api/user", require("./api/user/index"));

app.listen(PORT, () => {
  console.log("Server is running");
});
