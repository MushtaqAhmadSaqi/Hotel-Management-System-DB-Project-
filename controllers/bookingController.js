const Booking = require("../models/Booking");
const Room = require("../models/Room");
const createCrudController = require("./crudController");

const baseController = createCrudController(Booking, "bookingId");

exports.getAll = baseController.getAll;
exports.getOne = baseController.getOne;

exports.create = async (req, res) => {
  try {
    const booking = await Booking.create(req.body);

    if (booking.bookingStatus === "Confirmed") {
      await Room.findOneAndUpdate(
        { roomId: booking.roomId },
        { status: "Booked" },
        { new: true }
      );
    }

    res.status(201).json(booking);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        message: "Duplicate booking ID found",
        field: error.keyValue
      });
    }

    res.status(400).json({ message: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const booking = await Booking.findOneAndUpdate(
      { bookingId: req.params.id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (booking.bookingStatus === "Confirmed") {
      await Room.findOneAndUpdate(
        { roomId: booking.roomId },
        { status: "Booked" },
        { new: true }
      );
    }

    if (booking.bookingStatus === "Completed" || booking.bookingStatus === "Cancelled") {
      await Room.findOneAndUpdate(
        { roomId: booking.roomId },
        { status: "Available" },
        { new: true }
      );
    }

    res.status(200).json(booking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.remove = baseController.remove;
