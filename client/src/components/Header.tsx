import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { logoutUser } from "../apis";
import { UserContext } from "./UserContext";

const Header: React.FC = () => {
  const { user } = useContext(UserContext);
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    try {
      await logoutUser();
      alert("Successfully Logged Out!");
      setUser(null);
      navigate("/login");
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography
          variant="h4"
          sx={{ flexGrow: 1, fontFamily: "'Coiny', cursive", fontWeight: 700 }}
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
  );
};

export default Header;
