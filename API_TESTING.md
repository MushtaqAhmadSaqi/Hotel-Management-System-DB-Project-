# API Testing Guide

You can test APIs using Thunder Client, Postman, or browser.

## Test Server

Open:

```text
http://localhost:5000
```

## Test Login

POST:

```text
http://localhost:5000/api/auth/login
```

Body:

```json
{
  "username": "admin",
  "password": "admin123"
}
```

## Test Guests

GET:

```text
http://localhost:5000/api/guests
```

POST:

```text
http://localhost:5000/api/guests
```

Body:

```json
{
  "guestId": "G999",
  "fullName": "Test Guest",
  "cnic": "35202-9999999-1",
  "phone": "03009999999",
  "email": "test@example.com",
  "address": "Lahore",
  "nationality": "Pakistani",
  "gender": "Male"
}
```

PUT:

```text
http://localhost:5000/api/guests/G999
```

Body:

```json
{
  "phone": "03119999999"
}
```

DELETE:

```text
http://localhost:5000/api/guests/G999
```

Same pattern applies to rooms, bookings, payments, services, and staff.
