# StudioSpace — Creative Space Booking Platform

**StudioSpace** is a web-based marketplace that connects creative professionals with inspiring spaces. Users can explore creative studios, view studio details, and book spaces for their projects. Studio owners can also list and manage their own studios.

## 🌐 Live Demo

**[Visit StudioSpace](https://studiospace-amber.vercel.app/)**

## 📂 Project Repositories

| Repository | Description |
|---|---|
| [Frontend Repository](https://github.com/mahfujtipo/Studiospace) | Next.js frontend application |
| [Backend Repository](https://github.com/mahfujtipo/studiospace-server) | Express.js REST API |

## ✨ Key Features

- **Explore Creative Studios:** Browse available creative spaces and discover studios based on different categories.
- **Multiple Studio Categories:** Photography studios, film and video studios, podcast rooms, music recording suites, and creative workshops.
- **Studio Details:** View studio information, pricing, location, capacity, and available amenities.
- **User Authentication:** Sign up and sign in using email and password, with Google authentication integration.
- **Studio Booking:** Select a studio and submit booking requests.
- **User Dashboard:** Manage personal studio listings and bookings.
- **Studio Management:** Studio owners can add, view, and delete their studio listings.
- **Booking Management:** View personal bookings and cancel existing reservations.
- **Availability Management:** Prevent overlapping bookings through backend booking-conflict checks.

## 🛠️ Technologies Used

### Frontend
- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- Better Auth
- MongoDB
- React Server and Client Components

### Backend
- Node.js
- Express.js
- MongoDB
- REST API

### Deployment & Tools
- Vercel
- Git & GitHub
- MongoDB Atlas

## 🏗️ Project Architecture

StudioSpace uses a separate frontend and backend architecture.

```text
                 StudioSpace
                      |
          +-----------+-----------+
          |                       |
       Frontend                 Backend
          |                       |
       Next.js                 Express.js
          |                       |
          +-----------+-----------+
                      |
                   MongoDB
                      |
             Authentication &
               Application Data
```

## 🚀 Getting Started

Follow these instructions to run the frontend application locally.

### Prerequisites

Make sure you have installed:

- Node.js
- npm
- MongoDB database
- Git

### 1. Clone the Repository

git clone https://github.com/mahfujtipo/Studiospace.git

### 2. Navigate to the Project Directory

cd Studiospace

### 3. Install Dependencies


npm install

### 4. Configure Environment Variables

Create a `.env` file in the root directory and configure the following variables:

env
BETTER_AUTH_SECRET=your_better_auth_secret
BETTER_AUTH_URL=http://localhost:3000

NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000

MONGODB_URI=your_mongodb_connection_string

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

NEXT_PUBLIC_SERVER_URL=http://localhost:8000
```

**Important:** Replace the placeholder values with your own credentials. Never commit your `.env` file or expose private credentials.

### 5. Start the Development Server

npm run dev

Open your browser and visit:

http://localhost:3000

## ⚙️ Backend Setup

The frontend communicates with a separate Express.js backend.

To run the backend locally:

git clone https://github.com/mahfujtipo/studiospace-server.git

cd studiospace-server

npm install

Configure the backend environment variables in its `.env` file according to the backend repository instructions.

Start the backend:

npm start

The backend API will run at:

http://localhost:8000

Make sure `NEXT_PUBLIC_SERVER_URL` in the frontend environment points to the running backend.

## 🗄️ Database

StudioSpace uses MongoDB to manage application data.

**Database:** `Studiospace`

Main collections include:

- `user` — User information
- `account` — Authentication account information
- `session` — User sessions
- `verification` — Authentication verification data
- `available` — Studio listings
- `bookings` — Studio booking records

## 📡 Backend API

The Express.js backend provides RESTful API endpoints for studio and booking management.

| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | Check backend status |
| GET | `/alldata` | Retrieve all studio data |
| GET | `/spaces` | Retrieve available studios |
| GET | `/studios/:id` | Get studio details |
| POST | `/studios` | Create a studio listing |
| GET | `/studios/my-studios?email=` | Get owner's studios |
| DELETE | `/studios/:id` | Delete a studio |
| POST | `/bookings` | Create a booking |
| GET | `/bookings/my-bookings?email=` | Get user bookings |
| DELETE | `/bookings/:id?email=` | Cancel a booking |

## ☁️ Deployment

StudioSpace is deployed using Vercel.

- **Live Frontend:** https://studiospace-amber.vercel.app/
- **Frontend Source Code:** https://github.com/mahfujtipo/Studiospace
- **Backend Source Code:** https://github.com/mahfujtipo/studiospace-server

## 👨‍💻 Author

**Mahfujul Alam Tipo**

GitHub: [@mahfujtipo](https://github.com/mahfujtipo)

---

⭐ If you find this project interesting, consider giving the repository a star!

© 2026 StudioSpace. All rights reserved.