Easy Book — MERN Service Booking Platform
Overview

Easy Book is a full-stack MERN service booking platform that allows users to discover services, choose providers, select available dates and time slots, and make bookings with online payment.

The platform also includes separate experiences for users, providers, and administrators.

Features

User
User registration and login
JWT-based authentication
Browse service categories
Browse available services
View service providers
View provider-specific service prices
Select booking date and time
Home-service and visit-service support
Phone and address validation
Booking creation
Prevent duplicate bookings
Check provider worker capacity
Online payment through Stripe
Booking and payment status tracking

Provider

Provider authentication
Provider profile creation
Select services offered
Set service prices
Set number of workers
Receive customer bookings
Manage provider-related information

Admin

Separate admin application
Admin authentication
Role-based authorization
Dashboard with statistics

Category management
   Add category
   View categories
   Edit category
   Delete category
   
Service management
   Add service
   View services
   Edit service
   Delete service
   
Service mode management
   Home
   Visit
   
Recent services overview

Booking Flow

User
 ↓
Select Category
 ↓
Select Service
 ↓
Select Provider
 ↓
Select Date
 ↓
Select Time
 ↓
Enter Booking Details
 ↓
Create Pending Booking
 ↓
Payment
 ↓
Stripe Checkout
 ↓
Payment Verification
 ↓
Booking Confirmed

Technology Stack

Frontend
  React
  Vite
  React Router
  Axios
  Tailwind CSS
  
Admin Frontend
  React
  Vite
  React Router
  Axios
  Tailwind CSS
  
Backend
  Node.js
  Express.js
  MongoDB
  Mongoose
  JWT
  bcryptjs
  
Payment
  Stripe
  Stripe Checkout
  Stripe payment verification/webhooks
  
Project Structure

Easy-Book/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── api/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── public/
│   ├── package.json
│   └── .env
│
├── admin/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── api/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── .env
│
└── server/
    ├── config/
    ├── controllers/
    ├── middleware/
    ├── models/
    ├── routes/
    ├── .env
    ├── server.js
    └── package.json
    
Database Models
User
  Stores:
     Name
     Email
     Password
     Role

  Roles:
    user
    provider
    admin
    
Category
  Stores:
    Category name
    Category image
    
Service
  Stores:
    Service name
    Category reference
    Description
    Image
    Service mode

  Service modes:
    Home
    Visit
    
Provider
  Stores:
    Provider name
    Category
    Services
    Service prices
    Location
    Workers
    Image
    
Booking
  Stores:
    User
    Provider
    Service
    Phone
    Address
    Date
    Time
    Price
    Booking status
    
  Payment status
    Payment ID

  Booking status:
    pending
    confirmed
    cancelled

  Payment status:
    pending
    paid
    failed
    refunded
    
Authentication & Authorization

JWT is used for authentication.

Protected requests send:

Authorization: Bearer <token>

The backend verifies the token and attaches the authenticated user to:

req.user

Role-based authorization controls access to protected operations.

For example, only admins can:

Create category
Update category
Delete category
Create service
Update service
Delete service

API Overview

Authentication
POST /api/register
POST /api/login

Categories
POST   /api/categories
GET    /api/categories
GET    /api/categories/:id
PUT    /api/categories/:id
DELETE /api/categories/:id

Services
POST   /api/service/create
GET    /api/service
GET    /api/service/recent
PUT    /api/service/:id
DELETE /api/service/:id

Providers
POST /api/providers
GET  /api/providers
GET  /api/providers/:id

Bookings
POST /api/booking
GET  /api/booking/date
GET  /api/booking/:id

Payments
POST /api/payment/create
Booking Validation

Before creating a booking, the backend validates:

Service exists
Provider exists
Provider offers the selected service
Phone number is valid
Address is provided for home service
Date is valid
Past dates cannot be booked
Provider worker capacity is checked
Duplicate booking for the same user/provider/date/time is prevented
Payment Flow

The booking is initially created as:

status = pending
paymentStatus = pending

The payment controller creates a Stripe Checkout session using the booking price.

After successful payment verification:

paymentStatus = paid
status = confirmed

The Stripe secret key is stored only on the backend using environment variables.

Environment Variables
Server
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
Client
VITE_API_URL=http://localhost:5000/api
Admin
VITE_API_URL=http://localhost:5000/api

Do not commit .env files to GitHub.

Installation
Clone the repository
git clone <your-repository-url>
cd Easy-Book
Install server dependencies
cd server
npm install
Install client dependencies
cd ../client
npm install
Install admin dependencies
cd ../admin
npm install
Running Locally
Start backend
cd server
npm run dev
Start user frontend
cd client
npm run dev
Start admin frontend
cd admin
npm run dev

Typical local setup:

Client → http://localhost:5173
Admin  → http://localhost:5174
Server → http://localhost:5000
Security

The project uses:

JWT authentication
Role-based authorization
Password hashing with bcrypt
Protected backend routes
Environment variables for secrets
Server-side booking validation
Server-side price validation
Ownership checks for payments/bookings
Stripe payment verification
Future Improvements
Provider availability calendar
Temporary slot reservation during payment
Automatic expiry for unpaid bookings
Email/SMS notifications
Provider booking-management dashboard
User booking history
Reviews and ratings
Search and advanced filters
Coupons and promotional discounts
Admin analytics
Stripe Connect for marketplace payouts
Production deployment and monitoring
Deployment

Recommended setup:

Client  → Netlify
Admin   → Netlify
Server  → Render
Database → MongoDB Atlas
Payment → Stripe
Challenges Faced

Some of the main challenges during development included:

Connecting React routes with Express APIs
Managing JWT authentication and user roles
Protecting admin and provider routes
Matching frontend and backend API paths
Validating provider/service relationships
Preventing duplicate bookings
Checking worker capacity for time slots
Handling Home and Visit service requirements
Connecting Stripe payment processing
Managing environment variables and secret keys
Separating the user application and admin application
Project Goal

Easy Book was developed to provide a simple platform where customers can find service providers, choose a suitable service and time, and complete a booking online while administrators manage the service catalog and providers manage their offerings.



