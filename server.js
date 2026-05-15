const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Hotel Management System API is running",
    modules: [
      "guests",
      "rooms",
      "bookings",
      "payments",
      "services",
      "staff",
      "auth"
    ]
  });
});

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/guests", require("./routes/guestRoutes"));
app.use("/api/rooms", require("./routes/roomRoutes"));
app.use("/api/bookings", require("./routes/bookingRoutes"));
app.use("/api/payments", require("./routes/paymentRoutes"));
app.use("/api/services", require("./routes/serviceRoutes"));
app.use("/api/staff", require("./routes/staffRoutes"));

app.use((req, res) => {
  res.status(404).json({
    message: "API route not found"
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
