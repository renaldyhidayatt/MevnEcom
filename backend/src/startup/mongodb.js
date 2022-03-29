const mongoose = require("mongoose");
let winston = require("winston");

module.exports = function () {
  mongoose
    .connect("mongodb://127.0.0.1/olx", {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => winston.info("connected to MongoDB"))
    .catch((err) => console.error(`could not connect to MongoDB... ${err}`));
};
