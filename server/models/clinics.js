const mongoose = require("mongoose");

const clinicSchema = new mongoose.Schema({
  nameOfClinic: {
    type: String,
    required: true,
  },
  doctorName: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  contact: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const clinicModel = mongoose.model("registered_clinics", clinicSchema);
module.exports = clinicModel;
