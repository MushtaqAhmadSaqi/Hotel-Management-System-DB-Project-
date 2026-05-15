const mongoose = require("mongoose");

const guestSchema = new mongoose.Schema(
  {
    guestId: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    fullName: {
      type: String,
      required: true,
      trim: true
    },
    cnic: {
      type: String,
      required: true,
      trim: true
    },
    phone: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      trim: true
    },
    address: {
      type: String,
      trim: true
    },
    nationality: {
      type: String,
      default: "Pakistani"
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      default: "Male"
    },
    registrationDate: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Guest", guestSchema);
