const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema(
  {
    roomId: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    roomNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    roomType: {
      type: String,
      enum: ["Single", "Double", "Deluxe", "Suite", "Family Room"],
      required: true
    },
    floor: {
      type: String,
      trim: true
    },
    bedType: {
      type: String,
      enum: ["Single Bed", "Double Bed", "King Bed", "Twin Bed"],
      required: true
    },
    pricePerNight: {
      type: Number,
      required: true,
      min: 0
    },
    status: {
      type: String,
      enum: ["Available", "Booked", "Occupied", "Under Maintenance"],
      default: "Available"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Room", roomSchema);
