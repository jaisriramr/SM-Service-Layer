var express = require("express");
var fileupload = require("express-fileupload");

var app = express();

require("dotenv").config();

app.use(fileupload());

app.use(express.json({ limit: "50mb" }));

app.use(
  express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 5000 })
);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to SM service layer!!!" });
});

module.exports = app;
