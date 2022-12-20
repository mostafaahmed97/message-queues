const morgan = require("morgan");
const express = require("express");

const app = express();

app.use(morgan("dev"));
app.get("/", function (req, res, next) {
  return res.send("Service C");
});

app.listen(3002, function () {
  console.log("Service C started");
});
