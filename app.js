var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
let cors = require("cors");
//全局解析
let bodyParser = require("body-parser");

let jwt = require("jsonwebtoken");
let secret = "chenkang";

var usersRouter = require("./routes/users");
var signsRouter = require("./routes/signs");
var checksRouter = require("./routes/checks");
var newsRouter = require("./routes/news");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/users", usersRouter);
app.use((req, res, next) => {
  let token = req.headers.authorization;
  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      res.send({ errcode: -1, errmsg: "token error" });
    } else {
      next();
    }
  });
});
app.use("/signs", signsRouter);
app.use("/checks", checksRouter);
app.use("/news", newsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
