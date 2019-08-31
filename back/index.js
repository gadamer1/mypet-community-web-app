const express = require("express");
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");
const morgan = require("morgan");
const cors = require("cors");
const passport = require("passport");
const helmet = require("helmet");
const passportConfig = require("./passport");
const db = require("./models");
const path = require("path");

const postAPIRouter = require("./routes/post");
const userAPIRouter = require('./routes/user');
const checkAPIRouter = require('./routes/check');
db.sequelize.sync();
passportConfig(passport);

require("dotenv").config();
const app = express();

app.use(morgan("dev"));
app.use("/", express.static(path.join(__dirname, "uploads")));
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: true,
  credentials :true,
}))
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  expressSession({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false
    },
    name: "rmflhjajiweiojlosrgte"
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/post", postAPIRouter);
app.use("/api/user", userAPIRouter);
app.use("/api/check", checkAPIRouter);

app.listen(process.env.PORT, () => {
  console.log(`http://localhost:${process.env.PORT} 에서 실행중입니다`);
});
