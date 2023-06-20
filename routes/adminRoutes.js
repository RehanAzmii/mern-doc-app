const express = require("express");
const authMiddlewares = require("../middlewares/authMiddlewares");
const {
  getAllDoctorControllers,
  getAllUsersControllers,
  changeAccountStatusController,
} = require("../controllers/adminControllers");

const router = express.Router();

//GET METHOD|| USERS
router.get("/getAllUsers", authMiddlewares, getAllUsersControllers);

//GET METHOD|| DOCTORS
router.get("/getAllDoctors", authMiddlewares, getAllDoctorControllers);

//POST ACOUNT STATUS
router.post(
  "/changeAccountStatus",
  authMiddlewares,
  changeAccountStatusController
);

module.exports = router;
