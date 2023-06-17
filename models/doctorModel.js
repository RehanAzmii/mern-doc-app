const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
    },
    firstName: {
      type: String,
      required: [true, "first name is required"],
    },
    lasttName: {
      type: String,
      required: [true, "last name is required"],
    },
    phone: {
      type: String,
      required: [true, "phone no is required"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
    },
    website: {
      type: String,
    },
    address: {
      type: String,
      required: [true, "address is required"],
    },
    specialization: {
      type: String,
      required: [true, "specialization  is required"],
    },
    experiance: {
      type: String,
      required: [true, "experiance  is required"],
    },
    feesPerCunsaltation: {
      type: Number,
      required: [true, "feesPerCunsaltation  is required"],
    },
    status: {
      type: String,
      default: "pending",
    },
    timings: {
      type: Object,
      required: [true, "work timing is required"],
    },
  },
  { timestamps: true }
);
const doctorModal = mongoose.model("doctors", doctorSchema);
module.exports = doctorModal;
