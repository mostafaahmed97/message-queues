const morgan = require("morgan");
const express = require("express");

const app = express();

app.use(morgan("dev"));
app.get("/", function (req, res, next) {
  return res.send("Service B");
});

app.listen(3001, function () {
  console.log("Service B started");
});
