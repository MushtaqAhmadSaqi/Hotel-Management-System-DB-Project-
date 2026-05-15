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

  formatCurrency(amount) {
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
      minimumFractionDigits: 0
    }).format(amount);
  },

  formatDate(dateStr) {
    if (!dateStr) return '-';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
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

// Animation utilities
const Animations = {
  fadeIn(element, duration = 500) {
    element.style.opacity = 0;
    element.style.display = 'block';

    let start = null;
    const animate = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);

      element.style.opacity = progress;

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  },

  slideIn(element, direction = 'left', duration = 500) {
    const transformMap = {
      left: 'translateX(-50px)',
      right: 'translateX(50px)',
      up: 'translateY(-50px)',
      down: 'translateY(50px)'
    };

    element.style.opacity = 0;
    element.style.transform = transformMap[direction];
    element.style.display = 'block';

    let start = null;
    const animate = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);

      const easeOut = 1 - Math.pow(1 - progress, 3);
      element.style.opacity = easeOut;
      element.style.transform = transformMap[direction].replace(/\-?\d+px/, `${parseInt(transformMap[direction].match(/\-?\d+/)[0]) * (1 - easeOut)}px`);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  },

  staggerFadeIn(elements, delay = 100) {
    elements.forEach((el, index) => {
      el.style.opacity = 0;
      setTimeout(() => {
        this.fadeIn(el);
      }, index * delay);
    });
  },

  addHoverEffect(element) {
    element.addEventListener('mouseenter', () => {
      element.style.transform = 'translateY(-4px)';
    });
    element.addEventListener('mouseleave', () => {
      element.style.transform = 'translateY(0)';
    });
  }
};

// Mobile menu functionality
function initMobileMenu() {
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const sidebar = document.querySelector('.sidebar');
  const overlay = document.querySelector('.menu-overlay');

  if (menuBtn && sidebar) {
    menuBtn.addEventListener('click', () => {
      sidebar.classList.toggle('open');
      overlay?.classList.toggle('active');
    });

    overlay?.addEventListener('click', () => {
      sidebar.classList.remove('open');
      overlay.classList.remove('active');
    });
  }
}

// Initialize page animations
function initPageAnimations() {
  const cards = document.querySelectorAll('.stat-card, .content-card');

  cards.forEach((card, index) => {
    card.style.opacity = 0;
    card.style.transform = 'translateY(30px)';

    setTimeout(() => {
      card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
      card.style.opacity = 1;
      card.style.transform = 'translateY(0)';
    }, index * 100);
  });

  // Animate table rows
  const tableRows = document.querySelectorAll('tbody tr');
  tableRows.forEach((row, index) => {
    row.style.opacity = 0;
    row.style.transform = 'translateX(-20px)';

    setTimeout(() => {
      row.style.transition = 'all 0.4s ease';
      row.style.opacity = 1;
      row.style.transform = 'translateX(0)';
    }, index * 50);
  });
}

function setActiveNav() {
  const page = location.pathname.split("/").pop();
  document.querySelectorAll(".nav a").forEach(link => {
    if (link.getAttribute("href") === page) {
      link.classList.add("active");
    }
  });
}

// Search functionality
function initSearch(tableId, searchInputId) {
  const searchInput = document.getElementById(searchInputId);
  const table = document.getElementById(tableId);

  if (searchInput && table) {
    searchInput.addEventListener('input', function() {
      const searchTerm = this.value.toLowerCase();
      const rows = table.querySelectorAll('tbody tr');

      rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(searchTerm) ? '' : 'none';
      });
    });
  }
}

// Confirmation dialog
function confirmDelete(message = 'Are you sure you want to delete this item?') {
  return confirm(message);
}

// Form validation
function validateForm(formId) {
  const form = document.getElementById(formId);
  if (!form) return true;

  const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
  let isValid = true;

  inputs.forEach(input => {
    if (!input.value.trim()) {
      input.style.borderColor = '#ef4444';
      isValid = false;
    } else {
      input.style.borderColor = '';
    }
  });

  return isValid;
}

// Add smooth scroll to top on page load
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Initialize everything
document.addEventListener('DOMContentLoaded', function() {
  setActiveNav();
  initMobileMenu();
  initPageAnimations();
  scrollToTop();
});

// Add CSS for animations dynamically
const style = document.createElement('style');
style.textContent = `
  .animate-in {
    animation: fadeInUp 0.5s ease-out forwards;
  }

  table tbody tr {
    transition: all 0.3s ease;
  }

  .stat-card {
    cursor: pointer;
  }

  .form-group input:focus,
  .form-group select:focus,
  .form-group textarea:focus {
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    .sidebar {
      transition: transform 0.3s ease;
    }
  }
`;
document.head.appendChild(style);