const express = require("express");
const authMiddlewares = require("../middlewares/authMiddlewares");
const {
  getDoctorInfoControllers,
  updateProfileControllers,
  getSingleDoctorController,
} = require("../controllers/doctorController");

const router = express.Router();

// Post SINGLE DOC INFO
router.post("/getDoctorInfo", authMiddlewares, getDoctorInfoControllers);

// Post SINGLE DOC INFO
router.post("/updateProfile", authMiddlewares, updateProfileControllers);

// POST GET SINGLE DOC INFO
router.post("/getSingleDoctor", authMiddlewares, getSingleDoctorController);

module.exports = router;
