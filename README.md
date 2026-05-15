# Hotel Management System Backend

This is the backend API for the Hotel Management System.

## Technologies

- Node.js
- Express.js
- MongoDB
- Mongoose
- CORS
- dotenv

## Folder Structure

```text
backend/
├── config/
│   └── db.js
├── controllers/
│   ├── authController.js
│   ├── bookingController.js
│   ├── crudController.js
│   ├── guestController.js
│   ├── paymentController.js
│   ├── roomController.js
│   ├── serviceController.js
│   └── staffController.js
├── models/
│   ├── Admin.js
│   ├── Booking.js
│   ├── Guest.js
│   ├── Payment.js
│   ├── Room.js
│   ├── Service.js
│   └── Staff.js
├── routes/
│   ├── authRoutes.js
│   ├── bookingRoutes.js
│   ├── guestRoutes.js
│   ├── paymentRoutes.js
│   ├── roomRoutes.js
│   ├── serviceRoutes.js
│   └── staffRoutes.js
├── scripts/
│   └── seed.js
├── .env.example
├── package.json
└── server.js
```

## Setup Steps

### 1. Install Node.js

Install Node.js from the official website if it is not installed.

Check installation:

```bash
node -v
npm -v
```

### 2. Install Packages

Open this backend folder in VS Code terminal and run:

```bash
npm install
```

### 3. Create `.env` File

Copy `.env.example` and rename it to `.env`.

For local MongoDB:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/hotel_management_db
```

For MongoDB Atlas:

```env
PORT=5000
MONGO_URI=mongodb+srv://USERNAME:PASSWORD@cluster0.xxxxx.mongodb.net/hotel_management_db?retryWrites=true&w=majority
```

### 4. Seed Sample Dataset

This creates 1001 records for your lab dataset requirement.

```bash
npm run seed
```

Default login created by seed:

```text
Username: admin
Password: admin123
```

### 5. Start Backend Server

```bash
npm run dev
```

Or:

```bash
npm start
```

Open this in browser:

```text
http://localhost:5000
```

You should see:

```json
{
  "message": "Hotel Management System API is running"
}
```

## API Endpoints

### Auth

```text
POST /api/auth/login
```

Body:

```json
{
  "username": "admin",
  "password": "admin123"
}
```

### Guests

```text
GET    /api/guests
GET    /api/guests/:id
POST   /api/guests
PUT    /api/guests/:id
DELETE /api/guests/:id
```

### Rooms

```text
GET    /api/rooms
GET    /api/rooms/:id
POST   /api/rooms
PUT    /api/rooms/:id
DELETE /api/rooms/:id
```

### Bookings

```text
GET    /api/bookings
GET    /api/bookings/:id
POST   /api/bookings
PUT    /api/bookings/:id
DELETE /api/bookings/:id
```

### Payments

```text
GET    /api/payments
GET    /api/payments/:id
POST   /api/payments
PUT    /api/payments/:id
DELETE /api/payments/:id
```

### Services

```text
GET    /api/services
GET    /api/services/:id
POST   /api/services
PUT    /api/services/:id
DELETE /api/services/:id
```

### Staff

```text
GET    /api/staff
GET    /api/staff/:id
POST   /api/staff
PUT    /api/staff/:id
DELETE /api/staff/:id
```

## Example Guest POST Body

```json
{
  "guestId": "G999",
  "fullName": "Ali Hassan",
  "cnic": "35202-1234567-1",
  "phone": "03001234567",
  "email": "ali@example.com",
  "address": "Lahore",
  "nationality": "Pakistani",
  "gender": "Male"
}
```

## Important for Frontend Connection

Your current frontend uses localStorage.

To connect with this backend, replace localStorage functions in `js/app.js` with `fetch()` calls.

Example:

```javascript
const API_URL = "http://localhost:5000/api";

async function getGuests() {
  const response = await fetch(`${API_URL}/guests`);
  return await response.json();
}
```
