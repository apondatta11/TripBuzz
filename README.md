# ✈️ TripBuzz - Travel Package Booking Platform

![TripBuzz Banner](https://i.ibb.co.com/YTNjRnfv/Screenshot-2025-10-17-at-6-33-23-PM.png)

A marketplace for travel packages where merchants can list packages and customers can book their dream vacations.

## 🚀 Live Demo & Repository

- **🌐 Live Site**: [https://cse-2100-project.web.app/](https://cse-2100-project.web.app/)
- **💻 Client Repository**: [https://github.com/apondatta11/TripBuzz](https://github.com/apondatta11/TripBuzz)
- **🔄 Server Repository**: [https://github.com/apondatta11/cse-2100-project-server]

## 🛠️ Tech Stack

**Frontend:**
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)

**Backend:**
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)

**Authentication:**
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white)

## ✨ Key Features

- 🏪 **Merchant Package Management System**
- 🎫 **Customer Booking & Payment System**
- 👑 **Admin Approval Workflow** for merchants and packages
- 💰 **Payment History Tracking**
- 📊 **Role-based Dashboards** (Admin, Merchant, Customer)
- ⭐ **Package Rating & Review System**
- 🔍 **Advanced Search & Filtering**

## 🎯 Project Overview

TripBuzz is a comprehensive travel package marketplace that connects travelers with verified merchants. The platform features a sophisticated approval system, secure booking process, and multi-role dashboards.

## 🚧 Challenges & Solutions

### Technical Challenges:
- **Approval System** - Built robust workflow for merchant and package approvals
- **Secure Payment Flow** - Implemented booking management with payment integration
- **Dynamic Dashboards** - Created role-specific interfaces with real-time data
- **Availability Management** - Developed conflict resolution for overlapping bookings
- **Earnings Distribution** - Automated payment calculations for merchants

## 📦 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account
- Firebase account

### Client Setup
```bash
# Clone the repository
git clone https://github.com/apondatta11/TripBuzz.git
cd TripBuzz

# Install dependencies
npm install

# Environment setup
# Create .env file with:
REACT_APP_API_URL=your_api_url
REACT_APP_FIREBASE_CONFIG=your_firebase_config

# Start development server
npm start
# Navigate to server directory
cd server

# Install dependencies
npm install

# Environment variables
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret

# Start server
npm run dev

