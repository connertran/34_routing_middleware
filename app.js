const express = require("express");
const app = express();
const itemsRoute = require("./routes/items");
const ExpressError = require("./myError");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/items", itemsRoute);

app.use(function (req, res, next) {
  const err = new ExpressError("No URL Found", 404);

  return next(err);
});

app.use(function (err, req, res, next) {
  res.status(err.status || 500);

  return res.json({
    // error: err,
    message: err.message,
    status: err.status,
  });
});

module.exports = app;
