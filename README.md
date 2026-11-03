# StudioSpace Backend

The backend API for **StudioSpace**, a creative space rental platform where users can explore studios, list their own creative spaces, and manage studio bookings.

## Live Links

- **Live Website:** https://studiospace-zeta.vercel.app
- **Live Backend API:** https://studiospace-server-psi.vercel.app

## Technologies Used

- Node.js
- Express.js
- MongoDB
- JavaScript
- Vercel (Deployment)
- Git & GitHub

## Features

- RESTful API built with Express.js.
- MongoDB database integration.
- Retrieve all available studios.
- Fetch individual studio details.
- Add new studio listings.
- Retrieve studio listings by owner.
- Create studio booking requests.
- Retrieve bookings by user.
- Delete studio listings.
- Cancel bookings.
- Check booking time conflicts to prevent overlapping reservations.
- Dynamic studio availability status.

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | Check backend server status |
| GET | `/alldata` | Get all studio data |
| GET | `/spaces` | Get available spaces |
| GET | `/studios/:id` | Get a specific studio |
| POST | `/studios` | Create a new studio |
| GET | `/studios/my-studios?email=` | Get studios by owner |
| DELETE | `/studios/:id` | Delete a studio |
| POST | `/bookings` | Create a booking |
| GET | `/bookings/my-bookings?email=` | Get user bookings |
| DELETE | `/bookings/:id?email=` | Cancel a booking |

## Installation and Setup

### 1. Clone the Repository


git clone https://github.com/mahfujtipo/studiospace-server.git


### 2. Navigate to the Project Directory

cd studiospace-server


### 3. Install Dependencies

npm install

### 4. Configure Environment Variables

Create a `.env` file in the root directory and add:

MONGODB_URI=your_mongodb_connection_string
CLIENT_URI=http://localhost:3000
NODE_ENV=development

Replace `your_mongodb_connection_string` with your actual MongoDB connection string.

### 5. Start the Development Server

npm start


The backend server will run at:

http://localhost:8000

## Database

StudioSpace uses MongoDB to store studio listings and booking information.

- **Database:** `Studiospace`
- **Studio Collection:** `available`
- **Booking Collection:** `bookings`

## Deployment

The backend is deployed on **Vercel**.

- **Production Backend:** https://studiospace-server-psi.vercel.app

## Frontend Repository

[StudioSpace Frontend Repository](https://github.com/mahfujtipo/Studiospace)

## Author

**Mahfujul Alam Tipo**

- GitHub: [@mahfujtipo](https://github.com/mahfujtipo)


© 2026 StudioSpace. All rights reserved.