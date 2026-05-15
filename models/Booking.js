const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    bookingId: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    guestId: {
      type: String,
      required: true,
      trim: true
    },
    roomId: {
      type: String,
      required: true,
      trim: true
    },
    guestName: {
      type: String,
      required: true
    },
    roomNumber: {
      type: String,
      required: true
    },
    checkInDate: {
      type: Date,
      required: true
    },
    checkOutDate: {
      type: Date,
      required: true
    },
    numberOfDays: {
      type: Number,
      required: true,
      min: 1
    },
    bookingStatus: {
      type: String,
      enum: ["Pending", "Confirmed", "Cancelled", "Completed"],
      default: "Pending"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
