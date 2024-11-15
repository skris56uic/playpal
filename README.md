# Playpal - Find, Book, and Play! 

Playpal is a user-friendly platform designed to help sports enthusiasts easily discover and book recreational spaces. Currently focused on baseball fields across Illinois, Playpal leverages open-source geolocation data to make finding and reserving a playing field seamless. 

## Key Features

- **Discover and Book Baseball Fields**  
  Playpal uses the Overpass API (integrated with OpenStreetMap) to fetch real-time data on baseball fields in Illinois. Users can explore available fields and book timeslots directly through the app.

- **My Bookings**  
  The "My Bookings" page allows users to manage their reservations, making it easy to review, track, and adjust upcoming bookings.

## Tech Stack

### Backend
- **Node.js** and **Express** – For high-performance, reliable server-side operations.
- **MongoDB** – Paired with **Mongoose** for seamless data storage and efficient database interaction.

### Frontend
- **React** and **Material UI** – For a responsive, clean, and modern user interface.
- **TypeScript** – Used across both frontend and backend for improved code reliability and maintainability.
- **Vite** – Integrated to speed up the development process, ensuring efficient builds and smooth iterations.

## Setup

1. **Clone the repository**  
   ```bash
   git clone https://github.com/your-username/playpal.git
   cd playpal
