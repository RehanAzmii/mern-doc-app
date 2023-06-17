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

module.exports = { getAllUsersControllers, getAllDoctorControllers };
