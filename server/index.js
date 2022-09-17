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
  const currClinicName = req.body.clinicName;
  let queueLength;
  userClinicModel.findOne(
    { nameOfClinic: currClinicName },
    function (err, foundClinic) {
      if (err) {
        console.log(err);
      } else {
        if (foundClinic == null) {
          queueLength = 0;
        } else {
          queueLength = foundClinic.queue.length;
        }
        res.send(`${queueLength}`);
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
            { currUserName: currUser.name, currUserContact: currUser.contact },
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
            $set: {
              queue: [
                ...foundClinic.queue,
                {
                  currUserName: currUser.name,
                  currUserContact: currUser.contact,
                },
              ],
            },
          },
          function (err) {
            console.log(err);
          }
        );
      }
    }
  );
});

// post request for getting tokens

// app.post("/sendToken", (req, res) => {
//   const currClinicName = req.body.clinicName;
//   tokenModel.findOne(
//     {clinicName : currClinicName}, function(err, foundToken){
//       if(err){
//         console.log(err);
//       } else {
//         res.send(foundToken.tokenNumber);
//       }
//     }
//   )
// });

// post request for updating token

// app.post("/updateToken", (req, res) => {
//   const currClinicName = req.body.clinicName;
//   tokenModel.findOne(
//     {clinicName: currClinicName}, function(err, foundToken){
//       if(err){
//         console.log(err);
//       } else {
//         tokenModel.updateOne(
//           {clinicName: currClinicName},
//           {$inc: {tokenNumber: 1}},
//           function(err){
//             console.log(err);
//           }
//         )
//       }
//     }
//   )
// })

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

// Increasing the queue - adding the user to the queue
// Also checking if the clinic already exists in the database or not - if not then creating a new queue of clinic

// app.post("/bookAppointment", (req, res) => {
//   const currUser = req.body.user;
//   const currClinic = req.body.clinic;
//   userClinicModel.findOne(
//     { clinicName: currClinic.name },
//     function (err, foundUserClinic) {
//       if (err) {
//         console.log(err);
//       } else {
//         if (foundUserClinic) {

//             console.log(foundUserClinic.listOfUsers);
//             userClinicModel.updateOne(
//               {clinicName: foundUserClinic.clinicName},
//               {$set: { listOfUsers: [...foundUserClinic.listOfUsers, {
//                 currUserName: currUser.name,
//                 currUserContact: currUser.contact
//               }]}}, function(err){
//                 console.log(err)
//               });

//         } else {
//           const userClinic = new userClinicModel({
//             clinicName: currClinic.name,
//             listOfUsers: [
//               {
//                 currUserName: currUser.name,
//                 currUserContact: currUser.contact,
//               },
//             ],
//           });
//           userClinic.save(function (err, result) {
//             if (err) {
//               console.log(err);
//             } else {
//               console.log(result);
//             }
//           });
//         }
//       }
//     }
//   );
// });

//Decreasing the queue - deleting the user whose appointment is over

app.post("/deleteAppointment", (req, res) => {
  const clinicName = req.body.clinicName;
  const userName = req.body.userName;
  userClinicModel.updateOne({
    nameOfClinic: clinicName
  }, {
    $pull: {
      currUserName: userName 
    },
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


// app.post("/fetchQueue", (req, res) => {
//   const currClinic = req.body.clinic;
//   userClinicModel.findOne(
//     {clinicName: currClinic.name},
//     function(err, foundUserClinic){
//       if(err){
//         console.log(err)
//       } else {
//         res.send(foundUserClinic.listOfUsers);
//       }
//     }
//   )
// });

// Listening to Server

app.listen(PORT, () => {
  console.log("server running");
});
