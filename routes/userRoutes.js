const express = require("express");
const {
  loginController,
  registerController,
  authController,
  applyDoctorController,
  getAllNotificationtorController,
  getDeleteNotificationtorController,
  getAllDoctorsControllers,
  bookAppointmentController,
  bookAvailabilityController,
  userAppintmentsController,
} = require("../controllers/userControllers");
const authMiddlewares = require("../middlewares/authMiddlewares");

// router object
const router = express.Router();

//routes
// LOGIN||POST
router.post("/login", loginController);

// REGISTER || POST
router.post("/register", registerController);

//Auth || post
router.post("/getUserData", authMiddlewares, authController);

//Apply Doctor || post
router.post("/apply-doctor", authMiddlewares, applyDoctorController);

//Notification Doctor || post
router.post(
  "/get-all-notification",
  authMiddlewares,
  getAllNotificationtorController
);

//Notification Doctor || post
router.post(
  "/delete-all-notification",
  authMiddlewares,
  getDeleteNotificationtorController
);

// GET ALL DOC
router.get("/getAllDoctors", authMiddlewares, getAllDoctorsControllers);

//BOOK APPOINTMENT
router.post("/book-appointment", authMiddlewares, bookAppointmentController);

//BOOK AVALABILITY
router.post("/book-availability", authMiddlewares, bookAvailabilityController);

//APPOINTMENT LIST
router.get("/user-appointments", authMiddlewares, userAppintmentsController);

module.exports = router;
