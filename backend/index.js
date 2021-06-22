require("dotenv").config();
const express = require("express");
const { json } = require("body-parser");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const cors = require("cors");

const app = express();

app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.use(json());
app.use(
  cookieSession({
    secret: "alksjdfhlkasjdhfkj",
    secure: false,
    name: "session",
  })
);

const userRoutes = require("./routes/user-routes");
const solutionRoutes = require("./routes/solution-routes");
const problemRoutes = require("./routes/problem-routes");

app.use("/api/user", userRoutes);
app.use("/api/solutions", solutionRoutes);
app.use("/api/problems", problemRoutes);

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res
    .status(error.code || 500)
    .json({ message: error.message || "An unkown error occurred" });
});

mongoose
  .connect(
    "mongodb+srv://dev1:bb1sJ7OZGppw82aC@streamy-dev.at6ng.mongodb.net/streamydev1?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    }
  )
  .then(() => {
    app.listen(5000, () => {
      console.log("server started");
    });
  })
  .catch((err) => {
    console.log(err);
  });
