const HMS = {
  collections: {
    guests: "hms_guests",
    rooms: "hms_rooms",
    bookings: "hms_bookings",
    payments: "hms_payments",
    services: "hms_services",
    staff: "hms_staff"
  },

  get(collection) {
    return JSON.parse(localStorage.getItem(this.collections[collection]) || "[]");
  },

  set(collection, data) {
    localStorage.setItem(this.collections[collection], JSON.stringify(data));
  },

  generateId(prefix) {
    return prefix + Date.now().toString().slice(-6);
  },

  save(collection, record, editId = null, idField = "id") {
    const data = this.get(collection);

    if (editId) {
      const index = data.findIndex(item => item[idField] === editId);
      if (index !== -1) data[index] = record;
    } else {
      data.push(record);
    }

    this.set(collection, data);
  },

  remove(collection, id, idField = "id") {
    const data = this.get(collection).filter(item => item[idField] !== id);
    this.set(collection, data);
  },

  find(collection, id, idField = "id") {
    return this.get(collection).find(item => item[idField] === id);
  },

  badge(value) {
    const v = String(value || "").toLowerCase();

    if (v.includes("available") || v.includes("paid") || v.includes("confirmed") || v.includes("active")) {
      return `<span class="badge badge-success">${value}</span>`;
    }

    if (v.includes("pending") || v.includes("partial") || v.includes("booked")) {
      return `<span class="badge badge-warning">${value}</span>`;
    }

    if (v.includes("cancel") || v.includes("maintenance") || v.includes("occupied") || v.includes("inactive")) {
      return `<span class="badge badge-danger">${value}</span>`;
    }

    return `<span class="badge badge-info">${value}</span>`;
  },

  logout() {
    localStorage.removeItem("hms_logged_in");
    window.location.href = "index.html";
  },

  protectPage() {
    if (!localStorage.getItem("hms_logged_in") && !location.pathname.endsWith("index.html")) {
      window.location.href = "index.html";
    }
  },

  seedData() {
    if (!localStorage.getItem("hms_seeded")) {
      this.set("guests", [
        { guestId: "G001", fullName: "Ali Khan", cnic: "35202-1234567-1", phone: "03001234567", email: "ali@example.com", nationality: "Pakistani", gender: "Male", address: "Lahore" },
        { guestId: "G002", fullName: "Sara Ahmed", cnic: "42201-7654321-2", phone: "03111234567", email: "sara@example.com", nationality: "Pakistani", gender: "Female", address: "Karachi" }
      ]);

      this.set("rooms", [
        { roomId: "R001", roomNumber: "101", roomType: "Deluxe", floor: "1st Floor", bedType: "Double Bed", pricePerNight: 8000, status: "Available" },
        { roomId: "R002", roomNumber: "102", roomType: "Single", floor: "1st Floor", bedType: "Single Bed", pricePerNight: 5000, status: "Booked" },
        { roomId: "R003", roomNumber: "201", roomType: "Suite", floor: "2nd Floor", bedType: "King Bed", pricePerNight: 15000, status: "Available" }
      ]);

      this.set("bookings", [
        { bookingId: "B001", guestId: "G001", roomId: "R002", guestName: "Ali Khan", roomNumber: "102", checkInDate: "2026-05-20", checkOutDate: "2026-05-23", numberOfDays: 3, bookingStatus: "Confirmed" }
      ]);

      this.set("payments", [
        { paymentId: "P001", bookingId: "B001", guestName: "Ali Khan", roomNumber: "102", roomCharges: 15000, serviceCharges: 2000, discount: 0, totalAmount: 17000, paidAmount: 10000, remainingAmount: 7000, paymentMethod: "Cash", paymentStatus: "Partial" }
      ]);

      this.set("services", [
        { serviceId: "S001", bookingId: "B001", guestName: "Ali Khan", serviceName: "Laundry", servicePrice: 1500, serviceDate: "2026-05-21" }
      ]);

      this.set("staff", [
        { staffId: "ST001", fullName: "Usman Raza", phone: "03009876543", email: "usman@example.com", role: "Manager", salary: 85000, joiningDate: "2025-01-10", status: "Active" }
      ]);

      localStorage.setItem("hms_seeded", "true");
    }
  }
};

HMS.protectPage();
HMS.seedData();

function setActiveNav() {
  const page = location.pathname.split("/").pop();
  document.querySelectorAll(".nav a").forEach(link => {
    if (link.getAttribute("href") === page) link.classList.add("active");
  });
}

document.addEventListener("DOMContentLoaded", setActiveNav);
