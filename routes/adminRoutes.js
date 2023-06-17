const express = require("express");
const authMiddlewares = require("../middlewares/authMiddlewares");
const {
  getAllDoctorControllers,
  getAllUsersControllers,
} = require("../controllers/adminControllers");

const router = express.Router();

//GET METHOD|| USERS
router.get("/getAllUsers", authMiddlewares, getAllUsersControllers);

//GET METHOD|| DOCTORS
router.get("/getAllDoctors", authMiddlewares, getAllDoctorControllers);

module.exports = router;
