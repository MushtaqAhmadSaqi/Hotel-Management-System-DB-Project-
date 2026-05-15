const mongoose = require("mongoose");
const dotenv = require("dotenv");

const Admin = require("../models/Admin");
const Guest = require("../models/Guest");
const Room = require("../models/Room");
const Booking = require("../models/Booking");
const Payment = require("../models/Payment");
const Service = require("../models/Service");
const Staff = require("../models/Staff");

dotenv.config();

const firstNames = ["Ali", "Sara", "Ahmed", "Ayesha", "Usman", "Fatima", "Hassan", "Zainab", "Bilal", "Mariam"];
const lastNames = ["Khan", "Ahmed", "Butt", "Malik", "Raza", "Sheikh", "Qureshi", "Rana", "Siddiqui", "Javed"];
const cities = ["Lahore", "Karachi", "Islamabad", "Multan", "Faisalabad", "Peshawar", "Quetta", "Sialkot"];
const roomTypes = ["Single", "Double", "Deluxe", "Suite", "Family Room"];
const bedTypes = ["Single Bed", "Double Bed", "King Bed", "Twin Bed"];
const serviceNames = ["Laundry", "Food Order", "Room Cleaning", "Airport Pickup", "Extra Bed", "Mini Bar"];
const roles = ["Manager", "Receptionist", "Cleaner", "Waiter", "Security Guard", "Accountant"];

function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function padded(prefix, num, size = 4) {
  return `${prefix}${String(num).padStart(size, "0")}`;
}

function randomName() {
  return `${randomItem(firstNames)} ${randomItem(lastNames)}`;
}

function randomDate(startYear = 2025, endYear = 2026) {
  const start = new Date(`${startYear}-01-01`).getTime();
  const end = new Date(`${endYear}-12-31`).getTime();
  return new Date(start + Math.random() * (end - start));
}

async function seed() {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI missing. Create .env file first.");
    }

    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected for seeding");

    await Promise.all([
      Admin.deleteMany({}),
      Guest.deleteMany({}),
      Room.deleteMany({}),
      Booking.deleteMany({}),
      Payment.deleteMany({}),
      Service.deleteMany({}),
      Staff.deleteMany({})
    ]);

    await Admin.create({
      username: "admin",
      password: "admin123",
      fullName: "Hotel Admin"
    });

    const guests = [];
    for (let i = 1; i <= 300; i++) {
      guests.push({
        guestId: padded("G", i),
        fullName: randomName(),
        cnic: `35202-${String(1000000 + i)}-${i % 9}`,
        phone: `03${Math.floor(100000000 + Math.random() * 899999999)}`,
        email: `guest${i}@example.com`,
        address: randomItem(cities),
        nationality: "Pakistani",
        gender: i % 2 === 0 ? "Female" : "Male",
        registrationDate: randomDate()
      });
    }

    const rooms = [];
    for (let i = 1; i <= 100; i++) {
      const type = randomItem(roomTypes);
      const priceMap = {
        "Single": 5000,
        "Double": 7000,
        "Deluxe": 10000,
        "Suite": 15000,
        "Family Room": 12000
      };

      rooms.push({
        roomId: padded("R", i),
        roomNumber: String(100 + i),
        roomType: type,
        floor: `${Math.ceil(i / 20)} Floor`,
        bedType: randomItem(bedTypes),
        pricePerNight: priceMap[type],
        status: "Available"
      });
    }

    await Guest.insertMany(guests);
    await Room.insertMany(rooms);

    const bookings = [];
    for (let i = 1; i <= 300; i++) {
      const guest = guests[(i - 1) % guests.length];
      const room = rooms[(i - 1) % rooms.length];
      const checkInDate = randomDate(2026, 2026);
      const numberOfDays = 1 + Math.floor(Math.random() * 5);
      const checkOutDate = new Date(checkInDate);
      checkOutDate.setDate(checkOutDate.getDate() + numberOfDays);

      bookings.push({
        bookingId: padded("B", i),
        guestId: guest.guestId,
        roomId: room.roomId,
        guestName: guest.fullName,
        roomNumber: room.roomNumber,
        checkInDate,
        checkOutDate,
        numberOfDays,
        bookingStatus: randomItem(["Pending", "Confirmed", "Completed", "Cancelled"])
      });
    }

    await Booking.insertMany(bookings);

    const payments = [];
    for (let i = 1; i <= 200; i++) {
      const booking = bookings[(i - 1) % bookings.length];
      const room = rooms.find(r => r.roomId === booking.roomId);
      const roomCharges = room.pricePerNight * booking.numberOfDays;
      const serviceCharges = Math.floor(Math.random() * 5000);
      const discount = Math.floor(Math.random() * 1000);
      const totalAmount = roomCharges + serviceCharges - discount;
      const paidAmount = Math.floor(totalAmount * (0.4 + Math.random() * 0.6));
      const remainingAmount = totalAmount - paidAmount;

      let paymentStatus = "Partial";
      if (remainingAmount <= 0) paymentStatus = "Paid";
      if (paidAmount === 0) paymentStatus = "Pending";

      payments.push({
        paymentId: padded("P", i),
        bookingId: booking.bookingId,
        guestName: booking.guestName,
        roomNumber: booking.roomNumber,
        roomCharges,
        serviceCharges,
        discount,
        totalAmount,
        paidAmount,
        remainingAmount,
        paymentMethod: randomItem(["Cash", "Card", "Bank Transfer", "Online Payment"]),
        paymentStatus
      });
    }

    await Payment.insertMany(payments);

    const services = [];
    for (let i = 1; i <= 50; i++) {
      const booking = bookings[(i - 1) % bookings.length];

      services.push({
        serviceId: padded("S", i),
        bookingId: booking.bookingId,
        guestName: booking.guestName,
        serviceName: randomItem(serviceNames),
        servicePrice: 500 + Math.floor(Math.random() * 3000),
        serviceDate: randomDate(2026, 2026)
      });
    }

    await Service.insertMany(services);

    const staff = [];
    for (let i = 1; i <= 50; i++) {
      staff.push({
        staffId: padded("ST", i),
        fullName: randomName(),
        phone: `03${Math.floor(100000000 + Math.random() * 899999999)}`,
        email: `staff${i}@hotel.com`,
        role: randomItem(roles),
        salary: 35000 + Math.floor(Math.random() * 100000),
        joiningDate: randomDate(2023, 2026),
        status: i % 10 === 0 ? "Inactive" : "Active"
      });
    }

    await Staff.insertMany(staff);

    console.log("Seed completed successfully");
    console.log("Records created:");
    console.log("- Admin: 1");
    console.log("- Guests: 300");
    console.log("- Rooms: 100");
    console.log("- Bookings: 300");
    console.log("- Payments: 200");
    console.log("- Services: 50");
    console.log("- Staff: 50");
    console.log("Total project records: 1001");

    process.exit(0);
  } catch (error) {
    console.error("Seed error:", error.message);
    process.exit(1);
  }
}

seed();
