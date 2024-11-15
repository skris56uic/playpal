import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Venue Booking
        </Typography>
        <Button color="inherit" component={Link} to="/venues">
          Venues
        </Button>
        <Button color="inherit" component={Link} to="/bookings">
          My Bookings
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
