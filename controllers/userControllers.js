const bcrypt = require("bcryptjs");
const userModel = require("../models/userModels");
const jwt = require("jsonwebtoken");
const doctorModal = require("../models/doctorModel");
const appointmentModel = require("../models/appointmentModel");
const moment = require("moment");

// register controller
const registerController = async (req, res) => {
  try {
    //check user
    const exisitingUser = await userModel.findOne({ email: req.body.email });
    // existing user
    if (exisitingUser) {
      return res.status(200).send({
        success: false,
        message: "User Already exist",
      });
    }

    const password = req.body.password;
    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;
    // create new user
    const newUser = new userModel(req.body);
    await newUser.save();
    res.status(201).send({
      success: true,
      message: "Register Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in register controller",
      error,
    });
  }
};
// login controller
const loginController = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User Not Found",
      });
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(200).send({
        success: false,
        message: "Invalid email or Password",
      });
    }
    // Generate token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.status(200).send({
      message: "login successfully",
      success: true,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in while login ",
      error,
    });
  }
};

//auth controller
const authController = async (req, res) => {
  try {
    const user = await userModel.findById({ _id: req.body.userId });
    user.password = undefined;
    if (!user) {
      return res.status(200).send({
        message: "user not found",
        success: false,
      });
    } else {
      res.status(200).send({
        success: true,
        data: user,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "auth error",
      success: false,
      error,
    });
  }
};

// apply doctor controller
const applyDoctorController = async (req, res) => {
  try {
    const newDoctor = await doctorModal({ ...req.body, status: "pending" });
    // save db
    await newDoctor.save();
    // send notification
    const adminUser = await userModel.findOne({ isAdmin: true });
    const notification = adminUser?.notification;
    notification.push({
      type: "apply-doctor-request",
      message: `${newDoctor.firstName} ${newDoctor.lastName} Has Applied For A Doctor Account`,
      data: {
        doctorId: newDoctor._id,
        name: newDoctor.firstName + " " + newDoctor.lastName,
        onClickPath: "/admin/doctors",
      },
    });
    await userModel.findByIdAndUpdate(adminUser._id, { notification });
    res.status(201).send({
      success: true,
      message: "Doctor Account Applied SUccessfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in apply doctor controller",
      error,
    });
  }
};
// get all notification controller
const getAllNotificationtorController = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.body.userId });
    const seennotification = user?.seennotification;
    const notification = user?.notification;
    seennotification.push(...notification);
    user.notification = [];
    user.seennotification = notification;
    const updatedUser = await user.save();
    res.status(200).send({
      success: true,
      message: "all notification marked as read",
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in get notification controller",
      error,
    });
  }
};

// delete all notification controller

const getDeleteNotificationtorController = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.body.userId });
    user.notification = [];
    user.seennotification = [];
    const updatedUser = await user.save();
    updatedUser.password = undefined;
    res.status(200).send({
      success: true,
      message: "notification deleted",
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in delete notification",
      error,
    });
  }
};

// GET ALL DOCTORS

const getAllDoctorsControllers = async (req, res) => {
  try {
    const doctors = await doctorModal.find({ status: "approved" });
    res.status(200).send({
      success: true,
      message: "All Doctors List",
      data: doctors,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in get all doctors",
      error,
    });
  }
};

// book appointment controller

const bookAppointmentController = async (req, res) => {
  try {
    req.body.date = moment(req.body.date, "DD-MM-YYYY").toISOString();
    req.body.time = moment(req.body.time, "HH:mm").toISOString();
    req.body.status = "pending";
    const newAppointment = new appointmentModel(req.body);
    await newAppointment.save();
    const user = await userModel.findOne({ _id: req.body.doctorInfo.userId });
    user.notification.push({
      type: "New-appointment-request",
      message: `A new appointment request from ${req.body.userInfo.name}`,
      onClickPath: "/user/appointment",
    });
    await user.save();
    res.status(200).send({
      success: true,
      message: "Appointment book successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in book appointment controller",
      error,
    });
  }
};

// BOOKING AVAILABILITY
const bookAvailabilityController = async (req, res) => {
  try {
    const date = moment(req.body.date, "DD-MM-YY").toISOString();
    const fromTime = moment(req.body.time, "HH:mm")
      .subtract(1, "hour")
      .toISOString();
    const toTime = moment(req.body.time, "HH:mm").add(1, "hour").toISOString();
    const doctorId = req.body.doctorId;
    const appointment = await appointmentModel.find({
      doctorId,
      date,
      time: {
        $gte: fromTime,
        $lte: toTime,
      },
    });
    if (appointment > 0) {
      return res.status(200).send({
        message: "Appointment is not available at this time",
        success: true,
      });
    } else {
      return res.status(200).send({
        message: "Appointment Available",
        success: true,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in book booking availibilty controller",
      error,
    });
  }
};
// user apointment list

const userAppintmentsController = async (req, res) => {
  try {
    const appointments = await appointmentModel.find({
      // userId: req.body.userId,
    });
    return res.status(200).send({
      success: true,
      message: "appointmnt list fetch successfully",
      data: appointments,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in user appointment list controller",
      error,
    });
  }
};
module.exports = {
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
};
