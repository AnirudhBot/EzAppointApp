require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const clinicModel = require("./models/clinics");
const userModel = require("./models/users");
const userClinicModel = require("./models/userClinics");
const tokenModel = require("./models/token");
const dotenv = require("dotenv");
const axios = require("axios");
const app = express();
const PORT = 3001 || process.env.PORT;

const cors = require("cors");
app.use(cors());
app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://cluster-1:cluster-1-practice@cluster-1.lbmpr.mongodb.net/Clinics?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("successful connection");
  })
  .catch((err) => {
    console.log("failed connecting to atlas");
  });

// post request for getting queue
app.post("/getQueue", (req, res) => {
  const currClinicName =req.body.clinicName;
  const uname=req.body.name;
  const ucontact=req.body.contact;
  let queueLength;
  userClinicModel.findOne(
    { nameOfClinic: currClinicName },
    function (err, foundClinic) {
      if (err) {
        console.log(err);
      } else {
        let ans=0;
        if(foundClinic != null) {
          queueLength = foundClinic.queue.length;
          for(let i=0; i<queueLength; i++) {
            if(foundClinic.queue[i].currUserName===uname && foundClinic.queue[i].currUserContact===ucontact) {
              ans=i;
              break;
            }
            ans=queueLength;
          }
        }
        res.send(`${ans}`);
      }
    }
  );
});

// post request for updating queue
app.post("/updateQueue", (req, res) => {
  const currClinicName = req.body.clinicName;
  const currUser = req.body.user;
  userClinicModel.findOne(
    { nameOfClinic: currClinicName },
    function (err, foundClinic) {
      if (foundClinic == null) {
        const newUser = new userClinicModel({
          nameOfClinic: currClinicName,
          queue: [
            { currUserName: currUser.name, currUserContact: currUser.contact, _id: currUser.contact, },
          ],
        });
        newUser.save(function (err, result) {
          if (err) {
            console.log(err);
          } else {
            console.log(result);
          }
        });
      } else {
        userClinicModel.updateOne(
          { nameOfClinic: currClinicName },
          {
            $addToSet : {
              queue : [{ 
                currUserName: currUser.name,
                currUserContact: currUser.contact,
                _id: currUser.contact 
              }]
            }
          },
          function (err) {
            console.log(err);
          }
        );
      }
    }
  );
});

// Register as a Clinic
app.post("/registerClinic", async (req, res) => {
  const clinic = req.body;
  const newClinic = new clinicModel(clinic);
  console.log(newClinic);
  await newClinic.save(function (err, result) {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
    }
  });
  res.json(clinic);
});

// Login as a Clinic
app.post("/loginClinic", (req, res) => {
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
});

// Register as a User
app.post("/registerUser", async (req, res) => {
  const user = req.body;
  const newUser = new userModel(user);
  console.log(newUser);
  await newUser.save(function (err, result) {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
    }
  });
  res.json(user);
});

// Login as a User
app.post("/loginUser", (req, res) => {
  const userEmail = req.body.email;
  const userPassword = req.body.password;
  userModel.findOne({ email: userEmail }, function (err, foundUser) {
    let message = "";
    if (err) {
      console.log(err);
    } else {
      if (foundUser) {
        if (foundUser.password === userPassword) {
          message = "Logged in sucessfully";
          res.send({ message, foundUser });
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
});

//Decreasing the queue - deleting the user whose appointment is over
app.post("/deleteAppointment", (req, res) => {
  const clinicName = req.body.clinicName;
  const uid = req.body.uid.toString();
  const name = req.body.userName;
  console.log("deleting appointment");
  console.log(clinicName + " " + uid + " " + name);

  userClinicModel.findOne({ nameOfClinic: clinicName }, function () {
    userClinicModel.updateOne(
      { nameOfClinic: clinicName },
      {
        $pull: {
          queue: {
            currUserName: name,
            _id: uid,
          },
        },
      },
      function (err) {
        console.log(err);
      }
    );
  });
});

// fetching the clincs
app.get("/fetchClinics", (req, res) => {
  clinicModel.find({}, function (err, results) {
    if (err) {
      console.log(err);
    } else {
      res.send(results);
    }
  });
});

// fetch clinic queue
app.post("/clinicQueue", (req, res) => {
  const clinicName = req.body.clinicName;
  userClinicModel.find({ nameOfClinic: clinicName }, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      res.send(result[0].queue);
    }
  });
});


// Listening to Server
app.listen(PORT, () => {
  console.log("server running");
});
