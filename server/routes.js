const express = require("express");
const router = express.Router();
const queueController = require("./controllers/queueController");
const clinicController = require("./controllers/clinicController");
const userController = require("./controllers/userController");

// Queue routes
router.post("/getQueue", queueController.getQueue);
router.post("/updateQueue", queueController.updateQueue);
router.post("/deleteAppointment", queueController.deleteAppointment);
router.post("/clinicQueue", queueController.clinicQueue);

// Clinic routes
router.post("/registerClinic", clinicController.registerClinic);
router.post("/loginClinic", clinicController.loginClinic);
router.get("/fetchClinics", clinicController.fetchClinics);

// User routes
router.post("/registerUser", userController.registerUser);
router.post("/loginUser", userController.loginUser);

module.exports = router;
