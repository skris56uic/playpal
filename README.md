# Playpal - Find, Book, and Play!

Playpal is a user-friendly platform designed to help sports enthusiasts easily discover and book recreational spaces. Currently focused on baseball fields across Illinois, Playpal leverages open-source geolocation data to make finding and reserving a playing field seamless.

🌐 **[Try Playpal Now!](https://playpal-ydmy.onrender.com/login)**

---

## Key Features

- **Discover and Book Soccer, Badminton, Cricket and Football Fields**  
  Playpal uses the Overpass API (integrated with OpenStreetMap) to fetch real-time data on baseball fields in Illinois. Users can explore available fields and book timeslots directly through the app.

- **List Venues with Detailed Information**
  - View all available venues and their locations, facilities, facts, and amenities.
  - Display detailed venue pages that include pricing, types of sports offered, and comprehensive facility information.

- **Venue Selection and Navigation**
  - Provide venue selection with contact information and directions for easy accessibility.

- **Enable Bookings and Reservations**
  - Seamlessly book or reserve venues for your favorite activities directly within the app.

- **My Bookings**  
  The "My Bookings" page allows users to manage their reservations, making it easy to review, track, and adjust upcoming bookings.

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

## Tech Stack

### Backend

- **Node.js** and **Express** – For high-performance, reliable server-side operations.
- **MongoDB** – Paired with **Mongoose** for seamless data storage and efficient database interaction.

### Frontend

- **React** and **Material UI** – For a responsive, clean, and modern user interface.
- **TypeScript** – Used across both frontend and backend for improved code reliability and maintainability.
- **Vite** – Integrated to speed up the development process, ensuring efficient builds and smooth iterations.

---

## Setup

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/playpal.git
   cd playpal
