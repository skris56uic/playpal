import { useContext, useState } from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { logoutUser } from "../apis";
import { UserContext } from "./UserContext";
import BookingSnackbar from "./BookingSnackBar";

const Header: React.FC = () => {
  const { user } = useContext(UserContext);
  const { setUser } = useContext(UserContext);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleLogout = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    try {
      await logoutUser();
      setSnackbarMessage("Successfully Logged Out!");
      setSnackbarOpen(true);
      setUser(null);
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        setSnackbarMessage("Logout Failed. Please try again.");
        setSnackbarOpen(true);
      } else {
        setSnackbarMessage("Logout Failed. Please try again.");
        setSnackbarOpen(true);
      }
    }
  };

  const handleSnackbarClose = (
    _?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <Typography
            variant="h4"
            sx={{
              flexGrow: 1,
              fontFamily: "'Coiny', cursive",
              fontWeight: 500,
            }}
          >
            Play Pal
          </Typography>
          {user ? (
            <>
              <Typography sx={{ ml: 15, mr: 15 }}>
                Welcome {user?.name}
              </Typography>
              <Button color="inherit" component={Link} to="/venues">
                Venues
              </Button>
              <Button color="inherit" component={Link} to="/bookings">
                My Bookings
              </Button>
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : null}
        </Toolbar>
      </AppBar>
      <BookingSnackbar
        open={snackbarOpen}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
      />
    </>
  );
};

export default Header;
