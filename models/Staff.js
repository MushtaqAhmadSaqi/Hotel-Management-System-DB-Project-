const mongoose = require("mongoose");

const staffSchema = new mongoose.Schema(
  {
    staffId: {
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
    phone: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      trim: true
    },
    role: {
      type: String,
      enum: ["Manager", "Receptionist", "Cleaner", "Waiter", "Security Guard", "Accountant"],
      required: true
    },
    salary: {
      type: Number,
      required: true,
      min: 0
    },
    joiningDate: {
      type: Date,
      required: true
    },
    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Staff", staffSchema);
