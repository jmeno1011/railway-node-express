const express = require("express");
const cors = require("cors");
const app = express();
// ------------------------------------------ //
// dependencies 추가 필요
const helmet = require("helmet");
const logger = require("morgan");
// const compression = require('compression');
// const dotenv = require("dotenv");
// const cookieParser = require("cookie-parser");
// const session = require("express-session");
// const bodyParser = require('body-parser');
// ------------------------------------------ //

const port = process.env.PORT || 8000;
// env setting
// dotenv.config();

// set security HTTP headers
app.use(helmet());
// use morgan logger
app.use(logger("dev"));
// middleware
app.use(cors());

app.get("/", (req, res) => {
  console.log(`${new Date()}:: connect / `);
  res.status(200).send("Get data has successfully hello World!");
});

app.get("/api", (req, res) => {
  try {
    console.log(`${new Date()}:: connect /api `);
    res.status(200).send("here is api");
  } catch (error) {
    console.log("error :: ", error);
    return res.status(500).send("Server error");
  }
});

app.post("/", function (req, res) {
  res.send("Got a POST request");
});

app.put("/user", function (req, res) {
  res.send("Got a PUT request at /user");
});

app.delete("/user", function (req, res) {
  res.send("Got a DELETE request at /user");
});

app.get("/test-api", (req, res) => {
  console.log(`${new Date()}:: connect /test-api `);
  res.json({
    status: 200,
    message: "test-api-message",
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
