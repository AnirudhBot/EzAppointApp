const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("successful connection");
  })
  .catch((err) => {
    console.log("failed connecting to atlas");
  });

module.exports = mongoose;
