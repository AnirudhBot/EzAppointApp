const mongoose = require("mongoose");

const userClinicSchema = new mongoose.Schema({
  nameOfClinic: {
    type: String,
  },
  queue: [
    {
      currUserName: {
        type: String,
      },
      currUserContact: {
        type: String,
      },
    },
  ],
});

const userClinicModel = mongoose.model("users_of_clinics", userClinicSchema);
module.exports = userClinicModel;
