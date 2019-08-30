const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const expressSession = require("express-session");
const path = require("path");

const db = require("./models");
require("dotenv").config();

const app = express();
db.sequelize.sync();

app.use(morgan("dev"));
app.use("/", express.static(path.join(__dirname, "uploads")));

app.listen(process.env.PORT, () => {
  console.log(`localhost:${process.env.PORT}에서 실행중입니다`);
});
