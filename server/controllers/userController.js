const userModel = require("../models/users");

async function registerUser(req, res) {
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
}

function loginUser(req, res) {
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
}

module.exports = {
  registerUser,
  loginUser,
};
