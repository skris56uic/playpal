import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { VenueList } from "./components/VenueList";
import VenueDetails from "./components/VenueDetails";
import MyBookings from "./components/MyBookings";
import Header from "./components/Header";
import { Box } from "@mui/material";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Header />
      <Box sx={{ mt: 8 }}>
        <Routes>
          <Route path="/" element={<Navigate to="/venues" />} />
          <Route path="/venues" element={<VenueList />} />
          <Route path="/venue/:id" element={<VenueDetails />} />
          <Route path="/bookings" element={<MyBookings />} />
          <Route path="*" element={<Navigate to="/venues" />} />
        </Routes>
      </Box>
    </BrowserRouter>
  );
};

export default App;
