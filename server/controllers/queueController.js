const userClinicModel = require("../models/userClinics");

function getQueue(req, res) {
  const currClinicName = req.body.clinicName;
  const uname = req.body.name;
  const ucontact = req.body.contact;
  let queueLength;
  userClinicModel.findOne(
    { nameOfClinic: currClinicName },
    function (err, foundClinic) {
      if (err) {
        console.log(err);
      } else {
        let ans = 0;
        if (foundClinic != null) {
          queueLength = foundClinic.queue.length;
          for (let i = 0; i < queueLength; i++) {
            if (
              foundClinic.queue[i].currUserName === uname &&
              foundClinic.queue[i].currUserContact === ucontact
            ) {
              ans = i;
              break;
            }
            ans = queueLength;
          }
        }
        res.send(`${ans}`);
      }
    }
  );
}

function updateQueue(req, res) {
  const currClinicName = req.body.clinicName;
  const currUser = req.body.user;
  userClinicModel.findOne(
    { nameOfClinic: currClinicName },
    function (err, foundClinic) {
      if (foundClinic == null) {
        const newUser = new userClinicModel({
          nameOfClinic: currClinicName,
          queue: [
            {
              currUserName: currUser.name,
              currUserContact: currUser.contact,
              _id: currUser.contact,
            },
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
            $addToSet: {
              queue: [
                {
                  currUserName: currUser.name,
                  currUserContact: currUser.contact,
                  _id: currUser.contact,
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
}

function deleteAppointment(req, res) {
  const clinicName = req.body.clinicName;
  const uid = req.body.uid;
  const name = req.body.userName;

  console.log("deleting appointments");
  console.log(clinicName + " " + uid + " " + name);

  userClinicModel.findOne(
    { nameOfClinic: clinicName },
    function (err, foundClinic) {
      if (err) {
        console.log("Error finding clinic:", err);
        return res.status(500);
      }

      if (!foundClinic) {
        console.log("Clinic not found");
        return res.status(404);
      }

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
          if (err) {
            console.log("Error updating queue:", err);
          }

          userClinicModel.findOne(
            { nameOfClinic: clinicName },
            function (err, updatedClinic) {
              if (err) {
                console.log("Error finding updated clinic:", err);
              }
              res.send(updatedClinic.queue);
            }
          );
        }
      );
    }
  );
}

function clinicQueue(req, res) {
  const clinicName = req.body.clinicName;
  userClinicModel.find({ nameOfClinic: clinicName }, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      if (result[0] != undefined) res.send(result[0].queue);
      else res.send(null);
    }
  });
}

module.exports = {
  getQueue,
  updateQueue,
  deleteAppointment,
  clinicQueue,
};
