const appointmentModel = require("../models/appointmentModel");
const doctorModal = require("../models/doctorModel");
const userModel = require("../models/userModels");

const getDoctorInfoControllers = async (req, res) => {
  try {
    const doctor = await doctorModal.findOne({ userId: req.body.userId });
    res.status(200).send({
      success: true,
      message: "doctor data fetch successfully",
      data: doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in get doctor info controller",
      error,
    });
  }
};
// update profile controller

const updateProfileControllers = async (req, res) => {
  try {
    const doctor = await doctorModal.findOneAndUpdate(
      { userId: req.body.userId },
      req.body
    );
    res.status(200).send({
      success: true,
      message: "doctor profile update",
      data: doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in update profile  controller",
      error,
    });
  }
};
// get single doctor by id
const getSingleDoctorController = async (req, res) => {
  try {
    const doctor = await doctorModal.findOne({ _id: req.body.doctorId });
    res.status(200).send({
      success: true,
      message: "single doc info fetch",
      data: doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in get single doctor  controller",
      error,
    });
  }
};

const doctorAppointmentsControllers = async (req, res) => {
  try {
    const doctor = await doctorModal.findOne({
      userId: req.body.userId,
    });
    const appointments = await appointmentModel.find({
      doctorId: doctor._id,
    });
    res.status(200).send({
      success: true,
      message: "doctor appointment fetch successfully",
      data: appointments,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in doctor appointment doctor  controller",
      error,
    });
  }
};

// update status

const updateStatusController = async (req, res) => {
  try {
    const { appointmentsId, status } = req.body;
    const appointments = await appointmentModel.findByIdAndUpdate(
      appointmentsId,
      { status }
    );
    const user = await userModel.findOne({ _id: appointments?.userId });
    user?.notification?.push({
      type: "Status-updated",
      message: `A new appointment has been updated ${status}`,
      onClickPath: "/doctor-appointments",
    });
    await user?.save();
    res.status(200).send({
      success: true,
      message: "updated appointment status",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in update status controller",
      error,
    });
  }
};

module.exports = {
  getDoctorInfoControllers,
  updateProfileControllers,
  getSingleDoctorController,
  doctorAppointmentsControllers,
  updateStatusController,
};
