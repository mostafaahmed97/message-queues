const morgan = require("morgan");
const express = require("express");

const app = express();

app.use(morgan("dev"));
app.get("/", function (req, res, next) {
  return res.send("Service A");
});

app.listen(3000, function () {
  console.log("Service A started");
});
