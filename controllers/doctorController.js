const doctorModal = require("../models/doctorModel");

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

module.exports = {
  getDoctorInfoControllers,
  updateProfileControllers,
  getSingleDoctorController,
};
