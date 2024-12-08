# 🏐 Playpal - Find, Book, and Play! 🌍

**Playpal** is your ultimate sports companion, making it easy to find, book, and manage recreational spaces anywhere in the world. From soccer fields in bustling cities to quiet badminton courts in small towns, Playpal leverages geolocation data to help you get in the game!

[![Try Playpal Now!](https://img.shields.io/badge/Try_Playpal_Now-Click_Here-brightgreen)](https://playpal-ydmy.onrender.com/login)
[![License](https://img.shields.io/badge/License-MIT-blue)](LICENSE)
![Node.js](https://img.shields.io/badge/Node.js-%3E=16.0-green)
![React](https://img.shields.io/badge/React-18.0+-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-Compatible-green)

---

## 🎯 Key Features

- 🌍 **Global Venue Discovery**  
  Explore sports fields worldwide, powered by Overpass API and OpenStreetMap data.

- 🏅 **Comprehensive Venue Details**  
  - View location, amenities, pricing, and more.  
  - Includes contact details and navigation support.  

- 📅 **Effortless Bookings**  
  Book venues, join games, or organize your own.  

- 📋 **Manage Reservations**  
  Track and modify your bookings with ease.  

- 🔎 **Sport-Specific Filters**  
  Quickly find soccer fields, cricket pitches, badminton courts, and more.  

---

## How to Use

1. **Register**  
   - Click the **Sign Up** button on the login page to create a new account.

2. **Login**  
   - After registration, log into the app with your credentials.

3. **Set Your Location**  
   - You will be prompted with empty dropdowns for **Country**, **State**, and **City**. Fill in these details to see games around your location.

4. **Filter Results**  
   - Use **sport tags** like soccer, badminton, or football to refine your search results.

5. **Explore Locations**  
   - See detailed information for each location, including addresses, amenities, available sports, and average pricing.

6. **Choose a Venue**  
   - Select a venue from the options available in your city. You’ll be directed to a **Venue Details Page**, where you can:  
     - View the location on a map.  
     - Get the contact details of the venue manager.  

7. **Select a Sport and Join/Create a Game**  
   - Choose your preferred sport type.  
   - Options:  
     - **Join a Game:** View available dates if another user has already booked a game at that venue.  
     - **Create a Game:** Organize your own game at the chosen venue by booking a time and date for others to join.  

8. **Manage Bookings**  
   - Navigate to the **My Bookings** page via the navbar to view all your bookings, including locations, dates, and times. You can also cancel bookings from this page.  

9. **Explore More Venues**  
   - Use the **Venues** button in the navbar to go back to exploring new venues.

10. **Logout**  
    - A **Logout** button is provided for users to log out manually, and users will also be logged out automatically after the authentication cookie expires.

---

## 🚀 Tech Stack

### Backend
- **Node.js** & **Express**: Efficient and scalable server-side operations.  
- **MongoDB** with **Mongoose**: Seamless database integration.  

### Frontend
- **React** & **Material UI**: Responsive, clean, and user-friendly interface.  
- **TypeScript**: Robust, maintainable codebase.  
- **Vite**: Super-fast builds and live previews.  

---

## 🚧 Limitations

While Playpal is designed to provide a seamless experience, there are some challenges:

1. **Inconsistent Data**  
   - Many venues retrieved via the Overpass API lack complete details, such as addresses and contact information.  
   - We filter out these incomplete records, focusing only on venues with comprehensive data.

2. **Performance**  
   - To compensate for missing data, we expand search areas, which increases query times.  
   - Despite optimization efforts, API calls are not lightning-fast, impacting performance slightly.

3. **Missing Details**  
   - Some cities may have fields listed without critical details like addresses or contact numbers, resulting in their exclusion from our listings.  

---

## 🛠️ Setup and Installation

Follow these steps to run Playpal locally:

### Prerequisites
- **Node.js** (>= 16.x)
- **MongoDB** (locally or cloud-based)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/playpal.git
   cd playpal
