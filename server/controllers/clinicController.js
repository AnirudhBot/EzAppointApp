const clinicModel = require("../models/clinics");

async function registerClinic(req, res) {
  const clinic = req.body;
  const newClinic = new clinicModel(clinic);
  await newClinic.save(function (err, result) {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
    }
  });
  res.json(clinic);
}

function loginClinic(req, res) {
  const clinicEmail = req.body.email;
  const clinicPassword = req.body.password;
  clinicModel.findOne({ email: clinicEmail }, function (err, foundClinic) {
    let message = "";
    if (err) {
      console.log(err);
    } else {
      if (foundClinic) {
        if (foundClinic.password === clinicPassword) {
          message = "Logged in successfully";
          res.send({ message, foundClinic });
        } else {
          message = "Sorry wrong password";
          res.send(message);
        }
      } else {
        message = "No such email registered";
        res.send(message);
      }
    }
  });
}

function fetchClinics(req, res) {
  console.log("I am here");
  clinicModel.find({}, function (err, results) {
    if (err) {
      console.log(err);
    } else {
      res.send(results);
    }
  });
}

module.exports = {
  registerClinic,
  loginClinic,
  fetchClinics,
};
