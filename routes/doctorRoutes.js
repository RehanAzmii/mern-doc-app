const express = require("express");
const authMiddlewares = require("../middlewares/authMiddlewares");
const {
  getDoctorInfoControllers,
  updateProfileControllers,
  getSingleDoctorController,
  doctorAppointmentsControllers,
  updateStatusController,
} = require("../controllers/doctorController");

const router = express.Router();

// Post SINGLE DOC INFO
router.post("/getDoctorInfo", authMiddlewares, getDoctorInfoControllers);

// Post SINGLE DOC INFO
router.post("/updateProfile", authMiddlewares, updateProfileControllers);

// POST GET SINGLE DOC INFO
router.post("/getSingleDoctor", authMiddlewares, getSingleDoctorController);

// POST GET SINGLE DOC INFO
router.get(
  "/doctor-appointments",
  authMiddlewares,
  doctorAppointmentsControllers
);

//POST UPDATE  STATUS
router.post("/update-status", authMiddlewares, updateStatusController);

module.exports = router;
