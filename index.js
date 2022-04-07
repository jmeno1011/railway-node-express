const express = require("express");
const cors = require("cors");
const app = express();
// ------------------------------------------ //
// dependencies 추가 필요
const helmet = require("helmet");
const logger = require("morgan");
const jwt = require("jsonwebtoken");
// const compression = require('compression');
// const dotenv = require("dotenv");
// const cookieParser = require("cookie-parser");
const session = require("express-session");
const bodyParser = require("body-parser");
const db = require("./config/db");

// ------------------------------------------ //

const port = process.env.PORT || 8000;
// env setting
// dotenv.config();

// set security HTTP headers
app.use(helmet());
// use morgan logger
app.use(logger("dev"));
// cors
const corsOption = {
  origin:[
    'https://dev.d2lqfplyhcp8gx.amplifyapp.com',
    'http://localhost:3000'
  ],
  credentials: true,
  methods:"PUT, GET, POST, DELETE, OPTIONS",
}
app.use(cors(corsOption));
// app.use(cors());

app.use(
  session({
    key: "logged",
    secret: "secret",
    resave: false,
    saveUninitialized: true,
  //   cookie : {
  //     httpOnly : true,
  //     sameSite : 'none',
  //     maxAge : 5300000,
  //     secure : true,
  // },
  })
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


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

app.get("/bar-chart", (req, res) => {
  const select_barChart = "select * from barchart";
  db.query(select_barChart, (error, result) => {
    if (error) {
      console.log("bar-chart:: error ::", error);
    } else {
      console.log("result ::", JSON.stringify(result));
      res.status(200).send(result);
    }
  });
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

app.post("/login", (req, res) => {
  const { user_id, user_pw } = req.body;
  const select_user = `select user_id, user_pw from person where user_id='${user_id}' and user_pw='${user_pw}'`;
  db.query(select_user, (error, result) => {
    if (error) {
      console.log("login::error::", error);
    } else {
      // req.session.user_id = user_id;
      // req.session.save((error) => {
      //   if (error) {
      //     console.log("session save error :: ", error);
      //   } else {
      //     console.log("save_session::", req.session);
      //     console.log(`login::${new Date()}::result::${result[0]}`);
      //     res.status(200).send(result[0]);
      //   }
      // });
      let accessToken = generateAccessToken(user_id);
      let refreshToken = generateRefreshToken(user_id);
      res.status(200).json({user_id:result[0].user_id, accessToken:accessToken, refreshToken:refreshToken})
    }
  });
});

// app.get("/logged", (req, res) => {
//   let session_user_id = req.session.user_id;
//   console.log("logged::req.session::", req.session);
//   console.log("logged::session_user_id::", session_user_id);
//   res.status(200).send(session_user_id);
// });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
