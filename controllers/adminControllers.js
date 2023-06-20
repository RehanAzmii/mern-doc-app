const doctorModal = require("../models/doctorModel");
const userModel = require("../models/userModels");

const getAllUsersControllers = async (req, res) => {
  try {
    const users = await userModel.find({});
    res.status(200).send({
      success: true,
      message: "get all users",
      data: users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in get all user",
      error,
    });
  }
};
const getAllDoctorControllers = async (req, res) => {
  try {
    const doctors = await doctorModal.find({});
    res.status(200).send({
      success: true,
      message: "get all doctors",
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

// change account status controller
const changeAccountStatusController = async (req, res) => {
  try {
    const { doctorId, status } = req.body;
    const doctor = await doctorModal.findByIdAndUpdate(doctorId, { status });
    const user = await userModel.findOne({ _id: doctor?.userId });
    const notification = user?.notification;
    notification.push({
      type: "doctor-account-request-update",
      message: `your doctor Account requset has ${status}`,
      onClickPath: "/notification",
    });
    user.isDoctor = status === "approved" ? true : false;
    await user.save();
    res.status(201).send({
      success: true,
      message: "Account Status update",
      data: doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in change acount status controller",
      error,
    });
  }
};
module.exports = {
  getAllUsersControllers,
  getAllDoctorControllers,
  changeAccountStatusController,
};
