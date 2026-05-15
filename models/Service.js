const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    serviceId: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    bookingId: {
      type: String,
      required: true,
      trim: true
    },
    guestName: {
      type: String,
      required: true
    },
    serviceName: {
      type: String,
      enum: ["Laundry", "Food Order", "Room Cleaning", "Airport Pickup", "Extra Bed", "Mini Bar"],
      required: true
    },
    servicePrice: {
      type: Number,
      required: true,
      min: 0
    },
    serviceDate: {
      type: Date,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Service", serviceSchema);
