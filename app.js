const dotenv = require("dotenv");
const express = require("express");
dotenv.config({ path: "./.env" });
const morgan = require("morgan");
const cors = require("cors");

const userRouter = require("./routes/userRoutes");
const authRouter = require("./routes/authRoutes");
const serviceRouter = require("./routes/serviceRouter");
const orderRouter = require("./routes/orderRouter");
const addOnRouter = require("./routes/addOnRoutes");
const driverRouter = require("./routes/driverRoutes");

const app = express();

app.use(cors());
app.set("trust proxy", true);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(morgan("tiny"));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.get("/", (req, res) => {
  res.send("Welcome to the Nephro API");
});

app.use("/api/v1/user", userRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/service", serviceRouter);
app.use("/api/v1/order", orderRouter);
app.use("/api/v1/addOn", addOnRouter);
app.use("/api/v1/driver", driverRouter);

module.exports = app;
