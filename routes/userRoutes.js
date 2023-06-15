const express = require("express");
const {
  loginController,
  registerController,
  authController,
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
module.exports = router;
