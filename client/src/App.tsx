import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { VenueList } from "./components/VenueList";
import VenueDetails from "./components/VenueDetails";
import MyBookings from "./components/MyBookings";
import Header from "./components/Header";
import Login from "./components/Login";
import { UserContextProvider } from "./components/UserContextProvider";
import Register from "./components/Register";

const App: React.FC = () => {
  return (
    <UserContextProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Navigate to="/venues" />} />
          <Route path="/venues" element={<VenueList />} />
          <Route path="/venue/:id" element={<VenueDetails />} />
          <Route path="/bookings" element={<MyBookings />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </UserContextProvider>
  );
};

export default App;
