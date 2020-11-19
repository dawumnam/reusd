const mongoose = require("mongoose");
const express = require("express");
const app = express();
const router = require("./Router/Router");
const bodyparser = require("body-parser");

const cors = require("cors");

mongoose.connect("mongodb://localhost/reusd", {
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});



app.use(
  cors({
    credentials: true,
    exposedHeaders: ["set-cookie"],
    origin: "http://localhost:3000",
  })
);

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

var publicDir = require("path").join(__dirname, "/");
app.use(express.static(publicDir));

app.use(router);
app.listen(5000);
